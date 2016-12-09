(function(ng) {
    ng.module("congo")
    .controller("orderCtrl", ["$scope", "$http", "$state", "$stateParams", "baseUrl", function($scope, $http, $state, $stateParams, baseUrl) {
        var accountId = getCookie("AccountID");

        $scope.data = {
            "onOrderPage": true
        };

        $scope.data.message = $stateParams.message

        $http.get(baseUrl + "order/" + accountId, {resonpseType: "json"})
        .success(function(data) {
            console.log(data);

            var currentOrder;

            angular.forEach(data, function(order) {
                if (order.OrderID == $stateParams.OrderID && order.Customer.CustomerID == accountId) {
                    currentOrder = order;
                }
            });

            console.log(currentOrder);

            if (currentOrder !== undefined) {
                $scope.data.Cart = currentOrder;
                $scope.data.Cart.subtotal = 0;
                angular.forEach(currentOrder.Products, function(product){
                    $scope.data.Cart.subtotal += product.Price;
                })
            }
            else {
                $scope.data.message = { "class": "alert alert-danger", "text": "You did not make this order." };
            }
        })
        .error(function(error){
            $scope.data.Cart = error;
        });
    }]);
})(angular);