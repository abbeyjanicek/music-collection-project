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
    const genreToAdd = req.body;
    console.log('in POST route', genreToAdd);
    const query = 'INSERT INTO "genre" ("type") VALUES ($1);';
    pool.query(query, [genreToAdd.type]).then(() => {
        console.log('POST - added genre to db');
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in POST', error);
        res.sendStatus(500);
    });
});//end POST to db



module.exports = router;