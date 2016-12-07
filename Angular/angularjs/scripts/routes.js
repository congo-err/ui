angular.module("congo", ["ngRoute"])
.config(function ($routeProvider) {
    $routeProvider.when("/test", {
        templateUrl: "views/test.html"
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
});