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



module.exports = router;