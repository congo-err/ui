angular.module("congo")
.constant("sprUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/SingleProduct/")
.constant("carUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Cart/")
.controller("productCtrl", function ($scope, $http, $stateParams, $state, sprUrl, carUrl)
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
        if(getCookie("AccountID") != "" && $stateParams.ProductID != null)
        {
            var cart = {
                CustomerID: getCookie("AccountID"),
                ProductID: $stateParams.ProductID,
                CartID: getCookie("AccountID")
            };

            console.log(cart);

            $http.post(carUrl, JSON.stringify(cart)).then(function (res) {
                    if(res.data.success)
                    {
                        $state.go("cart");
                    }
                }, function (err) {

                });
        }
    }
});