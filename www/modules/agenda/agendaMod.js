angular.module('kkfet.agenda', [])
.controller('MapCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
 
    
    $scope.$on('$ionicView.beforeEnter', function() {
       $rootScope.bar_style = 'bar-defaut';
    });
}]);