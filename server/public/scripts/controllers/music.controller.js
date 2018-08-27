musicCollectionApp.controller('MusicController', ['$http', '$mdDialog', function ($http, $mdDialog) {
    console.log('MusicController GO!');

    const self = this;
    self.genre = [];

    self.album = [];

    const albumToAdd = { title: '', artist: '', release_date: '', genre_id: '', image_url: ''}

    self.addAlbum = function(albumToAdd) {
        console.log('in addAlbum');
        $http({
            method: 'POST',
            url: '/music',
            data: albumToAdd
        }).then(function (response) {
            console.log('MusicController - addAlbum - response', response.data); 
            self.getAlbums();
        }).catch(function (error) {
            console.log('MusicController - addAlbum - error', error);
        });
    }//end addAlbum

    self.getAlbums = function () {
        console.log('in getAlbums');
        $http({
            method: 'GET',
            url: '/music'
        }).then((response) => {
            console.log('MusicController - getAlbums response', response.data);
            self.album = response.data;           
        }).catch((error) => {
            console.log('MusicController - getAlbums error', error.statusText);
            alert('Something went wrong! Check the server.')
        });
    }//end getAlbums

    self.getGenres = function () {
        $http({
            method: 'GET',
            url: '/genre'
        }).then((response) => {
            console.log('MusicController - getGenres response', response.data);
            self.genre = response.data;            
        }).catch((error) => {
            console.log('error making GET req', error);
            alert('SOmething went wrong! Check the server.');
        });
    }//end getGenres

    self.deleteAlbum = function (album) {
        $http({
            method: 'DELETE',
            url: '/music/' + album.id
        }).then(function (response) {
            console.log('MusicController - deleteAlbum - response');
            self.getAlbums();
        }).catch(function (error) {
            console.log('MusicController - deleteAlbum - error', error.statusText);
        });
    }//end deleteAlbum
    
    self.getAlbums();
    self.getGenres();

}]);//end MusicController