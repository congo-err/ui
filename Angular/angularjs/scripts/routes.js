/*
angular.module("congo", ["ngRoute"])
.config(function ($routeProvider) {
    $routeProvider.when("/test", {
        templateUrl: "views/test.html"
    });
    
    $routeProvider.when("/login", {
        templateUrl: "views/login.html"
    });
    
    $routeProvider.when("/createaccount", {
        templateUrl: "views/createAccount.html"
    });
    
    $routeProvider.when("/products/product", {
        templateUrl: "views/product.html"
    });

    $routeProvider.when("/products", {
        templateUrl: "views/productList.html"
    });

    $routeProvider.otherwise({
        templateUrl: "views/home.html"
    });
});*/

angular.module('congo', ['ui.router'])
.config(function ($stateProvider) {
    $stateProvider
    .state('home', {
        url: "",
        templateUrl: "views/home.html",
    })
    .state('products', {
        url: "/products",
        templateUrl: "views/productList.html",
    })
    .state('product', {
        url: "/products/product",
        templateUrl: "views/product.html",
    })
    .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
    })
    .state('createAccount', {
        url: "/createaccount",
        templateUrl: "views/createAccount.html",
    })
});