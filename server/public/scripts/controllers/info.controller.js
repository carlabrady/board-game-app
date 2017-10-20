myApp.controller('InfoController', function(UserService) {
    console.log('InfoController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;

    vm.userGames = function (id) {
      console.log('get users collection');
      UserService.userGames(id).then( function () {
        vm.games = UserService.userObject.games;
      })
    };

    vm.userGames(vm.userObject.id);
  });