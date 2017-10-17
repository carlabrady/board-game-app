myApp.factory('UserService', function($http, $location){
    console.log('UserService Loaded');
    var self = this;
    
    var userObject = {};
  
    function getuser() {
      console.log('UserService -- getuser');
      $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
              userObject.userName = response.data.username;
              console.log('UserService -- getuser -- User Data: ', userObject.userName);
          } else {
              console.log('UserService -- getuser -- failure');
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      },function(response){
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    };

    function logout() {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    };

    self.getGame = function(gameIn) {
      console.log('search parameters', gameIn);
      $http({
          method: 'GET',
          url: '/bbg/' + gameIn,
      }).then( function( response ){
          console.log( 'back from server call with:', response );
          games=response.data;     
          console.log('games:', games);           
      }); //end $http
  } // end getgame

    return {
      userObject: userObject,
      getuser: getuser,
      logout: logout,
      getGame: self.games
    };
  });