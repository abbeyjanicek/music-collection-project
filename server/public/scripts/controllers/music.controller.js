musicCollectionApp.controller('MusicController', ['$http', function ($http) {
    console.log('MusicController GO!');

    const self = this;
    self.albumToAdd = { list: [{ title: 'Bad', artist: 'Michael Jackson', genre: 'pop' }] } //release_date: '1987-08-07', image_url: 'images/bad_mj.jpg'

    self.addAlbum = function(albumToAdd) {
        console.log('in addAlbum');
        $http({
            method: 'POST',
            url: '/music',
            data: albumToAdd
        }).then(function (response) {
            console.log('MusicController - addAlbum - response', response.data);
            self.albumToAdd = { title: '', artist: '', genre: ''} //release_date: '', image_url: ''
        }).catch(function (error) {
            console.log('MusicController - addAlbum - error', error);
        });

        
    }

}])