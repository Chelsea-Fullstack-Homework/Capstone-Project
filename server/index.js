const manga = require("./manga")
// imports here for express and pg
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/manga_db')

// static routes here (you only need these for deployment)

// app routes here 

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/api/manga', async (req, res) => {
    const SQL = `
    SELECT * FROM manga_db;
    `;
    const response = await client.query(SQL);
    res.json(response.rows);
});

// create your init function
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
    DROP TABLE IF EXISTS manga_db;
    CREATE TABLE manga_db(
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
    INSERT INTO manga_db 
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
