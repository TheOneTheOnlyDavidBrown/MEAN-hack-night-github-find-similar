(function () {
  'use strict';

  class SearchCtrl {
    constructor(Github, Backend) {
      let vm = this;
      // for testing. should remove
      vm.query = 'npm/npm';
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
        vm.trendingSearchLanguage = repo.language
        vm._github.findTrending(repo).success((trending) => {
          vm.results = trending.items;
        });
      });

    //   vm.results = [{
    //     'id': 1296269,
    //     'owner': {
    //       'login': 'octocat',
    //       'id': 1,
    //       'avatar_url': 'https://eee.com/images/error/octocat_happy.gif',
    //       'gravatar_id': '',
    //       'url': 'https://api.github.com/users/octocat',
    //       'html_url': 'https://github.com/octocat',
    //       'followers_url': 'https://api.github.com/users/octocat/followers',
    //       'following_url': 'https://api.github.com/users/octocat/following{/other_user}',
    //       'gists_url': 'https://api.github.com/users/octocat/gists{/gist_id}',
    //       'starred_url': 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
    //       'subscriptions_url': 'https://api.github.com/users/octocat/subscriptions',
    //       'organizations_url': 'https://api.github.com/users/octocat/orgs',
    //       'repos_url': 'https://api.github.com/users/octocat/repos',
    //       'events_url': 'https://api.github.com/users/octocat/events{/privacy}',
    //       'received_events_url': 'https://api.github.com/users/octocat/received_events',
    //       'type': 'User',
    //       'site_admin': false
    //     },
    //     'name': 'Hello-World',
    //     'full_name': 'octocat/Hello-World',
    //     'description': 'This your first repo!',
    //     'private': false,
    //     'fork': true,
    //     'url': 'https://api.github.com/repos/octocat/Hello-World',
    //     'html_url': 'https://github.com/octocat/Hello-World',
    //     'archive_url': 'http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}',
    //     'assignees_url': 'http://api.github.com/repos/octocat/Hello-World/assignees{/user}',
    //     'blobs_url': 'http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}',
    //     'branches_url': 'http://api.github.com/repos/octocat/Hello-World/branches{/branch}',
    //     'clone_url': 'https://github.com/octocat/Hello-World.git',
    //     'collaborators_url': 'http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}',
    //     'comments_url': 'http://api.github.com/repos/octocat/Hello-World/comments{/number}',
    //     'commits_url': 'http://api.github.com/repos/octocat/Hello-World/commits{/sha}',
    //     'compare_url': 'http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}',
    //     'contents_url': 'http://api.github.com/repos/octocat/Hello-World/contents/{+path}',
    //     'contributors_url': 'http://api.github.com/repos/octocat/Hello-World/contributors',
    //     'deployments_url': 'http://api.github.com/repos/octocat/Hello-World/deployments',
    //     'downloads_url': 'http://api.github.com/repos/octocat/Hello-World/downloads',
    //     'events_url': 'http://api.github.com/repos/octocat/Hello-World/events',
    //     'forks_url': 'http://api.github.com/repos/octocat/Hello-World/forks',
    //     'git_commits_url': 'http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}',
    //     'git_refs_url': 'http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}',
    //     'git_tags_url': 'http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}',
    //     'git_url': 'git:github.com/octocat/Hello-World.git',
    //     'hooks_url': 'http://api.github.com/repos/octocat/Hello-World/hooks',
    //     'issue_comment_url': 'http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}',
    //     'issue_events_url': 'http://api.github.com/repos/octocat/Hello-World/issues/events{/number}',
    //     'issues_url': 'http://api.github.com/repos/octocat/Hello-World/issues{/number}',
    //     'keys_url': 'http://api.github.com/repos/octocat/Hello-World/keys{/key_id}',
    //     'labels_url': 'http://api.github.com/repos/octocat/Hello-World/labels{/name}',
    //     'languages_url': 'http://api.github.com/repos/octocat/Hello-World/languages',
    //     'merges_url': 'http://api.github.com/repos/octocat/Hello-World/merges',
    //     'milestones_url': 'http://api.github.com/repos/octocat/Hello-World/milestones{/number}',
    //     'mirror_url': 'git:git.example.com/octocat/Hello-World',
    //     'notifications_url': 'http://api.github.com/repos/octocat/Hello-World/notifications{?since, all, participating}',
    //     'pulls_url': 'http://api.github.com/repos/octocat/Hello-World/pulls{/number}',
    //     'releases_url': 'http://api.github.com/repos/octocat/Hello-World/releases{/id}',
    //     'ssh_url': 'git@github.com:octocat/Hello-World.git',
    //     'stargazers_url': 'http://api.github.com/repos/octocat/Hello-World/stargazers',
    //     'statuses_url': 'http://api.github.com/repos/octocat/Hello-World/statuses/{sha}',
    //     'subscribers_url': 'http://api.github.com/repos/octocat/Hello-World/subscribers',
    //     'subscription_url': 'http://api.github.com/repos/octocat/Hello-World/subscription',
    //     'svn_url': 'https://svn.github.com/octocat/Hello-World',
    //     'tags_url': 'http://api.github.com/repos/octocat/Hello-World/tags',
    //     'teams_url': 'http://api.github.com/repos/octocat/Hello-World/teams',
    //     'trees_url': 'http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}',
    //     'homepage': 'https://github.com',
    //     'language': 'javascript',
    //     'forks_count': 9,
    //     'stargazers_count': 80,
    //     'watchers_count': 80,
    //     'size': 108,
    //     'default_branch': 'master',
    //     'open_issues_count': 0,
    //     'has_issues': true,
    //     'has_wiki': true,
    //     'has_pages': false,
    //     'has_downloads': true,
    //     'pushed_at': '2011-01-26T19:06:43Z',
    //     'created_at': '2011-01-26T19:01:12Z',
    //     'updated_at': '2011-01-26T19:14:43Z',
    //     'permissions': {
    //       'admin': false,
    //       'push': false,
    //       'pull': true
    //     }
    //   },{
    //     'id': 1296269,
    //     'owner': {
    //       'login': 'some owner',
    //       'id': 1,
    //       'avatar_url': 'https://eeee.com/images/error/octocat_happy.gif',
    //       'gravatar_id': '',
    //       'url': 'https://api.github.com/users/octocat',
    //       'html_url': 'https://github.com/octocat',
    //       'followers_url': 'https://api.github.com/users/octocat/followers',
    //       'following_url': 'https://api.github.com/users/octocat/following{/other_user}',
    //       'gists_url': 'https://api.github.com/users/octocat/gists{/gist_id}',
    //       'starred_url': 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
    //       'subscriptions_url': 'https://api.github.com/users/octocat/subscriptions',
    //       'organizations_url': 'https://api.github.com/users/octocat/orgs',
    //       'repos_url': 'https://api.github.com/users/octocat/repos',
    //       'events_url': 'https://api.github.com/users/octocat/events{/privacy}',
    //       'received_events_url': 'https://api.github.com/users/octocat/received_events',
    //       'type': 'User',
    //       'site_admin': false
    //     },
    //     'name': 'some repo',
    //     'full_name': 'octocat/Hello-World',
    //     'description': 'This your first repo!',
    //     'private': false,
    //     'fork': true,
    //     'url': 'https://api.github.com/repos/octocat/Hello-World',
    //     'html_url': 'https://github.com/octocat/Hello-World',
    //     'archive_url': 'http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}',
    //     'assignees_url': 'http://api.github.com/repos/octocat/Hello-World/assignees{/user}',
    //     'blobs_url': 'http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}',
    //     'branches_url': 'http://api.github.com/repos/octocat/Hello-World/branches{/branch}',
    //     'clone_url': 'https://github.com/octocat/Hello-World.git',
    //     'collaborators_url': 'http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}',
    //     'comments_url': 'http://api.github.com/repos/octocat/Hello-World/comments{/number}',
    //     'commits_url': 'http://api.github.com/repos/octocat/Hello-World/commits{/sha}',
    //     'compare_url': 'http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}',
    //     'contents_url': 'http://api.github.com/repos/octocat/Hello-World/contents/{+path}',
    //     'contributors_url': 'http://api.github.com/repos/octocat/Hello-World/contributors',
    //     'deployments_url': 'http://api.github.com/repos/octocat/Hello-World/deployments',
    //     'downloads_url': 'http://api.github.com/repos/octocat/Hello-World/downloads',
    //     'events_url': 'http://api.github.com/repos/octocat/Hello-World/events',
    //     'forks_url': 'http://api.github.com/repos/octocat/Hello-World/forks',
    //     'git_commits_url': 'http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}',
    //     'git_refs_url': 'http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}',
    //     'git_tags_url': 'http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}',
    //     'git_url': 'git:github.com/octocat/Hello-World.git',
    //     'hooks_url': 'http://api.github.com/repos/octocat/Hello-World/hooks',
    //     'issue_comment_url': 'http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}',
    //     'issue_events_url': 'http://api.github.com/repos/octocat/Hello-World/issues/events{/number}',
    //     'issues_url': 'http://api.github.com/repos/octocat/Hello-World/issues{/number}',
    //     'keys_url': 'http://api.github.com/repos/octocat/Hello-World/keys{/key_id}',
    //     'labels_url': 'http://api.github.com/repos/octocat/Hello-World/labels{/name}',
    //     'languages_url': 'http://api.github.com/repos/octocat/Hello-World/languages',
    //     'merges_url': 'http://api.github.com/repos/octocat/Hello-World/merges',
    //     'milestones_url': 'http://api.github.com/repos/octocat/Hello-World/milestones{/number}',
    //     'mirror_url': 'git:git.example.com/octocat/Hello-World',
    //     'notifications_url': 'http://api.github.com/repos/octocat/Hello-World/notifications{?since, all, participating}',
    //     'pulls_url': 'http://api.github.com/repos/octocat/Hello-World/pulls{/number}',
    //     'releases_url': 'http://api.github.com/repos/octocat/Hello-World/releases{/id}',
    //     'ssh_url': 'git@github.com:octocat/Hello-World.git',
    //     'stargazers_url': 'http://api.github.com/repos/octocat/Hello-World/stargazers',
    //     'statuses_url': 'http://api.github.com/repos/octocat/Hello-World/statuses/{sha}',
    //     'subscribers_url': 'http://api.github.com/repos/octocat/Hello-World/subscribers',
    //     'subscription_url': 'http://api.github.com/repos/octocat/Hello-World/subscription',
    //     'svn_url': 'https://svn.github.com/octocat/Hello-World',
    //     'tags_url': 'http://api.github.com/repos/octocat/Hello-World/tags',
    //     'teams_url': 'http://api.github.com/repos/octocat/Hello-World/teams',
    //     'trees_url': 'http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}',
    //     'homepage': 'https://github.com',
    //     'language': 'Ruby',
    //     'forks_count': 9,
    //     'stargazers_count': 80,
    //     'watchers_count': 80,
    //     'size': 108,
    //     'default_branch': 'master',
    //     'open_issues_count': 0,
    //     'has_issues': true,
    //     'has_wiki': true,
    //     'has_pages': false,
    //     'has_downloads': true,
    //     'pushed_at': '2011-01-26T19:06:43Z',
    //     'created_at': '2011-01-26T19:01:12Z',
    //     'updated_at': '2011-01-26T19:14:43Z',
    //     'permissions': {
    //       'admin': false,
    //       'push': false,
    //       'pull': true
    //     }
    //   }
    // ];
    //   vm.trendingSearchLanguage = vm.results[0].language;
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

    toggleStar (item)  {
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
      this._backend.add(item)
        .success((resp) => {
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
