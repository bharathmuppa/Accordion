var bgAccordian = angular.module('bgApp', []);
bgAccordian.controller('myCtrl', function($scope) {
	$scope.myName = 'bharath';
});
bgAccordian.directive('bgAccordion', ['$compile',
function($compile) {
	return {
		restrict : 'E',
		compile : function(ele, attr) {
			angular.element(ele).addClass('bg-panel-group');
			//angular.element(ele).attr('ng-click', 'openTab($event)');
			console.log('into compiler');
			return function($scope, ele, attrs) {
				console.log('in link');
			}
		},
		controller : function() {
			console.log('in controller');
		}
	};
}]);
bgAccordian.directive('bgAccordionGroup', function() {
	var link = function($scope, ele, attrs) {
		$(ele).find('span').html($(ele).attr('heading'));
		if ($(ele).attr('content'))
			$(ele).find('.bg-panel-body').html($(ele).attr('content'));
		if ( typeof (ele.parent().attr('open-heading')) != "undefined") {
			if ($(ele).find("span").text() == $(ele).parent().attr("open-heading")) {
				$(ele).children().eq(1).show();
			} else {
				$(ele).children().eq(1).hide();
			}
		} else {
			if (($(ele).index() + 1) == $(ele).parent().attr("open-bg-panel")) {
				$(ele).children().eq(1).show();
			} else {
				$(ele).children().eq(1).hide();
			}
		}
		$scope.openTab = function(e) {
			$(e.currentTarget).parent().siblings().find(".bg-panel-body").hide();
			$(e.currentTarget).next().toggle();
		}
	};
	return {
		restrict : 'E',
		replace : true,
		template : function() {
			return '<div class="bg-panel"><div class="bg-panel-title" ng-click="openTab($event)"><h3><a><span></span></a></h3></div><div class="bg-panel-body">' + $("bg-accordion-group").html() + '</div></div>';
		},
		compile : function(ele, attr) {
			return link;
		}
	};
});
