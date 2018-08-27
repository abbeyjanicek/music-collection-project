//VARIABLES/REQUIRES
const express = require ('express');
const app = express ();
const PORT = process.env.PORT || 5000;
const bodyParser = require ('body-parser');
const moment = require('moment');

const musicRouter = require('./routes/music.router.js');
const genreRouter = require('./routes/genre.router.js');


//USES
//body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//set-up routes

app.use('/music', musicRouter);
app.use('/genre', genreRouter);

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('server running on port: ', PORT);
    
});