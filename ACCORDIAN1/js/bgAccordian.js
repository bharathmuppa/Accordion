var bgAccordian = angular.module('bgApp', []);
bgAccordian.controller('myCtrl', function($scope) {
});
bgAccordian.directive('bgAccordian', function() {
	return {
		restrict : 'E',
		link : function($scope, ele, attrs) {
			if ( typeof (ele.attr('bgPreopenHeader')) != "undefined") {

				$('.accordion__container').children().filter(function(key, value) {
					if ($(value).attr("tab-title") == ele.attr("bgPreopenHeader")) {
						$(value).children().eq(1).show();
					} else {
						$(value).children().eq(1).hide();
					}
				});
			}

			$scope.openTab = function(e) {
				if (attrs.type === 'bgCollapse') {
					angular.element(e.target).next('.accordion__tab-content').toggle();
				} else if (attrs.type === 'bgAccordian') {
					if ($(e.target).next().size() !== 0) {
						$('.accordion__container').find('.accordion__tab-content').filter(function(key, value) {
							if ($(e.target).parent().attr("tab-title") !== $(value).parent().attr("tab-title")) {
								$(value).hide();
							}

						});
						angular.element(e.target).next('.accordion__tab-content').toggle();
					} else {

					}

				}
			};
		}
	};

});
