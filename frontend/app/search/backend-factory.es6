(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name search.factory:Backend
   *
   * @description
   *
   */
  angular
    .module('search')
    .factory('Backend', Backend);

  function Backend($http) {
    let BackendBase = {};
    let base = 'http://localhost:8080/api';
    BackendBase.watchlist = () => {
      return $http.get(`${base}/watchlist`);
    };

    BackendBase.remove = (item) => {
      return $http.delete(`${base}/watchlist/${item._id}`);
    };

    BackendBase.add = (item) => {
      return $http.post(`${base}/watchlist/${item.owner.login}/${item.name}`);
    };
    return BackendBase;
  }
}());
