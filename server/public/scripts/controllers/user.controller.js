myApp.controller('UserController', function(UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;

    vm.getGame = UserService.getGame(vm.gameIn);
    vm.games = UserService.games.data;     
    console.log('vm.game:', vm.game);           
    
});