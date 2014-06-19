// =================
// Search controller
// =================

angular.module('app').controller('SearchCtrl', function($scope, $socket, $timeout) {

  $scope.query = '';
  $scope.searching = false;
  $scope.firstView = true;

  $scope.doSearch = function(){    
    if ($scope.query == '') {
      return;
    }

    $scope.firstView = false;
    $scope.searching = true;

    $scope.results = [];
    DZ.api('/search', 'GET', {q: $scope.query, order: 'RANKING'}, function(res){
      $scope.searching = false;

      var results = res.data.slice(0,10);

      var result;
      var gradualAppend = function(){
        result = results.shift();
        if (!!result) {
          $scope.results.push(result);
          $timeout(gradualAppend, 100);
        }
      }

      gradualAppend();

      console.log('results are', res.data);
    });
  };

  $scope.addTrack = function(track){
    $socket.emit('addTrack', track);
    track.status = 'adding';
  };

  $socket.on('newTrack', function(track){

    // Marking the track as added
    var result = _.find($scope.results, function(result){
      return ( result.id === track.id );
    });

    if (result !== undefined) {
      result.status = 'added';
    }

  });

});
