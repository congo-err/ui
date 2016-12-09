angular.module("congo")
.constant("proUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/SingleProduct/")
.controller("productCtrl", function ($scope, $http, $state, proUrl)
{
    $scope.data.CurrentProduct = "";
    
    if(window.location.href.lastIndexOf("/products/") > -1)
    {
        var keepGoing = true;
        var tempUrl = "http://" + window.location.host + window.location.pathname + "#/products/";
        var itemId = Number(window.location.href.replace(tempUrl,""));

        var newUrl = proUrl+itemId;
        console.log(newUrl)
        $http.get(newUrl, {responseType:"json"})
            .success(function (data) {
                console.log(data);
                $scope.data.CurrentProduct = data;
            })
            .error(function (error) {
                $scope.data.CurrentProduct = error;
            });
    }
});