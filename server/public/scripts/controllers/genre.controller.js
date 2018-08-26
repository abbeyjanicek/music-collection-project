musicCollectionApp.controller('GenreController', ['$http', function ($http) {
    console.log('GenreController GO!');

    const self = this;
    self.genre = { list: [{type: 'type' }]};
    
    //self.assignments = []; <-- genre paired with album

    //Add genre to db
    self.addGenreToDb = function(genreToAdd) {
        console.log('in addGenreToDb');
        $http({
            method: 'POST',
            url: '/genre',
            data: genreToAdd
        }).then(function (response) {
            console.log('GenreController - addGenreToDb - repsonse', response.data);
            self.genreToAdd = {type: ''}
            //getGenreData();
        }).catch(function (error) {
            console.log('GenreController - addGenreToDb - error', error);
        }); 
    }//end addGenreToDb




}])//end GenreController