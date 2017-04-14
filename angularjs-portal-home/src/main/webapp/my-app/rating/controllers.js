'use strict';

define(['angular', 'jquery', 'require'], function(angular, $, require) {
    return angular.module('my-app.rating.controllers', [])

    .controller('RatingsModalController', [
        '$scope', 'marketplaceService', '$mdDialog',
        function($scope, marketplaceService, $mdDialog) {
            var init = function() {
              $scope.loading = true;
              marketplaceService.getUserRating($scope.portlet.fname)
                .then(function(data) {
                  var rating = data;
                  if (rating !== null) {
                      $scope.rating = rating;
                      $scope.rating.previouslyRated=true;
                      $scope.loading = false;
                  } else {
                      $scope.rating = {
                                       'rating': 0,
                                       'review': '',
                                       'previouslyRated': false,
                                      };
                      $scope.loading = false;
                  }
                  return data;
                }).catch(function() {
                  $scope.loading = false;
                  $scope.rating = {
                                   'rating': 0,
                                   'review': '',
                                   'previouslyRated': false,
                                  };
                });
            };

            init();

            $scope.ok = function() {
              marketplaceService.saveRating($scope.portlet.fname, $scope.rating)
                .then(function() {
                  $mdDialog.hide();
                  $scope.saved = true;
                  return;
                })
                .catch(function() {
                  $scope.error = 'Issue saving rating';
                });
            };

            $scope.cancel = function() {
              $mdDialog.cancel();
            };
        }]);
  });
