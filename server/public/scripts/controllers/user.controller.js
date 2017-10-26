myApp.controller('UserController', function($location, UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.players = ['1', '2', '3', '4', '5', '6', '7', '8'];
    vm.items = ['Action', 'Adult', 'Adventure', 'Bluffing', 'Building', 'Card', 'Children', 'Collectible', 'Dice', 'Economic', 'Exploration', 'Fantasy', 'Farming', 'Fighting', 'Horror', 'Humor', 'Medieval', 'Novel-based', 'Party', 'Political', 'Religous', 'Science Fiction', 'Territory'];
    vm.selected = [];

    vm.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      } else {
        list.push(item);
      }
    };

    vm.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

    vm.getGame = function (search) {
      console.log('make title search:', search);
      UserService.getGame(search).then( function () {       
        vm.games = UserService.userObject.games;
        setRating(vm.games);
      });
    };

    vm.playerSearch = function (count) {
      console.log('make count search:', count);
      UserService.countSearch(count).then( function () {
        vm.games = UserService.userObject.games;
        setRating(vm.games);        
      })
    };

  

    vm.updateUserCollection = function (id) {
      console.log('userObject', UserService.userObject);
      for (var i = 0; i < vm.games.length; i++) {
        if (id === vm.games[i].id) {

          vm.games[i].users_id = UserService.userObject.id;
          gameInfo = vm.games[i];

          UserService.updateUserCollection(gameInfo).then( function () {
            vm.games = UserService.userObject.games;
            vm.getGame(vm.gameIn);
          })
        }
      }
    };

    vm.updateUserWants = function (id) {
      console.log('userObject', UserService.userObject);
      for (var i = 0; i < vm.games.length; i++) {
        if (id === vm.games[i].id) {
          vm.games[i].users_id = UserService.userObject.id;
          console.log(vm.games[i].users_id);
          gameInfo = vm.games[i];
          console.log('update user wants:', gameInfo);
          UserService.updateUserWants(gameInfo).then( function () {
            vm.games = UserService.userObject.games;
            vm.getGame(vm.gameIn);
          })
        }
      }
  };

    vm.searchGenre = function () {
       console.log('searchGenre');
       var typesObj = {
         list: vm.selected
       };
       console.log('in genre controller', typesObj);
       UserService.searchGenre(typesObj).then (function () {
         console.log('returned from service');
         vm.games = UserService.userObject.games;
         setRating(vm.games);
         
        //  vm.getGame(vm.gameIn);         
       })
    }

    setRating = function (avg) {
      for (var i = 0; i < avg.length; i++) {
        var game = avg[i];
        avg[i].avg_rating = parseInt(parseFloat(game.avg_rating) * 10);
      }
      return avg;
    }
});