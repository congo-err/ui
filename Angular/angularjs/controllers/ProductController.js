angular.module("congo")
.constant("sprUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/SingleProduct/")
.constant("carUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Cart/")
.controller("productCtrl", function ($scope, $http, $stateParams, $state, sprUrl, car)
{
    $scope.data.CurrentProduct = "";
    
    var newUrl = sprUrl+$stateParams.ProductID;

    $http.get(newUrl, {responseType:"json"})
        .success(function (data) {
            $scope.data.CurrentProduct = data;
        })
        .error(function (error) {
            $scope.data.CurrentProduct = error;
        });
    
    $scope.addToCart = function () {
        var cart = {
            CustomerID: getCookie("Name"),
            ProductID: $scope.CurrentProduct.ProductID,
            CartID: getCookie("Name")
        };

         $http.post(accUrl, JSON.stringify(cart)).then(function (res) {
                if(res.data.success)
                {
                    console.log();
                }
            }, function (err) {

            });
    }
});