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

router.get('/', function (req, res) {
    console.log('in GET route');
    const query = `SELECT "g".*, count("m") as "current_music"
                    FROM "genre" as "g" LEFT JOIN "music" as "m"
                    ON "g"."id" = "m"."genre_id"
                    GROUP BY "g"."id";`;
    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('error making GET', error);
        res.sendStatus(500);
    });
})//end GET from db

router.delete('/:id', function (req, res) {
    console.log('in DELETE route');
    const idOfGenreToDelete = req.params.id;
    const query = 'DELETE FROM "genre" WHERE "id" = $1;';
    pool.query(query, [idOfGenreToDelete]).then((results) => {
        console.log('received DELETE req');
        res.send(results.rows);
    }).catch((error) => {
        console.log('error in DELETE req', error);
        res.sendStatus(500);
    });
})//end DELETE route

module.exports = router;