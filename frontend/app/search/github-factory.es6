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
      let dateObj = new Date();
      let month = dateObj.getUTCMonth(); //month index starts at 0
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();

      // HACK! but it is hack night...
      if (day < 10){
        day = '0'+day;
      }
      if (month < 10){
        month = '0'+month;
      }

      return $http.get(`https://api.github.com/search/repositories?q=created:>${year}-${month}-${day}+language:${repo.language}+sort:stars`);
    };
    return GithubBase;
  }
}());
