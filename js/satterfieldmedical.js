/**
 * Created by james_r_bray on 10/25/15.
 */
console.debug("Entering application...");


var app = angular.module('satterfieldWeb', []);
//Change the baseUrl value based on the environment
var baseUrl = 'http://www.strawberry23.net:8080/satterfieldmedical';
//var baseUrl = 'http://www.docsatisfaction.com:8080/satterfieldmedical';
//var baseUrl = 'http://localhost:8080/satterfieldmedical';

console.debug("app initialized...");

app.service('surveyService', function($http, $q, $log) {
    console.debug("Entering surveyService...");

    //var deferred = $q.defer();
    var data = new Array();

    this.initializeSurvey = function() {
        return {
            site_code: "",
            rating: "",
            whyfeeling: "",
            createdate: "",
            comment: ""
        };
    };

    this.initializeSurveys = function() {
        return [{
            site_code: "",
            createdate: "",
            whyfeeling: "",
            rating: "",
            comment: ""
        }];
    };

    this.survey = this.initializeSurvey();


    /**
     *
     * @returns {promise.promise|jQuery.promise|d.promise|promise|jQuery.ready.promise|qFactory.Deferred.promise|*}
     */
    this.getAllSurveys = function() {
        console.debug("Entering surveyService.getAllSurveys...");
        var deferred = $q.defer();
        var serviceUrl = baseUrl + '/getallsurveys';
        console.debug('The URL is ' + serviceUrl);
        $http({
            method: 'GET',
            url: serviceUrl,
            headers: {'Content-Type': 'application/json'}
        }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service call failed while performing getAllSurveys function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
        console.debug("Exiting surveyService.getAllSurveys...");
        return deferred.promise;
    };


    /**
     *
     */
    this.exportToExcel = function() {
        console.debug("Entering surveyService.exportToExcel...");
        var deferred = $q.defer();
        var serviceUrl = baseUrl + '/exporttoexcel';
        console.debug('The URL is ' + serviceUrl);
        $http({
            method: 'GET',
            url: serviceUrl,
            headers: {'Content-Type': 'application/json'}
        }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service export data to Excel when calling exportToExcel function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
        console.debug("Exiting surveyService.exportToExcel...");
    };
});

app.controller('surveyController', function($log, $scope, surveyService) {
    console.debug("entering surveyController...");
    var survey = this;
    //$scope.institutions = [{organizationKey:'MCNI001',organizationName:'Mercy North Iowa',demo:'DEMO'}];
    $scope.surveyData = surveyService.initializeSurveys();
    $scope.addInstitutionFormData = {};
    $scope.test = "Satterfield Test";


    /**
     *
     */
    $scope.getAllSurveys = function() {
        console.debug("surveyController.getAllSurveys...");
        var surveyPromise = surveyService.getAllSurveys();
        surveyPromise.then(function(promise) {
            $scope.surveyData = promise.data;
        });
        console.debug("At end of surveyController.getAllSurveys...");
        console.debug($scope.surveyData);
        console.debug("test");
    };


    $scope.exportToExcel = function() {
        console.debug("Try to export the survey data to an Excel spreadsheet...");
        surveyService.exportToExcel();
        console.debug("Export complete!");
    };

});