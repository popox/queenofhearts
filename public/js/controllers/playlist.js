// ===================
// Playlist controller
// ===================

angular.module('app').controller('PlaylistCtrl', function($scope, $timeout, cooldowns, ideas, User, $api) {

  $scope.hiddenCooldowns = [cooldowns.multiply, cooldowns.spotlight];

  $scope.currentIdea = null;
  $scope.user = User;
  $scope.ideas = ideas;

  $scope.isStar = function(idea) {
    return idea.id === $scope.user.currentStarId;
  };

  $scope.doStar = function(idea) {
    if ($scope.user.currentStarId === idea.id) {
      // $scope.user.currentStarId = null;
    }
    else {
      $api.vote({userId: User.id, ideaId: idea.id}, function(){
        $scope.user.currentStarId = idea.id;
      });
    }
  };


  $scope.openSlide = function(idea) {
    $scope.currentIdea = idea;
  };

  $scope.closeSlide = function() {
    $scope.currentIdea = null;
  };

  $scope.toggleSlide = function(idea) {
    if ($scope.currentIdea === idea) {
      $scope.closeSlide();
    }
    else {
      $scope.openSlide(idea);
    }
  };

  // Watch the playlist changes
  $scope.$watchCollection('ideas', function(){

    // Gradual entering
    var playlist = _.sortBy(_.values(ideas), function(idea){
      return -1 * idea.score;
    });

    var newIdea;
    $scope.playlist = [];
    var gradualAppend = function(){
      newIdea = playlist.shift();
      if (!!newIdea) {
        $scope.playlist.push(newIdea);
        $timeout(gradualAppend, 100);
      }
    };

    gradualAppend();
  });

});