(function(ng) {
    "use strict";

    Stripe.setPublishableKey("pk_test_YvUw38QL5Yvr6xfkSeRimZEx");

    ng.module("congo")
    .constant("baseUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/")
    .controller("stripeCtrl", ["$scope", "$http", "$state", "baseUrl", function($scope, $http, $state, baseUrl) {
      var accountId = getCookie("AccountID");

      $scope.data = {
        "stripe": {
          "number": "4242424242424242",
          "exp_month": "03",
          "exp_year": "18",
          "cvc": "123",
          "address_zip": "12345"
        }
      };

      var form = document.getElementById("checkout-form");
      var submitButton = form.getElementsByClassName("submit")[0];

      var errorMessage = document.getElementById("payment-errors");

      function submitOrder(status, response) {
        if (response.error) {
          ng.element(errorMessage).html(response.error.message);
          ng.element(submitButton).prop("disabled", false);
          ng.element(submitButton).removeClass("disabled");
        }
        else {
          var token = response.id;
          $http.post(baseUrl + "order", {
            "CustomerID": accountId,
            "AccountID": accountId,
            "Token": token
          }).then(function(response) {
            console.log(response.data);
            ng.element(errorMessage).html("Your order has been submitted!");
            $state.go("home");
          }, function(response) {
            console.log(response.data);
            ng.element(errorMessage).html(response.data.message);
          });
        }
      }

      $scope.checkOut = function() {
        ng.element(submitButton).prop("disabled", true);
        ng.element(submitButton).addClass("disabled");
        Stripe.card.createToken($scope.data.stripe, submitOrder);
      };
    }]);
})(angular);