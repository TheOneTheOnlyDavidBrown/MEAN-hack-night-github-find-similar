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
      let date = new Date();
      date.setDate(date.getDate()-5);
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();

      // HACK BECAUSE I DONT FEEL LIKE FINDING THE CORRECT WAY!
      if (day < 10) {
        day = '0'+day;
      }
      if (month < 10) {
        month = '0'+month;
      }

      return $http.get(`https://api.github.com/search/repositories?q=created:>${year}-${month}-${day}+language:${repo.language}+sort:stars`);
    };
    return GithubBase;
  }
}());
