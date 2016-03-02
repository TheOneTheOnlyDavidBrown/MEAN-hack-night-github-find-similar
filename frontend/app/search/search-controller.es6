(function () {
  'use strict';

  class SearchCtrl {
    constructor(Github, Backend) {
      let vm = this;

      vm._github = Github;
      vm._backend = Backend;
      vm.results = [];
      vm.getWatchlist();
    }

    findSimilarSide(item) {
      let vm = this;
      vm.findSimilar(`${item.owner}/${item.repo}`);
    }

    findSimilar(query) {
      let vm = this;
      vm._github.findRepo(query).success((repo) => {
        vm.trendingSearchLanguage = repo.language;
        vm._github.findTrending(repo).success((trending) => {
          vm.results = trending.items;
        });
      });
    }

    fillStar(item) {
      let vm = this;
      let isIn = false;
      angular.forEach(vm.watchlist, (watchlistItem) => {
        if (watchlistItem.owner === item.owner.login && watchlistItem.repo === item.name) {
          isIn = true;
        }
      });
      return isIn;
    }

    toggleStar(item) {
      let vm = this;
      // if not in watchlist
      let isInWatchlist = false;
      angular.forEach(vm.watchlist, (watchlistItem)=>{
        if (watchlistItem.owner === item.owner.login && watchlistItem.repo === item.name) {
          isInWatchlist = true;
          item = watchlistItem;
        }
      });
      if (isInWatchlist) {
        vm.removeFromWatchlist(item);
      } else {
        vm.addToWatchlist(item);
      }
    }

    addToWatchlist(item) {
      let vm = this;
      vm._backend.add(item).success((resp) => {
        vm.watchlist = resp;
      });
    }

    removeFromWatchlist(item) {
      let vm = this;
      vm._backend.remove(item).success((resp)=>{
        vm.watchlist = resp;
      });
    }
    getWatchlist() {
      let vm = this;
      vm._backend.watchlist().success((resp)=>{
        vm.watchlist = resp;
      });
    }
  }

  /**
   * @ngdoc object
   * @name search.controller:SearchCtrl
   *
   * @description
   *
   */
  angular
    .module('search')
    .controller('SearchCtrl', SearchCtrl);
}());
