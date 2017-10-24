myApp.controller('UserController', function($location, UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.players = ['1', '2', '3', '4', '5', '6', '7', '8'];
    vm.items = ['Adventure', 'Fantasy', 'Fighting', 'Humor', 'Economic', 'Horror', 'Family', 'Dexterity', 'Party', 'Adult', 'Co-operative', 'Board', 'Card', 'Dice'];
    vm.selected = [];

    vm.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
      console.log('Selected:', vm.selected);
    };

    vm.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

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

    vm.updateUserCollection = function (id) {
      console.log('userObject', UserService.userObject);
      for (var i = 0; i < vm.games.length; i++) {
        if (id === vm.games[i].id) {
          vm.games[i].users_id = UserService.userObject.id;
          console.log(vm.games[i].users_id);
          gameInfo = vm.games[i];
          console.log('update user collection in search:', gameInfo);
          UserService.updateUserCollection(gameInfo).then( function () {
            vm.games = UserService.userObject.games;
          }).then( function() {
            vm.getGame(vm.gameIn);
          })
        }
      }
    }
});