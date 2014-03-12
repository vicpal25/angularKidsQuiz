'use strict';

var app = angular.module('angularAppApp');

app.factory('itemService', function myService(angularFire) {
    var _url = 'https://flashcardsgame.firebaseio.com/answers/';
    var _ref = new Firebase(_url)

    function getTodos() {
        return [{item: "Task 1", done: false}, {item: "Task 2", done: false}, {item: "Task 3", done: false}];
    }

    function calculateTask() {      
        var result = [];
        angular.forEach([0,1], function( arg ) {
           result.push(Math.floor(Math.random()*11)+arg);     
        });
       return result;
    }

    return {
      getCards: function($scope) {
        return calculateTask();
      },
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
        var itemRef = new Firebase(_url + '/' + id);
        itemRef.remove();
      }
    };    
  
})

app.directive("myResult", function() {
      return {
        template: '<span class="answer{{result.result}}">{{result.answer}}</span>'
      };
});



app.filter('orderByAnswer', function() {

  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field]);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };

});

var MainCtrl = function($scope, itemService) {

var linkRef = new Firebase("https://flashcardsgame.firebaseio.com/answers");

$scope.resultsList = [];

linkRef.on('value', function(snapshot) {

  snapshot.forEach(function(parentChildSnapShot) {
    var name = parentChildSnapShot.name();
    var childData = parentChildSnapShot.val();
    var nameSnapshot = parentChildSnapShot.child(name);

      childData.forEach(function(childSnapshot) {
          $scope.resultsList.push({  
            answer: childSnapshot.answer,
            result: childSnapshot.result
          });
      });

  });

});

  $scope.contextList = [];

  itemService.setListToScope($scope, 'items');
  $scope.newItem = {};

  $scope.isActive = false;
  $scope.getClass = "";
  $scope.addNewItem = function() {
    itemService.addItem($scope.newItem);
    $scope.newItem = {};
  };
  $scope.deleteItem = function(id){
    itemService.deleteItem(id);
  };
  $scope.removeAll = function() {
    itemService.removeAll();
  };

  $scope.testResult = function() {
      var $calculatedAnswer = parseInt($scope.cards[0]) + parseInt($scope.cards[1]),
          $userAnswer = parseInt($scope.userAnswer),
          isCorrect = ($calculatedAnswer === $userAnswer) ? true : false;

          $scope.getClass = isCorrect ? "answerWrong" : "answerRight";

          $scope.contextList.push({
            answer: $scope.cards[0] + ' + ' + $scope.cards[1],
            result: ($calculatedAnswer === $userAnswer ? 1 : 0)
          });

          if($scope.contextList.length === 3) {
            itemService.addItem($scope.contextList);
          }

          $scope.cards = itemService.getCards();

  };

  $scope.openState = function() {
     $scope.isActive = !$scope.isActive;
  }

  //$scope.todos = itemService.getTodoItems();
  //$scope.todos = [{item: "Task 1", done: false}, {item: "Task 2", done: false}, {item: "Task 3", done: false}];
  $scope.cards = itemService.getCards();
  
}




