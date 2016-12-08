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
    .state('cart', {
        url: "/cart",
        templateUrl: "views/Cart.html",
    })
    .state('checkout',{
        url:"/checkout",
        templateUrl: "views/checkout.html",
    })
});