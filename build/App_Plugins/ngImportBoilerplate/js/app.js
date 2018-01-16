// Before

/*angular.module("umbraco").controller("ngImport.Boilerplate.Controller", function ($scope) {


    $scope.init = function() {
        console.info("Hello, world!");
    };

    $scope.init();

});*/

// After

class BoilerplateController {
    constructor() {
        this.init = this.init.bind(this);

        this.init();
    }

    init () {
        console.info("Hello, world! This is new text.");
    }
};

angular.module('umbraco').controller("ngImport.Boilerplate.Controller", BoilerplateController)

