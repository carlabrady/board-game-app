myApp.factory('UserService', function($http, $location){
    console.log('UserService Loaded');
   
    var userObject = {};
    userObject.games = {};

    return {
        userObject: userObject,
    
        getuser: function () {
            console.log('UserService -- getuser');
            $http.get('/user').then(function(response) {
                console.log('response from getuser', response);
                if(response.data.username) {
                    // user has a curret session on the server
                    userObject.userName = response.data.username;
                    userObject.id = response.data.id;                    
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
        },

        logout: function () {
            console.log('UserService -- logout');
            $http.get('/user/logout').then(function(response) {
                console.log('UserService -- logout -- logged out');
                $location.path("/home");
            });
        },

        getGame: function(gameIn) {
            console.log('search parameters', gameIn);
            return $http({
                method: 'GET',
                url: '/titleSearch/' + gameIn,
            }).then( function( response ){
                console.log( 'back from server call with:', response );
                // games=response.data;  
                userObject.games = response.data;
                console.log('get games return:', userObject.games);           
            }); //end $http
        }, // end getgame

        countSearch: function(countIn) {
            console.log('search parameters', countIn);
            return $http({
                method: 'GET',
                url: '/countSearch/' + countIn,
            }).then( function( response ){
                console.log( 'back from server call with:', response );
                // games=response.data;  
                userObject.games = response.data;
                console.log('count games return:', userObject.games);           
            }); //end $http
        }, // end getgame

        userGames: function(id) {
            console.log('user collection call with id:', id);
            return $http({
                method: 'GET',
                url: '/userGames/' + id,
            }).then( function( response ){
                console.log( 'back from server call with:', response );
                // games=response.data;  
                userObject.games = response.data;
                console.log('user games return:', userObject.games);           
            }); //end $http
        }, // end getgame

        wishList: function(id) {
            console.log('user collection call with id:', id);
            return $http({
                method: 'GET',
                url: '/userGames/wishlist/' + id,
            }).then( function( response ){
                console.log( 'back from server call with:', response );
                // games=response.data;  
                userObject.games = response.data;
                console.log('user games return:', userObject.games);           
            }); //end $http
        }, // end getgame


        updateUserCollection: function(game) {
            console.log('update user collection with info:', game);
            return $http({
                method: 'POST',
                url: '/userGames',
                data: game,
            }).then( function( response ){
                console.log( 'back from server call with:', response );       
            }); //end $http
        },

        updateUserWants: function(game) {
            console.log('update user collection with info:', game);
            return $http({
                method: 'POST',
                url: '/userGames/wish',
                data: game,
            }).then( function( response ){
                console.log( 'back from server call with:', response );       
            }); //end $http
        },

        searchGenre: function(search) {
            console.log('search genre in service:', search);
            return $http({
                method: 'POST',
                url: '/genreSearch',
                data: search
            }).then( function( response ){
                console.log( 'back from server call with:', response );
                // games=response.data;  
                userObject.games = response.data;
                console.log('user games return:', userObject.games);           
            }); //end $http
        }, // end getgame
    }
});