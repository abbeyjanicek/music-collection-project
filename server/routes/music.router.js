const express = require('express');
const router = express.Router();

//pg setup
const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'music-collection',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000
}

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('postgresql connected!');
});

pool.on('error', (error) => {
    console.log('error connecting to db', error);
});

router.post('/', function (req, res) {
    const albumToAdd = req.body;
    console.log('in POST route', albumToAdd);
    const query = 'INSERT INTO "music" ("title", "artist", "genre", "image-url") VALUES ($1, $2, $3, $4);'; // "release_date", 
    pool.query(query, [albumToAdd.title, albumToAdd.artist, albumToAdd.genre, albumToAdd.image_url]).then(() => {  //albumToAdd.release_date, 
        console.log('POST - added to db');
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in POST', error);
        res.sendStatus(500);
    });
});//end POST to db


module.exports = router;