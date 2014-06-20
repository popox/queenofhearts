angular.module('app').factory('$api', function($rootScope, $http, $location){

  var location = $location.path().split('/'), last_path = location[location.length -1];


  return {
    createIdea: function(idea, callback) {
      // Do ajax POST /ideas
      $http.post('/api/ideas', angular.extend(idea, {project_id: last_path})).
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
      $http.get('/api/project/'+last_path+'/ideas').
        success(function(response) {
          callback(response.data);
        }).
        error(function(data) {
          console.error(data.errors);
        });
    }
  };

});