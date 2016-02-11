/**
 * Created by mpo on 20.01.2016.
 */

angular.module('scoreApp', [])

    .controller('mainController', function($scope,$http) {
        $scope.sortType     = 'rank'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchUser   = '';     // set the default search/filter term


        var scoreWebserviceUrl = "http://193.175.133.251/scores/getall";

        $http.get(scoreWebserviceUrl)
            .then(function(response) {
               console.log(response.data);
                $scope.scoreList =response.data;

                $scope.scoreList.sort(function(a, b) {
                    return parseFloat(a.totalScore) - parseFloat(b.totalScore);
                });

                $scope.scoreList[12].currentSeasonScore = 565;
                $scope.scoreList[13].currentSeasonScore = 67;


        });




    });


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