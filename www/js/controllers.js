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

.controller('EventsCtrl', ['$scope', '$rootScope', '$stateParams', 'kkfetService', function($scope, $rootScope, $stateParams, kkfetService,$cordovaGeolocation) {
    $scope.events = {};
      
    $scope.$on('$ionicView.beforeEnter', function() {
       $rootScope.bar_style = 'bar-agenda';
    }); 

   
    
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
.controller('EventsMapCtrl', ['$scope', '$rootScope', '$stateParams', 'kkfetService','$cordovaGeolocation','$ionicPlatform','$ionicPopup','$ionicSideMenuDelegate',
    function($scope, $rootScope, $stateParams, kkfetService,$cordovaGeolocation, $ionicPlatform,$ionicPopup,$ionicSideMenuDelegate) {
    $scope.events = {};
       $scope.map = {center: {latitude: 0, longitude: 0 }, zoom: 3 };
     
    $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
   
    
    kkfetService.getEvents().then(
        function (events){
            $scope.events = events;
        }
    );
    $scope.showDetails = function(result){
        console.log(result);
          $ionicPopup.show({
              template: "<style>.popup { width:800px; }</style><img  width='150px' src="+result.locationImage+"><h3><i class='icon ion-cash'></i>"+result.price+"</h3><p>"+result.detail+"</p>",
              title: result.title,
              subTitle: "<i class='icon ion-earth'/> "+result.address +" <i class='icon ion-calendar'/> "+result.dateString,
              scope: $scope,
              buttons: [
               { text: 'Close',type: 'button-assertive' }
              
              ]
            });
       }

    $scope.showEvents= function(data){
       $scope.results= data;
       $scope.showPopup = true;
    }
   $scope.getGeo = function(){
         console.log('geo');
        $ionicPlatform.ready(function() {
           $cordovaGeolocation.getCurrentPosition().then(function (position) {

                     // results
                    console.log(position);
                     var lat  = position.coords.latitude
                      var lon = position.coords.longitude
                      $scope.map = {center: {latitude: lat, longitude: lon}, zoom: 16 };
                     $scope.circles = [
                            {
                                id: 1,
                                center: {
                                    latitude: position.coords.latitude,
                                    longitude:position.coords.longitude
                                },
                                radius: 400,
                                stroke: {
                                    color: '#660000',
                                    weight: 1,
                                    opacity: 1
                                },
                                fill: {
                                    color: '#e50000',
                                    opacity: .01
                                },
                                geodesic: true, // optional: defaults to false
                                draggable: false, // optional: defaults to false
                                clickable: false, // optional: defaults to true
                                editable: false, // optional: defaults to false
                                visible: true, // optional: defaults to true
                                control: {}
                            },
                             {
                                id: 2,
                                center: {
                                    latitude: position.coords.latitude,
                                    longitude:position.coords.longitude
                                },
                                radius: 10,
                                stroke: {
                                    color: '#660000',
                                    weight: 1,
                                    opacity: 1
                                },
                                fill: {
                                    color: '#660000',
                                    opacity: 1
                                },
                                geodesic: true, // optional: defaults to false
                                draggable: false, // optional: defaults to false
                                clickable: false, // optional: defaults to true
                                editable: false, // optional: defaults to false
                                visible: true, // optional: defaults to true
                                control: {}
                            },
                            {
                                id: 3,
                                center: {
                                    latitude: position.coords.latitude,
                                    longitude:position.coords.longitude
                                },
                                radius: 200,
                                stroke: {
                                    color: '#660000',
                                    weight: 1,
                                    opacity: 1
                                },
                                fill: {
                                    color: '#660000',
                                    opacity: .01
                                },
                                geodesic: true, // optional: defaults to false
                                draggable: false, // optional: defaults to false
                                clickable: false, // optional: defaults to true
                                editable: false, // optional: defaults to false
                                visible: true, // optional: defaults to true
                                control: {}
                            }
                      ];

                      //end
                    }, function(err) {
                        alert('code: '    + err.code    + '\n' + 'message: ' + err.message + '\n');
                    });
        });
     };

   
}])

.controller('EventCtrl', ['$scope', '$rootScope', '$stateParams', 'kkfetService', function($scope, $rootScope, $stateParams, kkfetService,$ionicLoading) {
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
