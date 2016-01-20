/**
 * Created by mpo on 20.01.2016.
 */

angular.module('scoreApp', [])

    .controller('mainController', function($scope) {
        $scope.sortType     = 'rank'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchUser   = '';     // set the default search/filter term

        // create the list of sushi rolls
        $scope.sushi = [
            { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
            { name: 'Philly', fish: 'Tuna', tastiness: 4 },
            { name: 'Tiger', fish: 'Eel', tastiness: 7 },
            { name: 'Rainbow', fish: 'Variety', tastiness: 6 }
        ];




        // create the list of sushi rolls
        $scope.scoreList = [
            { username: 'carsten', trees: 11, score: 120,rank:1 },
            { username: 'manuel', trees: 7, score: 105,rank:2 },
            { username: 'ben', trees: 5, score: 95,rank:3 },
            { username: 'bjoern', trees: 4, score: 83,rank:4 },
            { username: 'silke', trees: 3, score: 56,rank:5},
            { username: 'florian', trees: 0, score: 7,rank:6 }

        ];


    });