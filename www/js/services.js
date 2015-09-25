angular.module('kkfet.services', [])

.factory('kkfetService', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
    var factory = {	
        post : false,
        pagePost : 1,
        nbPagePost : 1,
        items : false,
        itemsLoc : false,
        itemsPost : false,
        dtItems : false,
        locations : false,
        getPosts : function(){
            var deferred = $q.defer();

            // Tester si le json a déjà été récupéré
            if(factory.itemsPost !== false){
                deferred.resolve(factory.itemsPost);
            }
            else{
              $http.jsonp("http://www.christopherkeo.com/kkfet2015/api/get_posts/?callback=JSON_CALLBACK&count=20&page="+factory.pagePost)
              .success(function(data) {
                    factory.itemsPost = data['posts'];
                    factory.nbPagePost = data['pages'];
//                    console.log(factory.itemsPost);
//                    var retour = [];
//                    angular.forEach(factory.itemsPost, function (value, key){
//                        if( value.title.indexOf("Newsletter") == -1){
//                            retour.push(value);
//                        }
//                    });
//                    deferred.resolve(retour);
                    deferred.resolve();
              })
              .error(function (data) {
                deferred.reject('Impossible de récupérer les niouz.');
              });
            }

            return deferred.promise;
        },
        addPosts : function(){
            var deferred = $q.defer();
//            console.log(factory.pagePost);
//            console.log(factory.nbPagePost);
            if(factory.pagePost > factory.nbPagePost){
                deferred.resolve('STOP');
            }else{
                $http.jsonp("http://www.christopherkeo.com/kkfet2015/api/get_posts/?callback=JSON_CALLBACK&count=20&page="+factory.pagePost)
                .success(function(data) {
                    factory.itemsPost = data['posts'];
                    factory.pagePost++;
                    // console.log(data['posts']);
                    var retour = [];
                    angular.forEach(data['posts'], function (value, key){
                        if( value.title.indexOf("Newsletter") == -1){
                            retour.push(value);
                        }
                    });
                    deferred.resolve(retour);
                })
                .error(function (data) {
                deferred.reject('Impossible de récupérer les autres niouz.');
                });
            }
            return deferred.promise;
        },
        getPost : function(id){

            var deferred = $q.defer();

             $http.jsonp("http://www.christopherkeo.com/kkfet2015/api/get_post/?post_id="+id+"&callback=JSON_CALLBACK")
             .success(function(data) {
                factory.post = data['post'];
                 // console.log(factory.post);
                deferred.resolve(factory.post);
            })
            .error(function (data) {
                deferred.reject('Impossible de récupérer l\'article.');
            });

            return deferred.promise;
        },
        getEvents : function(){
            var deferred = $q.defer();

            // Tester si le json a déjà été récupéré
            if(factory.items !== false){
                deferred.resolve(factory.items);
            }
            else{
              $http.jsonp("http://www.christopherkeo.com/kkfet2015/api/kkfet/get_events/?callback=JSON_CALLBACK")
              .success(function(data) {
                    factory.items = data['posts'];
                    // console.log(factory.items);
                    deferred.resolve(factory.items);
              })
              .error(function (data) {
                deferred.reject('Impossible de récupérer les événements.');
              });
            }

            return deferred.promise;
        },
        getDtEvents : function(d1, d2){
            var deferred = $q.defer();
            var period = (typeof(d1) === 'undefined' && typeof(d2) === 'undefined')? false : d1+'__'+d2;

            $http.jsonp("http://www.christopherkeo.com/kkfet2015/api/kkfet/get_events/?period="+period+"&callback=JSON_CALLBACK")
            .success(function(data) {
                factory.dtItems = data['posts'];
                // console.log(factory.dtItems);
                deferred.resolve(factory.dtItems);
            })
            .error(function (data) {
                deferred.reject('Impossible de récupérer les événements.');
            });

            return deferred.promise;
        },
        getSingleEvent : function(permalink){

            var deferred = $q.defer();

             $http.jsonp("http://www.christopherkeo.com/kkfet2015/api/kkfet/single_event/?permalink="+permalink+"&callback=JSON_CALLBACK")
             .success(function(data) {
                factory.items = data['posts'];
                // console.log(factory.items);
                deferred.resolve(factory.items);
            })
            .error(function (data) {
                deferred.reject('Impossible de récupérer l\'événement.');
            });

            return deferred.promise;
        },
        getLocationList : function(){

            var deferred = $q.defer();

            if(factory.locations !== false){
                deferred.resolve(factory.locations);
            }
            else{
              $http.jsonp("http://www.christopherkeo.com/kkfet2015/api/kkfet/get_locations/?request=list&callback=JSON_CALLBACK")
              .success(function(data) {
                    factory.locations = data['posts'];
                $timeout(function(){
                    // console.log(factory.locations);
                    deferred.resolve(factory.locations);
                }, 0);
              })
              .error(function (data) {
                deferred.reject('Impossible de récupérer les lieux.');
              });
            }

            return deferred.promise;		
        },
        getLocationObjects : function(){
            var deferred = $q.defer();

            if(factory.itemsLoc !== false){
                deferred.resolve(factory.itemsLoc);
            }
            else{
              $http.jsonp("http://www.christopherkeo.com/kkfet2015/api/kkfet/get_locations/?request=object&callback=JSON_CALLBACK")
              .success(function(data) {
                    factory.itemsLoc = data['posts'];
                    // console.log(factory.itemsLoc);
                    deferred.resolve(factory.itemsLoc);
              })
              .error(function (data) {
                deferred.reject('Impossible de récupérer les objects d\'annuaire.');
              });
            }

            return deferred.promise;
        }
    }
    return factory;
}])
.factory('Tools', ['$http', '$q', '$timeout', '$location', function($http, $q, $timeout, $location){

    var factory = {
        categories : '',
        getCategories : function(type){
            var deferred = $q.defer();


            $http.jsonp("http://www.christopherkeo.com/kkfet2015/api/kkfet/get_categories/?type="+type+"&callback=JSON_CALLBACK")
            .success(function(data) {
                factory.categories = data['posts'];
                // console.log(factory.categories);
                deferred.resolve(factory.categories);
            })
            .error(function (data) {
                deferred.reject('Impossible de récupérer les catégories.');
            });

            return deferred.promise;
        },
        getPeriodFilter : function(period, date1, date2){
            if(typeof(date1) == 'undefined' || typeof(date2) == 'undefined'){
                if(period != ''){
                    d = period.split('{}');
                    var d1 = new Date(d[0]);
                    d1.setHours(0, 0, 0);
                    var d2 = (!d[1])? d1 : new Date(d[1]);
                    d2.setHours(0, 0, 0);
                }
                else{
                    var today = new Date();
                    var d1 = today;
                    d1.setHours(-1, 0, 0); //aujourd'hui -1h

                    // à commenter quand mise en prod !!!
                    today = new Date(today.setMonth(today.getMonth() - 1));
                    var d2 = new Date(today.getFullYear(),today.getMonth(),today.getDate()+34)

                    // à décommenter quand mise en prod !!!
                    // today = new Date();
                    // var d2 = new Date(today.getFullYear(),today.getMonth(),today.getDate()+14)

                    d2.setHours(23, 59, 59); //aujourd'hui + 14 jours à 23h59
                }
            }
            else{
                var d1 = new Date(factory.formatDate(new Date(date1)));
                d1.setHours(0, 0, 0);
                var d2 = new Date(factory.formatDate(new Date(date2)));
                d2.setHours(0, 0, 0);
            }				
            return [d1, d2];		
        },
        // Format : yyyy-mm-dd
        formatDate : function(date, reverse, separator){

            var s = (typeof(separator) != 'undefined')? separator : '-';

            if(reverse){
                var formatted = ("0" + (date.getDate())).slice(-2)+s+("0" + (date.getMonth() + 1)).slice(-2)+s+date.getFullYear();
                return formatted;
            }
            else{
                var formatted = date.getFullYear()+s+("0" + (date.getMonth() + 1)).slice(-2)+s+("0" + (date.getDate())).slice(-2);
                return formatted;
            }	
        }, 
        goTo : function(app, url){
            location.href='http://www.christopherkeo.com/kkfet2015/'+app+'#/'+url;
        }
    }
    return factory;
}]);
