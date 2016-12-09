angular.module("congo")
.constant("getcartURL", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/GetCart/")
.constant("cartURL", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Cart/")
.controller("cartCtrl", function($scope,$http,getcartURL,cartURL)
{
    $scope.data = {};
    var customerID = getCookie("AccountID");
    $http.get(getcartURL + customerID,{resonpseType:"json"})
    .success(function(data){
        $scope.data.Cart = data;
    })
    .error(function(error){
        $scope.data.Cart = error;
    });

    
});