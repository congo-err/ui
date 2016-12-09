angular.module("congo")
.constant("catUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Category")
.constant("proUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Product")
.constant("useUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/UserRole")
.constant("feaUrl", "http://ec2-34-193-194-23.compute-1.amazonaws.com/Congo-Logic-Api/Api/Featured")
.controller("congoCtrl", function ($scope, $http, $state, catUrl, proUrl, useUrl, feaUrl)
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

    $scope.Selected = {
        Category: getCookie("SelectedCategory"),
        Search: getCookie("Search"),
    }

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
        var newUrl = useUrl+"/"+id;

        $http.get(newUrl, {responseType:"json"})
            .success(function (data) {
                if(checkRoles() == 4)
                {
                    reverseRoles();
                }
                $scope.data.CurrentUser = data;
            })
            .error(function (error) {
                $scope.data.CurrentUser = error;
            });
    }

    $http.get(feaUrl+"/4", {responseType:"json"})
        .success(function (data) {
            $scope.data.Featured = data;
        })
        .error(function (error) {
            $scope.data.Featured = error;
        });
    
    $scope.search = function () {
        if ($scope.Selected.Category.CategoryID == undefined)
        {
            $http.get(proUrl, {responseType:"json"})
                .success(function (data) {
                    if($scope.Selected.Search == "")
                    {
                        $scope.data.Product = data;
                    }
                    else
                    {
                        $scope.data.Product = [];
                        for(var i = 0; i < data.length; i++)
                        {
                            if(data[i].Name.lastIndexOf($scope.Selected.Search) > -1)
                            {
                                $scope.data.Product.push(data[i]);
                            }
                        }
                    }
                })
                .error(function (error) {
                    $scope.data.Product = error;
                });
        }
        else
        {
            console.log(proUrl+"/"+$scope.Selected.Category.CategoryID);
            $http.get(proUrl+"/"+$scope.Selected.Category.CategoryID, {responseType:"json"})
                .success(function (data) {
                    if($scope.Selected.Search == "")
                    {
                        $scope.data.Product = data;
                    }
                    else
                    {
                        $scope.data.Product = [];
                        for(var i = 0; i < data.length; i++)
                        {
                            if(data[i].Name.lastIndexOf($scope.Selected.Search) > -1)
                            {
                                $scope.data.Product.push(data[i]);
                            }
                        }
                    }
                })
                .error(function (error) {
                    $scope.data.Product = error;
                });
        }
        setCookie("SelectedCategory", $scope.Selected.Category.CategoryID);
        setCookie("Search", $scope.Selected.Search);
        $state.go("products");
    }

    $scope.logOut = function () {
        setCookie("AccountID", "");
        reverseRoles();
        $scope.data.CurrentUser = null;
        $state.go("home");
    }
});

function checkRoles() {
    var hidden = document.getElementsByClassName("navbar-control hidden");
    return hidden.length;
}

function reverseRoles() {
    var hiddenCol = document.getElementsByClassName("navbar-control hidden");
    var allCol = document.getElementsByClassName("navbar-control");
    var all = [];
    var hidden = [];
    var visible = [];

    for(var i = 0; i < allCol.length; i++)
    {
        all.push(allCol[i]);
    }

    for(var i = 0; i < hiddenCol.length; i++)
    {
        hidden.push(hiddenCol[i]);
    }

    for (var i = 0; i < all.length; i++)
    {
        var isHidden = false;

        for(var j = 0; j < hidden.length; j++)
        {
            if(all[i] == hidden[j])
            {
                isHidden = true;
            }
        }

        if (!isHidden)
        {
            visible.push(all[i]);
        }
    }

    for (var i = 0; i < visible.length; i++)
    {
        visible[i].className = "navbar-control hidden";
    }

    for (var i = 0; i < hidden.length; i++)
    {
        hidden[i].className = "navbar-control";
    }
}