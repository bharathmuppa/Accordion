//angular module has been created so that it will be includede in any angular modules for its features
var angVal = angular.module("advanceInputFeatures", []);
    
    /*factory for saving image encoded code on server side */
    angVal.factory("postImage", function ($http) {
        var factObj = {};
        factObj.call = function (imgBase64Data, url, success, error) {

            var angularPromise = $http.post(imgBase64Data, url);
            angularPromise.then(function (data) {
                success(data);
            }, function (reason) {
                error(reason);
            });
        };
        return factObj;
    });

    /* Directive for uploading a file.*/
    angVal.directive("uploadFile", function (postImage) {
        uploadImage = function () {
            var file = event.currentTarget.files[0];
            mimeType = file.type;
            
            if (mimeType.substr(0, 5) == 'image') {
                var contentAsBase64EncodedString;
                var FR = new FileReader();
                //this is callback for readAsDataURL(file)
                FR.onload = function (encodedFile) {
                    // This is the base64 encoded string of that media file which you will be interested to store in the database(post to the server
                    scope.src = encodedFile.target.result;
                };

                FR.onloadend = function (encodedFile) {
                    if (attrs.url != undefined || attrs.success != undefined || attrs.fail != undefined)
                        postImage.call(encodedFile.target.result, attrs.url, attrs.success, attrs.fail);
                    else if (attrs.picid != undefined || attrs.picid != null)

                        $("#" + attrs.picid).attr("src", scope.src);//used jquery because of limited jqlite feature

                };
                g = FR.readAsDataURL(file);
            } else {
                angular.element('input[type=file]').val('');
            }

        };

        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                scope.uploadImage = uploadImage();
                attrs.$set('onchange', 'angular.element(this).scope().uploadImage()'); //change function that will be invoked on change on image
                attrs.$set('type', 'file'); //change type of input  to be like file
                attrs.$set('accept', "image/*"); //for uploading image 
            }
        };
    });

    /* Directive for Input Validations.*/
    angVal.directive('inputValidation', [
        function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ctrl) {
                    var pattern, flag = 0,
                        data = 0;
                    //to stop the autocompletion in input type="text"
                    attrs.$set('autocapitalize', 'off');
                    attrs.$set('autocorrect', 'off');
                    attrs.$set('autocomplete', 'off');
                    attrs.$set('spellcheck', 'false');

                    elem.on('blur', function (e) {
                        switch (attrs.inputValidation) {
                        case "withTwoDigits":
                            modifyValues(e); //function to verify the two digits validation on blur and modify values 
                            break;
                        default:
                            break;
                        }

                        function modifyValues() {
                            var a = angular.element(e.currentTarget).val();
                            if (a == "0.00" || a == '.00') {
                                angular.element(e.currentTarget).val(0);
                            }
                            if (a[0] == '.' && typeof (a[1]) == 'undefined') {
                                angular.element(e.currentTarget).val(0);
                            } else if (a[0] == '.' && typeof (a[1]) != 'undefined') {
                                angular.element(e.currentTarget).val(0 + a);
                            }
                            if (a[a.length - 1] == "." && a[0] != '.') {
                                angular.element(e.currentTarget).val(parseFloat(a).toFixed(2));
                            }
                        }

                    });
                    //on focus setting the prev value of filed to data variable.
                    elem.on('focusin', function (e) {
                        if (flag == 0) {
                            flag = 1;
                            data = angular.element(e.currentTarget).val();
                        }
                    });
                    //on focus out set flag to 0
                    elem.on('focusout', function () {
                        flag = 0;
                    });

                    //on change of input this event will be triggered
                    elem.on('input', function (e) {
                        //you can add your validation pattern and make them applicable
                        switch (attrs.inputValidation) {
                        case "restrictSpaces":
                            pattern = /^[a-zA-Z0-9]*$/;
                            maxLength = (typeof (attrs.mxlength) == "undefined") ? 50 : attrs.mxlength;
                            minLength = (typeof (attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
                            break;
                        case "pwdCheck":
                            pattern = /^[a-zA-Z0-9!@#%$^&*()]*$/;
                            maxLength = (typeof (attrs.mxlength) == "undefined") ? 20 : attrs.mxlength;
                            minLength = (typeof (attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
                            break;
                        case "onlyNumbers":
                            pattern = /^[0-9]*$/;
                            maxLength = (typeof (attrs.mxlength) == "undefined") ? 20 : attrs.mxlength;
                            minLength = (typeof (attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
                            break;
                        case "withTwoDigits":
                            pattern = /^[0-9]*(\.{1})?([0-9]{1,2})?$/;
                            maxLength = (typeof (attrs.mxlength) == "undefined") ? 20 : attrs.mxlength;
                            minLength = (typeof (attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
                            break;
                        case "search":
                            pattern = /^[a-zA-Z0-9&%-,*'. ()]*$/;
                            maxLength = (typeof (attrs.mxlength) == "undefined") ? 50 : attrs.mxlength;
                            minLength = (typeof (attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
                            break;

                        default:
                            pattern = /^[^<>{}]*$/;
                            maxLength = (typeof (attrs.mxlength) == "undefined") ? 100 : attrs.mxlength;
                            minLength = (typeof (attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
                            break;
                        };

                        if (!pattern.test(angular.element(e.currentTarget).val()) || angular.element(e.currentTarget).val().length > maxLength) {

                            angular.element(e.currentTarget).val(data);
                            ctrl.$setViewValue(data);
                            ctrl.$render();
                        } else {
                            data = angular.element(e.currentTarget).val();
                        }

                    });
                }
            };
        }
    ]);
