(function () {
  'use strict';

  angular
    .module('neoreachhacknight')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/search');
  }
}());
