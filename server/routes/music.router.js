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
    const query = 'INSERT INTO "music" ("title", "artist", "release_date", "genre_id", "image_url") VALUES ($1, $2, $3, $4, $5);'; 
    pool.query(query, [albumToAdd.title, albumToAdd.artist, albumToAdd.release_date, albumToAdd.genre_id, albumToAdd.image_url]).then(() => { 
        console.log('POST - added album to db');
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in POST', error);
        res.sendStatus(500);
    });
});//end POST to db

//music GET route
router.get('/', function (req, res) {
    console.log('in GET route');
    const query = `SELECT "music"."id" as "id",
                    "music"."title",
                    "music"."artist",
                    "music"."release_date",
                    "genre"."type" as "genre_type",
                    "music"."image_url"
                    FROM "music" LEFT JOIN "genre"
                    ON "music"."genre_id" = "genre"."id";`;
    pool.query(query).then(results => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('error making GET', error);
        res.sendStatus(500);
    });
})//end GET from db

router.delete('/:id', function (req, res) {
    console.log('in DELETE route');
    const idOfAlbumToDelete = req.params.id;
    const query = 'DELETE FROM "music" WHERE "id" = $1;';
    pool.query(query, [idOfAlbumToDelete]).then ((results) => {
        console.log('received DELETE req');
        res.send(results.rows);
    }).catch((error) => {
        console.log('error in DELETE req', error);
        res.sendStatus(500); 
    });
})//end DELETE route

module.exports = router;