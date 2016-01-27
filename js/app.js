/**
 * Created by mpo on 20.01.2016.
 */

angular.module('scoreApp', [])

    .controller('mainController', function($scope) {
        $scope.sortType     = 'rank'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchUser   = '';     // set the default search/filter term



        // create the list of sushi rolls
        $scope.scoreList = [
            { username: 'carsten', trees: 11, score: 120,actualSeason:40,rank:1 },
            { username: 'manuel', trees: 7, score: 105,actualSeason:52,rank:2 },
            { username: 'ben', trees: 5, score: 95,actualSeason:32,rank:3 },
            { username: 'bjoern', trees: 4, score: 83,actualSeason:44,rank:4 },
            { username: 'silke', trees: 3, score: 56,actualSeason:20,rank:5},
            { username: 'florian', trees: 0, score: 7,actualSeason:7,rank:6 }

        ];


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