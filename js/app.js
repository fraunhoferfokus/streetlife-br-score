/**
 * Created by mpo on 20.01.2016.
 */


angular.module('scoreApp', ['ngRoute'])

    .controller('mainController', function($scope,$route, $routeParams, $location, $http) {

        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

        $scope.sortType     = 'rank'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchUser   = '';     // set the default search/filter term



        $scope.emailInput = "";
        $scope.message = "";
        $scope.name = "";

        $scope.showMessageSend = false;
        $scope.showContactForm = true;


        var  sendContactToBackend = function(email,name,subject,message)
        {

            var data = {};
            data.sendername = name;
            data.messagesubject = subject;
            data.messagebody = "Email: "+email +" " + message;


            var dataString = "sendername="+encodeURIComponent(data.sendername)+"&messagesubject="+encodeURIComponent(data.messagesubject)+"&messagebody="+encodeURIComponent(data.messagebody);
            console.log(dataString);
            // Simple GET request example:
            $http({
                method: 'POST',
                url: '../fb/sendfeedbackemail',
                data: dataString,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
            });
        }


        $scope.sendContact = function()
        {
            console.log($scope.name);
            console.log($scope.emailInput);
            console.log($scope.message);

            var email = $scope.emailInput;
            var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

            if($scope.name != "" && filter.test(email) == true != "" && $scope.message != "") {
                $scope.showMessageSend = true;
                $scope.showContactForm = false;

                sendContactToBackend($scope.emailInput,$scope.name,"Streetlife Score Contact " +$scope.name,$scope.message);
            }

            //highlight missing part
            if($scope.name == "")
            {
                $('#nameId').css("border-color","red");
            }
            else
            {

                $('#nameId').css("border-color","#dce4ec");
            }
            if($scope.message == "")
            {
                $('#messageId').css("border-color","red");
            }
            else{
                $('#messageId').css("border-color","#dce4ec");
            }


            if (filter.test(email) == false)
            {
                $('#emailId').css("border-color","red");

            }
            else
            {
                $('#emailId').css("border-color","#dce4ec");
            }



        }

     //   var scoreWebserviceUrl = "../scores/getall";
        var scoreWebserviceUrl = "http://193.175.133.251/scores/getall";

        $http.get(scoreWebserviceUrl)
            .then(function(response) {

                $scope.scoreList =response.data;

               $scope.scoreList=  $scope.scoreList.sort(function(a, b) {
                    return parseInt(b.totalScore) - parseInt(a.totalScore);
                });

                for(var i = 0;i<$scope.scoreList.length;i++)
                {
                    //give the user's their rank
                    $scope.scoreList[i].rank = (i+1);
                }



        });



    })
    .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/impressum', {
                templateUrl: 'partials/impressum.html',
                controller: 'mainController'
            }).
            when('/score', {
                templateUrl: 'partials/score.html',
                controller: 'mainController'
            }).
            when('/about', {
                templateUrl: 'partials/score.html#about',
                controller: 'mainController'
            }).
            when('/bestenliste', {
                templateUrl: 'partials/score.html#bestenliste',
                controller: 'mainController'
            }).
            when('/privacypolicy', {
                templateUrl: 'partials/privacypolicy.html',
                controller: 'mainController'
            }).
            when('/contact', {
                templateUrl: 'partials/contact.html',
                controller: 'mainController'
            }).
            when('/termsofservice', {
                templateUrl: 'partials/termsofservice.html',
                controller: 'mainController'
            }).
            otherwise({
                redirectTo: '/score'
            });


    }]);



function UnCryptMailto( s )
{
    var n = 0;
    var r = "";
    for( var i = 0; i < s.length; i++)
    {
        n = s.charCodeAt( i );
        if( n >= 8364 )
        {
            n = 128;
        }
        r += String.fromCharCode( n - 1 );
    }
    return r;
}

function linkTo_UnCryptMailto( s )
{
    location.href=UnCryptMailto( s );
}