'use strict';

//DEFINE ANGULAR APPLICATION
var classApp =  angular.module('angularAppApp', [
  'firebase',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/');  
    $stateProvider
      .state('index', {
        url: '/', 
        // views:  {
        //   header: 'common/header.tpl.html'          
        // },
        templateUrl: 'views/main.html',
        controller:'MainCtrl'
      })
  })

//DEFINE ANGULAR APPLICATION FACTORY --> LOGIC WILL EXECUTE THROUGH THE ROUTE LAYER
classApp.factory('itemService', function myService(angularFire) {
    var _url = 'https://musiccollection.firebaseio.com/';
    var _ref = new Firebase(_url)

    function getTodos() {
        return [{item: "Task 1", done: false}, {item: "Task 2", done: false}, {item: "Task 3", done: false}];
    }

    function calculateTask() {      

        trace("here");    
        angular.forEach([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], function( arg ) {
        var result = [];
        trace(arg);

        return result;

         // var title = article.article_title;
         // if( !result[title] ) {
         //   result[title] = [article];
         // } else {
         //   result[title].push(article);
         // }
      });
    }
    
    return {
      // getCards: function($scope) {
      //   return calculateTask();
      // },
      getTodoItems: function($scope) {
        return getTodos();
      },
      setListToScope: function(scope, localScopeVarName) {
        angularFire(_ref, scope, localScopeVarName);
      },
      addItem: function(item){
        _ref.push(item);
      },
      removeAll: function(){
        _ref.remove();
      },
      deleteItem: function(id){
        var nestedValue = superheroCtrl.addNewItem();
        var itemRef = new Firebase(_url + '/' + id);
        itemRef.remove();
      },
      testMessage: function(){
          return "hi testing";
      }
    };
})

//DEFINE CONTROLLERS






