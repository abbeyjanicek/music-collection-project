musicCollectionApp.controller('MusicController', ['$http', function ($http) {
    console.log('MusicController GO!');

    const self = this;
    self.album = { list: [{ title: 'Bad', artist: 'Michael Jackson', release_date: '', genre: 'pop', image_url: 'images/bad_mj.jpg' }] }

    self.addAlbum = function(albumToAdd) {
        console.log('in addAlbum');
        $http({
            method: 'POST',
            url: '/music',
            data: albumToAdd
        }).then(function (response) {
            console.log('MusicController - addAlbum - response', response.data);
            self.albumToAdd = { title: '', artist: '', release_date: '', genre: '', image_url: ''} 
            getAlbums();
        }).catch(function (error) {
            console.log('MusicController - addAlbum - error', error);
        });
    }//end addAlbum

    function getAlbums() {
        console.log('in getAlbums');
        $http({
            method: 'GET',
            url: '/music'
        }).then(function (response) {
            console.log('MusicController - getAlbums response', response.data);
            self.album.list = response.data;           
        }).catch((error) => {
            console.log('MusicController - getAlbums error', error.statusText);
            alert('Something went wrong! Check the server.')
        })
    }//end getAlbums

    getAlbums();

    self.deleteAlbum = function (album) {
        $http({
            method: 'DELETE',
            url: '/music/' + album.id
        }).then(function (response) {
            console.log('MusicController - deleteAlbum - response');
            getAlbums();
        }).catch(function (error) {
            console.log('MusicController - deleteAlbum - error', error.statusText);
        });
    }//end deleteAlbum
}]);//end MusicController