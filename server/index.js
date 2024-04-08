import manga from './manga.js';
import jwt from 'jsonwebtoken'; 
import crypto from 'crypto';

// imports here for express and pg
import express from 'express';
const app = express();
import path from 'path';
import pg from 'pg';
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/manga_db')

app.use(express.json())

// static routes here (you only need these for deployment)

// app routes
app.get('/api/books', async (req, res) => {
    const SQL = `
    SELECT * FROM manga;
    `;
    const response = await client.query(SQL);
    res.json(response.rows);
});

app.post('/api/users/register', async (req, res) => {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    const token = jwt.sign({
        data: { firstname, lastname, email, password }
    }, crypto.randomBytes(64).toString('hex'));
      
    const SQL = `
    INSERT INTO 
        users(firstname, lastname, email, password, token)
    VALUES
        ($1,$2,$3,$4,$5)
    RETURNING 
        *;
    `;
    try {
        const response = await client.query(SQL, [firstname, lastname, email, password, token]);
        const user = response.rows[0];
        console.log(`Created user: ${user.email}`)
        res.send({
            "user": {
                "id": user.id,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email
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
        email = '${email}'
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

    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        firstname text,
        lastname text,
        email text NOT NULL UNIQUE,
        password text NOT NULL,
        token text NOT NULL UNIQUE
    );

    CREATE TABLE manga(
        sku SERIAL PRIMARY KEY,
        title VARCHAR(255),
        author VARCHAR(255),
        in_inventory INTEGER DEFAULT 1,
        price VARCHAR(255),
        is_available BOOLEAN DEFAULT TRUE,
        coverimage VARCHAR(255)
    );
    `;
    await client.query(SQL);
    console.log('tables created');

    SQL = `
    INSERT INTO manga 
        (title, author, price, coverimage)
    values($1,$2,$3,$4)
    `;
    for(const singleManga of manga.inventory){
        await client.query(SQL, [singleManga.title,singleManga.author,singleManga.price,singleManga.imgsrc]);
    }
    console.log('data seeded')

    let port = process.env.PORT || 3000;
    app.listen(port,()=>console.log(`listening on port ${port}`));

}

// init function invocation
init();
