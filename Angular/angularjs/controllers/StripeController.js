(function(ng) {
    "use strict";

    Stripe.setPublishableKey("pk_test_YvUw38QL5Yvr6xfkSeRimZEx");

    ng.module("congo")
    .constant("baseUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/")
    .controller("stripeCtrl", ["$scope", "$http", "baseUrl", function($scope, $http, baseUrl) {
      var accountId = getCookie("AccountID");

      $scope.data = {
        "stripe": {}
      };

      function submitOrder(status, response) {
        if (response.error) {
          $("form .payment-errors").html(response.error.message);
          $("form .submit").prop("disabled", false);
        }
        else {
          var token = response.id;
          $http.post(baseUrl + "order", {
            "AccountID": accountId,
            "Token": token
          });
        }
      }

      $scope.checkOut = function() {
        $("form .submit").prop("disabled", true);
        Stripe.card.createToken($scope.data.stripe, submitOrder);
      };
    }]);
})(angular);