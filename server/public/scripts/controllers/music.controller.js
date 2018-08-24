musicCollectionApp.controller('MusicController', ['$http', function ($http) {
    console.log('MusicController GO!');

    const self = this;
    self.album = { list: [{ title: 'Bad', artist: 'Michael Jackson', genre: 'pop', image_url: 'images/bad_mj.jpg' }] } //release_date: '1987-08-07', 

    self.addAlbum = function(albumToAdd) {
        console.log('in addAlbum');
        $http({
            method: 'POST',
            url: '/music',
            data: albumToAdd
        }).then(function (response) {
            console.log('MusicController - addAlbum - response', response.data);
            self.albumToAdd = { title: '', artist: '', genre: '', image_url: ''} //release_date: '', 
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

}])//end MusicController