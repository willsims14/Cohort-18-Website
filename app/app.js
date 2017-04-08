"use strict";


//Using angular-ui-route and angular-ui-bootstrap
var app = angular.module("ClassWebsite", ['ui.router', 'ui.bootstrap'])

.service('StudentProfiles', function() {
	this.studentArray = [];
})

.config(function($stateProvider, $urlRouterProvider) {
				
				// HOME STATES AND NESTED VIEWS ========================================

				$stateProvider
					//Home handles everything
					.state('home', {			
						url: '/cohort-18',	
						views: {
							"": {
								templateUrl: 'partials/Home.html',
								controller: 'HomeCtrl'
							},						
							//studentProfiles handles all of the individual profiles displayed on the page
              "studentProfiles@home": { 
              	templateUrl: 'partials/StudentProfiles.html',
              	controller: "StudentProfilesCtrl"              	
              }                    
            }						
					})      		   		       
	        
	        //This handles whether or not a user is on a correct path I have pre-defined. If not,
	        //they are sent back to the most previos page they visited        
	        .state('notARoute', {
	        	url: '*path',
	        	template: function($location, $scope) {
	        		alert("I'm sorry, but the route you have chosen is not available. We're sending you back to your most rpevious page to try again!");		      
	        		$window.history.back();
	        	}
	        });
	
})

.run(($http, StudentProfiles) => {

	$http.get('../StudentProfiles.json').then(
			(studentProfiles) => StudentProfiles.studentArray = studentProfiles.data
		);

});



