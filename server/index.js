// imports here for express and pg
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/manga_db')

// static routes here (you only need these for deployment)

// app routes here 
// this works somehow
// app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
  

// create your init function
const init = async()=>{
    await client.connect();

    /**
     * title
     * price
     * sku
     * author
     */

    let SQL = `
    DROP TABLE IF EXISTS manga_db;
    CREATE TABLE manga_db(
        sku SERIAL PRIMARY KEY,
        title VARCHAR(255),
        author VARCHAR(255),
        is_available BOOLEAN DEFAULT FALSE,
        total_amount INTEGER DEFAULT 0,
        price VARCHAR(255)
    )
    ;`;
    await client.query(SQL);
    console.log('data seeded');

    let port = process.env.PORT || 3000;
    app.listen(port,()=>console.log(`listening on port ${port}`));

}

// init function invocation
init();
