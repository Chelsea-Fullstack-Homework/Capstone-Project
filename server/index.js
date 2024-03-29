// imports here for express and pg
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/manga_db')

// static routes here (you only need these for deployment)

// app routes here 
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
    values
        ('Kill La Kill', 'Kazuki, Nakashima, TRIGGER, Akizuki, Ryo', '$7.50', 'IMGHERE'),
        ('Komi Cant Communicate', 'Tomohito Oda', '$7.50', 'IMGHERE'),
        ('Higurashi When They Cry', 'Ryukishi07, Suzuragi, Hōjō, Suzuki, Tonogai, Momoyama, Kitō, Mimori, Kagesaki', '$7.50', 'IMGHERE'),
        ('Future Diary', 'Sakae Esuno', '$7.50', 'IMGHERE'),
        
        ('Danganronpa', 'Kazutaka Kodaka', '$7.50', 'IMGHERE'),
        ('Soul Eater', 'Atsushi Ohkubo', '$7.50', 'IMGHERE'),
        ('Prison School', 'Akira Hiramoto', '$7.50', 'IMGHERE'),
        ('The Devil Is a Part-Timer!', 'Wagahara, Oniku(029)', '$7.50', 'IMGHERE'),
        ('Shimoneta', 'Akagi, Shimotsuki', '$7.50', 'IMGHERE'),
        ('Highschool of the Dead', 'Satō, Satō', '$7.50', 'IMGHERE')
    `;
    await client.query(SQL);
    console.log('data seeded')

    let port = process.env.PORT || 3000;
    app.listen(port,()=>console.log(`listening on port ${port}`));

}

// init function invocation
init();
