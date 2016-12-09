angular.module("congo")
.constant("accUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Login")
.constant("useUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/UserRole")
.controller("loginCtrl", function ($scope, $http, $state, accUrl, useUrl)
{
    var id = 0;

    $scope.login = {
        UserName: "Qes93lsL9",
        Password: "XLU03NWN7IT"
    }

    $scope.UserLogin = function () {
        $http.post(accUrl, JSON.stringify($scope.login)).then(function (res) {
                if(res.data.success)
                {
                    setCookie("AccountID", res.data.account.AccountID);
                    window.location.href = "";
                }
                else{
                    $scope.data.error = res.data.message;
                    document.getElementsByClassName("userLoginFail")[0].style.visibility = "visible";
                }
            }, function (err) {

            });
    }
});

