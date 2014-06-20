angular.module('app').factory('$api', function($rootScope, $http){

  return {
    createIdea: function(idea, callback) {
      // Do ajax POST /ideas
      $http.post('/api/ideas', idea).
        success(function(response) {
          callback(response.data);
        }).
        error(function(data) {
          console.error(data.errors);
        });
    },

    vote: function(opts, callback) {
      // Do ajax POST /ideas/:id/vote
      $http.post('/api/ideas/'+opts.ideaId+'/vote').
        success(function(response) {
          callback(response.data);
        }).
        error(function(data) {
          console.error(data.errors);
        });
    },

    ideas: function(callback) {
      // Do ajax GET /ideas
      $http.get('/api/ideas').
        success(function(response) {
          callback(response.data);
        }).
        error(function(data) {
          console.error(data.errors);
        });
    }
  };

});