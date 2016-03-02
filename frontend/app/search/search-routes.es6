(function () {
  'use strict';

  angular
    .module('search')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'search/search.tpl.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      });
  }
}());
