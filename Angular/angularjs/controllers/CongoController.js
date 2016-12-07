angular.module("congo")
.constant("catUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Category")
.constant("proUrl", "http://localhost:5556/products")
.controller("congoCtrl", function ($scope, $http, catUrl, proUrl)
{
    $scope.data = {};
    $scope.data2 = {};
    $scope.data3 = {};

    var date = new Date();
    $scope.year = date.getFullYear();

    $http.get(catUrl, {responseType:"json"})
        .success(function (data) {
            $scope.data.category = data;
        })
        .error(function (error) {
            $scope.data.category = error;
        });

    $http.get(proUrl)
        .success(function (data) {
            $scope.data2.products = data;

            var slot1 = 0;
            var slot2 = 0;
            var slot3 = 0;
            var slot4 = 0;
            var i = 0;
            var runLoop = true;
            
            while(runLoop)
            {
                var newRandom = Math.floor(Math.random() * 4) + 1;

                if (i == 0)
                {
                    slot1 = newRandom;
                    i++;
                }
                else if (i == 1 && newRandom != slot1)
                {
                    slot2 = newRandom;
                    i++;
                }
                else if (i == 2 && newRandom != slot1 && newRandom != slot2)
                {
                    slot3 = newRandom;
                    i++;
                }
                else if (i == 3 && newRandom != slot1 && newRandom != slot2 && newRandom != slot3)
                {
                    slot4 = newRandom;
                    i++;
                }
                else if (i == 4)
                {
                    $scope.data3.products = [$scope.data2.products[slot1], $scope.data2.products[slot2], $scope.data2.products[slot3], $scope.data2.products[slot4]];
                    runLoop = false;
                }
            }
            
        })
        .error(function (error) {
            $scope.data2.products = error;
        });
    
    $scope.search = function () {
        window.location.href = '#/products';
    }
});