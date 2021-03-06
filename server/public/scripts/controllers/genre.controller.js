musicCollectionApp.controller('GenreController', ['$http', '$mdDialog', function ($http, $mdDialog) {
    console.log('GenreController GO!');

    const self = this;
    self.genre = { list: [{ type: 'type' }] };

    //self.assignments = []; <-- genre paired with album

    //Add genre to db
    self.addGenreToDb = function (genreToAdd) {
        console.log('in addGenreToDb');
        $http({
            method: 'POST',
            url: '/genre',
            data: genreToAdd
        }).then(function (response) {
            console.log('GenreController - addGenreToDb - repsonse', response.data);
            self.genreToAdd = { type: '' }
            getGenreData();
        }).catch(function (error) {
            console.log('GenreController - addGenreToDb - error', error);
        });
    }//end addGenreToDb

    function getGenreData() {
        console.log('in getGenreData');
        $http({
            method: 'GET',
            url: '/genre'
        }).then(function (response) {
            console.log('GenreController - getGenreData response', response.data);
            self.genre.list = response.data;
        }).catch((error) => {
            console.log('GenreController - getGenreData error', error.statusText);
            alert('Something went wrong! Check the server.')
        })
    }//end getGenreData

    getGenreData();

self.showAlert = function(ev) {
    $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Wait!')
        .textContent('You can not delete a genre that has albums attached to it.')
        .ariaLabel('Delete Alert')
        .ok('Got it!')
        .targetEvent(ev)
    );
};

    self.deleteGenre = function (genre) {
        if (genre.current_music > 0) {
            self.showAlert();
        } else {
            $http({
                method: 'DELETE',
                url: '/genre/' + genre.id
            }).then(function (response) {
                console.log('GenreController - deleteGenre - response');
                getGenreData();
            }).catch(function (error) {
                console.log('GenreController - deleteGenre - error', error.statusText);
            });
        }
    }//end deleteGenre



}])//end GenreController