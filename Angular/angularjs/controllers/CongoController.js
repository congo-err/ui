angular.module("congo")
.constant("catUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Category")
.constant("proUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Product")
.constant("accUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/UserRole")
.controller("congoCtrl", function ($scope, $http, catUrl, proUrl, accUrl)
{
    var date = new Date();
    var id = 0;

    $scope.data = {};
    $scope.data.Year = date.getFullYear();
    $scope.data.States = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
                          "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
                          "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
                          "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
                          "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

    $http.get(catUrl, {responseType:"json"})
        .success(function (data) {
            $scope.data.Category = data;
        })
        .error(function (error) {
            $scope.data.Category = error;
        });

    if (getCookie("AccountID") != "")
    {
        id = Number(getCookie("AccountID"));
        var newUrl = accUrl+"/"+id;
        console.log(newUrl);

        $http.get(newUrl, {responseType:"json"})
            .success(function (data) {
                $scope.data.CurrentUser = data;
            })
            .error(function (error) {
                $scope.data.CurrentUser = error;
            });
    }
    

    $http.get(proUrl, {responseType:"json"})
        .success(function (data) {
            $scope.data.Product = data;

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
                    $scope.data.Featured = [$scope.data.Product[slot1], $scope.data.Product[slot2], $scope.data.Product[slot3], $scope.data.Product[slot4]];
                    runLoop = false;
                }
            }
            
        })
        .error(function (error) {
            $scope.data.Product = error;
        });
    
    $scope.search = function () {
        window.location.href = '#/products';
    }
});