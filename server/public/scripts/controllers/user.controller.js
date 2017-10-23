myApp.controller('UserController', function($location, UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.players = ['1', '2', '3', '4', '5', '6', '7', '8']

    vm.getGame = function (search) {
      console.log('make title search:', search);
      UserService.getGame(search).then( function () {       
        vm.games = UserService.userObject.games;
      });
    };

    vm.palyerSearch = function (count) {
      console.log('make count search:', count);
      UserService.countSearch(count).then( function () {
        vm.games = UserService.userObject.games;
      })
    };

    vm.genreSearch = function (types) {
      console.log('make genre search:', types);
      UserService.countSearch(types).then( function () {
        vm.games = UserService.userObject.games;
      })
    };
    
});