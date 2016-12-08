angular.module("congo")
.constant("accUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Login")
.controller("loginCtrl", function ($scope, $http, $state, accUrl)
{
    $scope.login = {
        UserName: "Qes93lsL9",
        Password: "XLU03NWN7IT"
    }

    $scope.UserLogin = function () {
        $http.post(accUrl, JSON.stringify($scope.login)).then(function (res) {
                    if(res.data.success)
                    {
                        console.log(res);
                        setCookie("AccountID", res.data.account.AccountID);
                        console.log(res.data.account);
                        //$state.go("home");
                    }
                }, function (err) {

                });
        /*$scope.login, function (data) {
                $scope.data.CurrentUser = data;
            }, function (error) {
                $scope.data.CurrentUser = error;
            });*/
    }
});

