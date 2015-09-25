angular.module('kkfet.controllers', [])

.controller('NiouzCtrl', ['$scope', '$rootScope', '$stateParams', 'kkfetService', function($scope, $rootScope, $stateParams, kkfetService) {
    $scope.niouz = [];
    
    $scope.$on('$ionicView.beforeEnter', function() {
       $rootScope.bar_style = 'bar-niouz';
    }); 
    
    kkfetService.getEvents();
    kkfetService.getLocationObjects();
    kkfetService.getPosts().then(
        function (posts){
            angular.forEach(posts, function (value, key){
                $scope.niouz.push(value);
            }); 
        }
    );

    $scope.noMoreItemsAvailable = false;

    $scope.loadMore = function() {
        kkfetService.addPosts().then(
            function (posts){
                if(posts == 'STOP'){
                      $scope.noMoreItemsAvailable = true;
                }else{
                    angular.forEach(posts, function (value, key){
                        $scope.niouz.push(value);
                    });
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        );
    };    
}])

.controller('NiouzSingleCtrl', ['$scope', '$rootScope', '$stateParams', 'kkfetService', function($scope, $rootScope, $stateParams, kkfetService) {
    $scope.niouz = {};
    
    $scope.$on('$ionicView.beforeEnter', function() {
       $rootScope.bar_style = 'bar-niouz';
    }); 
    
    kkfetService.getPost($stateParams.niouzId).then(
        function (post){
            $scope.niouz = post;
            console.log(post.title);
        }
    );
}])

.controller('EventsCtrl', ['$scope', '$rootScope', '$stateParams', 'kkfetService', function($scope, $rootScope, $stateParams, kkfetService) {
    $scope.events = {};
    
    $scope.$on('$ionicView.beforeEnter', function() {
       $rootScope.bar_style = 'bar-agenda';
    }); 


      $scope.map = {center: {latitude: 0, longitude: 0 }, zoom: 1 };
    
    kkfetService.getEvents().then(
        function (events){
            $scope.events = events;
            console.log(events);
            console.log("this");
        }
    );

    $scope.showEvents= function(data){
       $scope.results= data;
       $scope.showPopup = true;
    }

   
}])

.controller('EventCtrl', ['$scope', '$rootScope', '$stateParams', 'kkfetService', function($scope, $rootScope, $stateParams, kkfetService) {
    $scope.event = {};
    $scope.events = {};
    
    $scope.$on('$ionicView.beforeEnter', function() {
       $rootScope.bar_style = 'bar-agenda';
    }); 
    
    kkfetService.getEvents().then(
        function (events){
            $scope.events = events;
            angular.forEach($scope.events, function(value, key) {
                if(value.eventID == $stateParams.eventId){
                    $scope.event = value;
                    console.log($scope.event);
                }
            });
            console.log(events);
        }
    );
}])

.controller('LocationsCtrl', ['$scope', '$rootScope', '$stateParams', 'kkfetService', function($scope, $rootScope, $stateParams, kkfetService) {
    $scope.locations = {};
    
    $scope.$on('$ionicView.beforeEnter', function() {
       $rootScope.bar_style = 'bar-annuaire';
    }); 
    
    kkfetService.getLocationObjects().then(
        function (locations){
            $scope.locations = locations;
        }
    );
}])

.controller('LocationCtrl', ['$scope', '$rootScope', '$stateParams', 'kkfetService', function($scope, $rootScope, $stateParams, kkfetService) {
    $scope.location = {};
    $scope.locations = {};
    
    $scope.$on('$ionicView.beforeEnter', function() {
       $rootScope.bar_style = 'bar-annuaire';
    }); 
    
    kkfetService.getLocationObjects().then(
        function (locations){
            $scope.locations = locations;
            angular.forEach($scope.locations, function(value, key) {
                if(value.location_id == $stateParams.locationId){
                    $scope.location = value;
                    console.log($scope.location);
                }
            });
        }
    );
}])

.controller('AccountCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.settings = {
        enableNotif: true
    };
    
    $scope.$on('$ionicView.beforeEnter', function() {
       $rootScope.bar_style = 'bar-defaut';
    });
}]);
