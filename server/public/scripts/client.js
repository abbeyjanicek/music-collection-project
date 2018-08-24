console.log('js');

let musicCollectionApp = angular.module('musicCollectionApp', ['ngRoute']);

// angular.module('datepickerBasicUsage', ['ngMaterial', 'ngMessages']).controller('AppCtrl', function() {
//     this.myDate = new Date();
//     this.isOpen = false;
//   });

musicCollectionApp.config(function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: "HomeController as hc"
    }).when('/music', {
        templateUrl: 'views/music.html',
        controller: 'MusicController as mc'
    }).when('/genre', {
        templateUrl: 'views/genre.html',
        controller: 'GenreController as gc'
    }).otherwise( {
        templateUrl: 'views/404.html'
    })
})
