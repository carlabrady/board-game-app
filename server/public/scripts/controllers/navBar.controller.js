myApp.controller('NavBarController', function ($location) {
    // console.log('navbar controller loaded');

    var vm = this;
    vm.currentNavItem = $location.path();

});