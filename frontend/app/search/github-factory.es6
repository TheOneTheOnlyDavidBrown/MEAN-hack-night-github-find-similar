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
      // TODO: DYNAMICALLY DO THIS
      let day = '23';
      let month = '02';
      let year = '2016';

      return $http.get(`https://api.github.com/search/repositories?q=created:>${year}-${month}-${day}+language:${repo.language}+sort:stars`);
    };
    return GithubBase;
  }
}());
