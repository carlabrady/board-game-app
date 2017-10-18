myApp.controller('UserController', function(UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    // vm.games = UserService.games.data;

    vm.getGame = function (search) {
      UserService.getGame(search).then( function () {
        vm.games = UserService.userObject.games;
        console.log('game return in controller', UserService.userObject.games );
        console.log('vm.games:', vm.games);
      })
    };           
});