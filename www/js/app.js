// Ionic kkfet App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'kkfet' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'kkfet.services' is found in services.js
// 'kkfet.controllers' is found in controllers.js
angular.module('kkfet', ['ionic', 'kkfet.controllers', 'kkfet.services','uiGmapgoogle-maps','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider,uiGmapGoogleMapApiProvider,$urlRouterProvider) {
     uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDFberVyWaVDCxFLaRxYLxUuSd4uPb_I2s',
    v: '3.17',
    libraries: 'weather,geometry,visualization',
    language: 'en',
    sensor: 'false',
  });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('mobile', {
    url: '/mobile',
    abstract: true,
    templateUrl: 'templates/tabs.html'

  })

  // Each tab has its own nav history stack:

  .state('mobile.niouz', {
    url: '/niouz/',
    views: {
      'tab-niouz': {
        templateUrl: 'templates/niouz.html',
        controller: 'NiouzCtrl'
      }
    }
  })

  .state('mobile.niouz-single', {
    url: '/niouz/:niouzId',
    views: {
      'tab-niouz': {
        templateUrl: 'templates/niouz-single.html',
        controller: 'NiouzSingleCtrl'
      }
    }
  })

  .state('mobile.events', {
      url: '/events',
      views: {
        'tab-events': {
          templateUrl: 'templates/events.html',
          controller: 'EventsCtrl'
        }
      }
    })
    .state('mobile.events.list', {
      url: '/list',
      views: {
        'agenda': {
          templateUrl: 'templates/events-list.html'
        }
      }
    })
    .state('mobile.events.map', {
      url: '/map',
      views: {
        'agenda': {
          templateUrl: 'templates/events-map.html',
          controller:'EventsMapCtrl'
        }
      }
    })
    .state('mobile.event', {
      url: '/event/:eventId',
      views: {
        'tab-events': {
          templateUrl: 'templates/event.html',
          controller: 'EventCtrl'
        }
      }
    })

  .state('mobile.locations', {
      url: '/locations/',
      views: {
        'tab-locations': {
          templateUrl: 'templates/locations.html',
          controller: 'LocationsCtrl'
        }
      }
    })

    .state('mobile.location', {
      url: '/location/:locationId',
      views: {
        'tab-locations': {
          templateUrl: 'templates/location.html',
          controller: 'LocationCtrl'
        }
      }
    })

  .state('mobile.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/mobile/niouz/');

})



.filter('FormatDate', function () {
    return function (item) {
        var annee = item.substr(0,4);
        var mois = item.substr(5,2);
        var jour = item.substr(8,2);
        var formatted = jour+'-'+mois+'-'+annee;
        return formatted; 
    };
})

.filter('LimitLetter', function () {
    return function (item, nb) {
        var titre;
        if(item.length > nb){
            titre = item.substr(0,nb)+"...";       
        }else{
            titre = item;
        }
        return titre;
    };
});
