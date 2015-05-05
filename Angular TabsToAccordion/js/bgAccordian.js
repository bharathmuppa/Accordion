var bgAccordian = angular.module('bgApp', []);
bgAccordian.controller('myCtrl', function($scope) {
	$scope.myName = 'bharath';
});
bgAccordian.directive('bgAccordion', ['$compile',
function($compile) {
	return {
		restrict : 'E',
		compile : function(ele, attr) {

			if (attr.type.toUpperCase() === 'ACCORDION' || attr.type.toUpperCase() === 'COLLAPSE')
				angular.element(ele).addClass('bg-panel-group');
			else if (attr.type.toUpperCase() === 'MENU-ACCORDION') {

				angular.element(ele).addClass('bg-menu-group');
			}

		},
	};
}]);
bgAccordian.directive('bgAccordionGroup', function() {
	var link = function($scope, ele, attrs) {
		$(ele).find('span').html($(ele).attr('heading'));
		if ($(ele).attr('content'))
			$(ele).find('.bg-panel-body').html($(ele).attr('content'));
		if ( typeof (ele.parent().attr('open-heading')) != "undefined") {
			if ($(ele).find("span").text().toUpperCase() == $(ele).parent().attr("open-heading").toUpperCase()) {
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

		if ($(ele).parent().attr('type').toLowerCase() === 'menu-accordion') {
			$('head').append('<link rel="stylesheet" type="text/css" href="css/responsive.css" id="responsive"/>');
		}

		$scope.openTab = function(e) {

			if ($(ele).parent().attr('type').trim().toLowerCase() === 'collapse') {
				$(e.currentTarget).next().toggle();

			} else if ($(ele).parent().attr('type').toLowerCase() === 'accordion' || $(ele).parent().attr('type').toLowerCase() === 'menu-accordion') {
				$(e.currentTarget).parent().siblings().children().removeClass("bgActive")
				$(e.currentTarget).addClass("bgActive");
				if (window.matchMedia('(min-width: 768px)').matches) {
					//bg-panel-title  bgActive
					console.log("tabs");
					$(e.currentTarget).parent().siblings().find(".bg-panel-body").hide();
					$(e.currentTarget).next().show();
				} else {
					console.log("accordion");
					$(e.currentTarget).parent().siblings().find(".bg-panel-body").hide();
					$(e.currentTarget).next().toggle();
				}
			}

		}
	};
	return {
		restrict : 'E',
		replace : true,
		template : function() {
			return '<div class="bg-panel"><div class="bg-panel-title" ng-click="openTab($event)"><h3><a><span></span></a></h3></div><div class="bg-panel-body">' + $("bg-accordion-group").html() + '</div></div>';
		},
		compile : function(ele, attr) {
			console.log('bg-accordian compiler');
			return link;
		}
	};
});
