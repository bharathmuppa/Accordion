var bgAccordian = angular.module('bgApp', []);
bgAccordian.controller('myCtrl', function ($scope) {
    $scope.myName = 'bharath';
});
bgAccordian.directive('bgAccordion', ['$compile',
    function ($compile) {
        return {
            restrict: 'E',
            template:function(){
                console.log("in template");
            },
            compile: function(ele,attr) {
                angular.element(ele).addClass('panel-group');
                angular.element(ele).attr('ng-click', 'openTab($event)');
                console.log('into compiler');
                return function($scope, ele,attrs){
                console.log('in link');
                 $scope.openTab = function (e) {
                  alert('hoi');
                        if (attrs.type === 'collapse') {
                            angular.element(e.target).next('.panel-body').toggle();
                        } else if (attrs.type === 'accordian') {
                            if ($(e.target).parent().parent().parent().size() !== 0) {

                                $('.panel-group').find('.panel-body').filter(function (key, value) {
                                    if ($(e.target).text() !== $(value).parent().find('span').text()) {
                                        $(value).hide();
                                    }

                                });
                                angular.element(e.target).parent().parent().find('.panel-body').toggle();
                            } else {

                            }


                        }

                    }
            }

            },
            controller:function(){
                console.log('in controller');
            }
        };

}]);
bgAccordian.directive('bgAccordionGroup', function () {



    return {
        restrict: 'E',
        replace: true,
        template: '<div class="panel"><div class="panel-title"><h3><a><span></span></a></h3></div><div class="panel-body"></div></div>',
        link: function ($scope, ele, attrs) {

            $(ele).find('span').text($(ele).attr('heading'));
            $(ele).find('.panel-body').text($(ele).attr('content'));

            if (typeof (ele.parent().attr('open-heading')) != "undefined") {

                if ($(ele).find("span").text() == $(ele).parent().attr("open-heading")) {
                    $(ele).children().eq(1).show();
                } else {
                    $(ele).children().eq(1).hide();
                }

            }

        }
    };

});