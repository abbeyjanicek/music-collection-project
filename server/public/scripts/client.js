console.log('js');

let musicCollectionApp = angular.module('musicCollectionApp', ['ngRoute', 'ngMaterial', 'ngMessages']);


musicCollectionApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        redirectTo: '/music'
    }).when('/music', {
        templateUrl: 'views/music.html',
        controller: 'MusicController as mc'
    }).when('/genre', {
        templateUrl: 'views/genre.html',
        controller: 'GenreController as gc'
    }).otherwise({
        templateUrl: 'views/404.html'
    })
})
