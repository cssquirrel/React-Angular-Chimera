
import React from 'react';
import ReactDOM from 'react-dom';
import ReactLogic from '../components/ReactLogic/ReactLogic';

/**
 * @function AngularWrapper
 * @description An Angular controller that serves as a simple wrapper to a React
 * app for the purposes of binding the Umbraco Backoffice to non-Angular code.
 */
const AngularWrapper = function($scope, $element) {

    // Helper functions ////////////////////////////////////////////////////////

    $scope.setVariables = function() {
        $scope.reactNode = $element[0].querySelector('.react-mount-node');
    };

    /**
     * @method updateAngular
     * @param {JSON} value 
     * @returns {void}
     * @description Called by the ReactLogic container when it needs to update the 
     * Angular controller's state.
     */
    $scope.updateAngular = function(value) {
        $scope.model.value = value;
        $scope.$apply();
    }        

    /**
     * @method updateReact
     * @param {JSON} newValue 
     * @returns {void}
     * @description Called by a watch state initialized in $scope.init(), this 
     * passes through the updated value (we can modify this to include anything 
     * else we want) into the React Logic container. At first glance, using 
     * ReactDOM.render() each time we want to update the React might seem slow, 
     * but this is equivalent to React's setState(). 
     * See: https://twitter.com/dan_abramov/status/691301224541503488
     */
    $scope.updateReact = function(newValue) {
        const value = newValue ? newValue : $scope.model.value;
        ReactDOM.render(<ReactLogic 
            onValueChange={$scope.updateAngular} 
            value={value} 
        />, $scope.reactNode);
    }

    // Event Handler functions /////////////////////////////////////////////////

    // init ////////////////////////////////////////////////////////////////////

    $scope.init = function () {
        $scope.setVariables();
        // We need to watch model.value so we can force updates to React's state
        // from Angular's $scope.
        $scope.$watch('model.value', function(newValue) {
            $scope.updateReact(newValue);
        });
        $scope.updateReact();
    }

    // Trigger the init() function to begin the controller.
    $scope.init();
};

// We must inject these into AngularWrapper to properly DI the controller.
AngularWrapper.$inject = ['$scope', '$element'];

module.exports = AngularWrapper;