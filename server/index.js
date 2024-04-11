import manga from './manga.js';
import jwt from 'jsonwebtoken'; 
import crypto from 'crypto';
import cors from 'cors';

// imports here for express and pg
import express from 'express';
const app = express();
import path from 'path';
import pg from 'pg';
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/manga_db')

app.use(express.json());
app.use(cors());

// static route (need for deployment)
//app.use(express.static(path.join(__dirname, '../client/dist')));
// serve html
//app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../client/dist/index.html'))). 

// app routes
app.get('/api/books', async (req, res) => {
    const SQL = `
    SELECT * FROM manga;
    `;

    const response = await client.query(SQL);
    res.json(response.rows);
});


app.get('/api/books/:bookSku', async (req, res) => {
    const param = req.params.bookSku;

    const SQL = `
    SELECT 
        sku, title, author, description, coverimage, is_available
    FROM manga
    WHERE
        sku = '${param}';
    `;    

    const response = await client.query(SQL);
    res.json(response.rows);
});

app.post('/api/users/register', async (req, res) => {
    
    let SQL = `
    INSERT INTO
        carts(skulist, price)
    VALUES
        (null, $1)
    RETURNING
        *;
    `;
    const cartCreate = await client.query(SQL, [0.00]);
    const cart_id = cartCreate.rows[0].id;

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;


    const token = jwt.sign({
        data: { firstname, lastname, email, password }
    }, crypto.randomBytes(64).toString('hex'));
      
    SQL = `
    INSERT INTO 
        users(firstname, lastname, email, password, token, cart_id)
    VALUES
        ($1,$2,$3,$4,$5,$6)
    RETURNING 
        *;
    `;
    try {
        const response = await client.query(SQL, [firstname, lastname, email, password, token, cart_id]);
        const user = response.rows[0];
        console.log(`Created user: ${user.email}`)
        res.send({
            "user": {
                "id": user.id,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email,
                "cartId": user.cart_id
            },
            "message": "Registration successful!",
            "token": user.token
        });
    } catch (err) {
        console.error(err.message);
        res.send({
            "message": "Registration failed!"
        });
    }
});

app.post('/api/users/login', async (req, res)=>{
    
    const email = req.body.email;
    const password = req.body.password;

    const SQL = `
    SELECT
        id, firstname, lastname, email, password, token
    FROM
        users
    WHERE
        email = '${email}';
    `;
    try {
        const response = await client.query(SQL);
        const user = response.rows[0];
        if(user.password === password){
            res.send({
                "user": {
                    "id": user.id,
                    "firstname": user.firstname,
                    "lastname": user.lastname,
                    "email": user.email
                },
                "message": "Login Successful!",
                "token": user.token
            })
        } else {
            res.send({
                "message": "Login Failed!"
            })
        }
    } catch (err) {
        console.error(err.message);
        res.send({
            "message": "No User Found!"
        });
    }
});

app.get('/api/cart/:userId', async (req, res)=>{
    
    const auth = req.get('Authorization');
    if(!auth) res.send({"message": "No Authorization Received!"});

    const user_id = req.params.userId;

    let SQL = `
    SELECT cart_id
    FROM users
    WHERE id = '${user_id}';
    `;
    let response = await client.query(SQL);

    const cart_id = response.rows[0].cart_id;
    
    SQL = `
    SELECT id, skulist, price 
    FROM carts
    WHERE id = '${cart_id}';
    `;
    response = await client.query(SQL);


    res.send({
        "message": response.rows[0]
    });
})

app.patch('/api/cart/:userId', async (req, res)=>{

    // action: add
    // action: remove

    const auth = req.get('Authorization');
    if(!auth) res.send({"message": "No Authorization Received!"});

    const user_id = req.params.userId;
    const price = req.body.price;
    const sku = req.body.sku;
    const action = req.body.action;

    let SQL = `
    SELECT cart_id
    FROM users
    WHERE id = '${user_id}';
    `;
    let response = await client.query(SQL);

    const cart_id = response.rows[0].cart_id;

    if (action == 'add') {
        SQL = `
        UPDATE carts
        SET 
            skulist = array_append(skulist, '${sku}'),
            price = price + '${price}'
        WHERE id = '${cart_id}'
        RETURNING *;
        `;
        response = await client.query(SQL);    
    } else if (action == 'remove') {
        SQL = `
        UPDATE carts
        SET 
            skulist = array_remove(skulist, '${sku}'),
            price = price - '${price}'
        WHERE id = '${cart_id}'
        RETURNING *;
        `;
        response = await client.query(SQL);    
    } else {
        response.rows[0] = "No Action Received!"
    }

    res.send({
        "message": response.rows[0]
    });
})

// create init function
const init = async()=>{
    await client.connect();

    /**
     * title
     * price
     * sku
     * author
     * img
     */

    let SQL = `
    DROP TABLE IF EXISTS manga;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS carts;

    CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        skulist integer[],
        price NUMERIC(100, 2)
    );

    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        firstname text,
        lastname text,
        email text NOT NULL UNIQUE,
        password text NOT NULL,
        token text NOT NULL UNIQUE,
        cart_id integer NOT NULL UNIQUE,
        FOREIGN KEY(cart_id) REFERENCES carts(id)
    );

    CREATE TABLE manga(
        sku SERIAL PRIMARY KEY,
        title VARCHAR(255),
        author VARCHAR(255),
        description TEXT,
        in_inventory INTEGER DEFAULT 1,
        price NUMERIC(100, 2),
        is_available BOOLEAN DEFAULT TRUE,
        coverimage VARCHAR(255)
    );
    `;
    await client.query(SQL);
    console.log('tables created');

    SQL = `
    INSERT INTO manga 
        (title, author, description, price, coverimage)
    values($1,$2,$3,$4,$5);
    `;
    for(const singleManga of manga.inventory){
        await client.query(SQL, [singleManga.title,singleManga.author,singleManga.description,singleManga.price,singleManga.imgsrc]);
    }
    console.log('data seeded')

    let port = process.env.PORT || 3000;
    app.listen(port,()=>console.log(`listening on port ${port}`));

}

// init function invocation
init();
