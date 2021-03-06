myApp.controller('InfoController', function(UserService) {
    console.log('InfoController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;

    vm.userGames = function (id) {
      console.log('get users collection');
      UserService.userGames(id).then( function () {
        vm.games = UserService.userObject.games;
        setRating(vm.games);
      })
    };

    vm.updateUserCollection = function (id) {
      console.log('userObject', UserService.userObject);
      for (var i = 0; i < vm.games.length; i++) {
        if (id === vm.games[i].games_id) {
          vm.games[i].users_id = UserService.userObject.id;
          console.log(vm.games[i].users_id);
          gameInfo = vm.games[i];
          console.log('update user collection in search:', gameInfo);
          UserService.updateUserCollection(gameInfo).then( function () {
            vm.games = UserService.userObject.games;
          }).then( function() {
            vm.userGames(vm.userObject.id);
          })
        }
      }
    }

    setRating = function (avg) {
      for (var i = 0; i < avg.length; i++) {
        var game = avg[i];
        avg[i].avg_rating = parseInt(parseFloat(game.avg_rating) * 10);
      }
      return avg;
    }

    vm.userGames(vm.userObject.id);
  });