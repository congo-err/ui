(function(ng) {
    ng.module("congo")
    .controller("ordersCtrl", ["$scope", "$http", "$state", "baseUrl", function($scope, $http, $state, baseUrl) {
        var accountId = getCookie("AccountID");

        $scope.data = {
            "orders": []
        };

        $http.get(baseUrl + "order/" + accountId)
        .then(function(response) {
            console.log(response.data);
            $scope.data.orders = response.data;
        }, function(response) {
            console.log(response.data);
        });
    }]);
})(angular);