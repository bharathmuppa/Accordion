var apiTest = angular.module("APItest", []);
		apiTest.controller("viewController", ['$scope', '$compile', 'cloudFactory',
		function($scope, $compile, cloudFactory) {
			$scope.section = "dashBoard.html";
			$scope.citiesList = ['Los Angeles', 'Hyderabad', 'Delhi'];
			$scope.selectedCity = $scope.citiesList[0];
			$scope.hideParam = true;
			$scope.number = "";
			$scope.message = "";
			$scope.getFullDetails = function(param) {
				console.log(param);
				$scope.corespondedDetail = param;
				$scope.messageToFriend = "day:" + param['day_of_week'] + ",climatic condition:" + param['condition'];
				Object.keys($scope.corespondedDetail).filter(function(key, value) {

					if (key != "$$hashKey") {
						$("#resultData").append('<p >' + key + ':' + $scope.corespondedDetail[key] + '</p>');

					}
				});
				$scope.hideParam = false;

			};
			$scope.cancelDetails = function() {
				$("#resultData").html("");
				$scope.messageToFriend = "";
				$scope.hideParam = true;
			};
			$scope.getClimateDetails = function(param) {
				cloudFactory.getClimateDetails(param).then(function(data) {
					console.log(data);
					$scope.climateDayWise = data;
					$compile($("#climateContainer").html())($scope);
				}, function(error) {

				});
			};

			$scope.getClimateDetails($scope.selectedCity);
			$scope.sendMsg = function(msg, number) {
				console.log($scope.messageToFriend, number);
				cloudFactory.sendMessage($scope.messageToFriend, number).success(function(data) {
					console.log(data);
					alert("message sent to your buddy");
					$scope.cancelDetails();
				}).error(function(error) {
					alert("check the mobile number or internet connection");
				});
			};
		}]);
		apiTest.factory("cloudFactory", ['$http',
		function($http) {
			var dataCloud = {};
			dataCloud.getClimateDetails = function(param) {

				return $.ajax({
					url : 'https://george-vustrey-weather.p.mashape.com/api.php',
					type : 'GET',
					data : {
						"location" : param
					},
					datatype : 'application/json',

					beforeSend : function(xhr) {
						xhr.setRequestHeader("X-Mashape-Authorization", "evxAb7WQKpmshRH00bYsctdlqueVp1n9X91jsnphcOJhQu6T02");
					}
				});
			};
			dataCloud.sendMessage = function(msg, number) {
				return $.ajax({
					url : 'https://site2sms.p.mashape.com/index.php',
					type : 'GET',
					data : {
						"msg" : msg,
						"phone" : number,
						"pwd" : "naPRAYANAM8",
						"uid" : "8885882599"
					},

					datatype : 'application/json',
					beforeSend : function(xhr) {
						xhr.setRequestHeader("X-Mashape-Authorization", "evxAb7WQKpmshRH00bYsctdlqueVp1n9X91jsnphcOJhQu6T02");
					}
				});
			};
			return dataCloud;
		}]);
