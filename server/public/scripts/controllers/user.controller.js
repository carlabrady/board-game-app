myApp.controller('UserController', function(UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;

    function makeTitle(str) { //not working
      if (typeof str !== 'string') {
          throw new TypeError ('expects a string');
      } else {
        return str.split(' ').map(function(word) {
            return word[0].toUpperCase() + word.substr(1);
        }).join(' ');
      };
    };

    vm.getGame = function (search) {
      makeTitle(search);     //attempting to capitalize search
      console.log('make title search:', search);
      UserService.getGame(search).then( function () {
        console.log('title search in get game:', search);        
        vm.games = UserService.userObject.games;
        console.log('game return in controller', UserService.userObject.games );
        console.log('vm.games:', vm.games);
      })
    };
    
});