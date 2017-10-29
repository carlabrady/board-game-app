myApp.controller('WishlistController', function(UserService) {
    console.log('WishlistController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;

    vm.wishList = function (id) {
      console.log('get users collection');
      UserService.wishList(id).then( function () {
        vm.games = UserService.userObject.games;
        setRating(vm.games);
      })
    };

    vm.updateUserWants = function (id) {
        console.log('userObject', UserService.userObject);
        for (var i = 0; i < vm.games.length; i++) {
          if (id === vm.games[i].games_id) {
            vm.games[i].users_id = UserService.userObject.id;
            console.log(vm.games[i].users_id);
            gameInfo = vm.games[i];
            console.log('update user wants:', gameInfo);
            UserService.updateUserWants(gameInfo).then( function () {
              vm.games = UserService.userObject.games;
            }).then( function() {
              vm.wishList(vm.userObject.id);
            })
          }
        }
    };

    setRating = function (avg) {
        for (var i = 0; i < avg.length; i++) {
          var game = avg[i];
          avg[i].avg_rating = parseInt(parseFloat(game.avg_rating) * 10);
        }
        return avg;
      };

    vm.wishList(vm.userObject.id);
  });