// =================
// Search controller
// =================

angular.module('app').controller('AddCtrl', function($rootScope, $scope, $api, $timeout) {

  $scope.query = '';
  $scope.adding = false;
  $scope.firstView = true;

  $scope.doAdd = function(){
    if ($scope.title == '' && $scope.body == '') {
      return;
    }

    $scope.firstView = false;
    $scope.adding = true;

    $scope.results = [];
    $api.createIdea({title: $scope.title, body: $scope.body, project_id: 'clicrdv', user_id: 0}, function(res){
      $scope.adding = false;
      $rootScope.isAdd = false;

      $rootScope.$broadcast('newIdea', res);
    });
  };

});
