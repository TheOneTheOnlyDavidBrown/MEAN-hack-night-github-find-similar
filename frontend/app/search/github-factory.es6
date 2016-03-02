(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name search.factory:Github
   *
   * @description
   *
   */
  angular
    .module('search')
    .factory('Github', Github);

  function Github($http) {
    let GithubBase = {};
    GithubBase.findRepo = (query) => {
      return $http.get('http://api.github.com/repos/'+query);
    };
    GithubBase.findTrending = (repo) => {
      return $http.get(`https://api.github.com/search/repositories?q=created:%3E2016-02-01+language:${repo.language}+sort:stars`);
    };
    return GithubBase;
  }
}());
