angular.module("congo")
.constant("getcartURL", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/GetCart/")
.constant("cartURL", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Cart/")
.controller("cartCtrl", function($scope,$http,getcartURL,cartURL)
{
    $scope.data = {};
    var customerID = getCookie("AccountID");
    $http.get(getcartURL + customerID,{resonpseType:"json"})
    .success(function(data){
        $scope.data.Cart = data;
        $scope.data.Cart.subtotal = 0;
        angular.forEach(data.Products, function(product){
            $scope.data.Cart.subtotal += product.Price;
        })
    })
    .error(function(error){
        $scope.data.Cart = error;
    });

    $scope.removeFromCart = function(product){
        $http.delete(cartURL+customerID+ '/'+ product.id)
        .then(function(data){
            $scope.data.Cart.Products.splice(product.index, 1);
            $scope.data.Cart.subtotal = 0;
            angular.forEach(data.Products, function(product){
                $scope.data.Cart.subtotal += product.Price;
            })
        },
        function(error){
            $scope.data.Cart = error;
        });
    }
});