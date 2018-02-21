# React Angular Chimera &middot; ![version](https://img.shields.io/badge/version-1.0.0.rc2-yellow.svg)

>"A thing of immortal make, not human, lion-fronted and snake behind, a goat in the middle."

-Homer, *the Iliad*

This is a proof of concept and example of what I'm calling the "React Angular Chimera", AKA running React components inside an Angular controller/wrapper inside the Umbraco backoffice.

This is a *very* simple example of a property editor with a textbox.

## Seeing the Example In Action

To see the example property editor in action, copy the `/build/dist/ReactAngularChimera/` folder into `/App_Plugins/` of the Umbraco install of your choice, restart your Umbraco install, add a new DataType with the "React in Angular Chimera" property editor, and then include that on a doctype you wish to see the editor in.

## The Source Files

The JavaScript file `bundle.js` inside the distributable example is built with Webpack. The source files for its JS is inside `/build/assets/js`. You can modify and build these files by first running `npm install` in the `/build/` directory and then running `npm run webpack` after you've made any desired code changes.

The JS files and their role are as follows:

### app.js

This is the "launching point" of the JS code. It imports the `AngularWrapper()` function and instantiates it as a controller mapped to "ReactAngularChimera.AngularWrapper", which is used by the `ng-controller` data-type for the Angular view for the property editor in `/build/dist/ReactAngularChimera/views/container.html`.

### controllers/AngularWrapper.js

This is the Angular controller that binds to the view for the property editor. It makes use of two Angular dependencies: `$scope` and `$element`, we are injected via `$inject` at the end of the file. In this example we're using `$scope` instead of `var vm = this` to reduce confusion with scope binding for the React component.

The controller file is heavily commented, but I'll walk you through how the interaction between the Angular and React works.

We need to perform two important tasks to make the React work properly: we need to initialize a render of a component inside the markup, and we need to keep a two-way communication between the Angular controller's $scope and the React component's props.

`/build/dist/ReactAngularChimera/views/container.html` looks like this:

```
<div class="chimera-container" ng-controller="ReactAngularChimera.AngularWrapper">
    <div><strong>React in Angular Chimera Example</strong></div>
    <div class="react-mount-node"></div>
    <div>
        <strong>Angular-controlled span: </strong><span>{{model.value}}</span>
    </div>
</div>
```

So we need to bind the React component to the `<div class="react-mount-node" />` element. This is why we've injected `$element` into the `AngularWrapper` controller. Inside `$scope.setVariables()` we have the following:

```
$scope.reactNode = $element[0].querySelector('.react-mount-node');
```

Whenever `AngularWrapper`'s `$scope.model.value` updates, we want to be able to pass that into our React component, `ReactLogic`, which doesn't benefit from Angular's native binding. So in `$scope.init()` we set a watch on `$scope.model.value` as follows:

```
$scope.$watch('model.value', function(newValue) {
    $scope.updateReact(newValue);
});
```

Inside the `$scope.updateReact()` function we make sure to get the new value (which we assign to the variable `value`) and then we insert it into our `ReactLogic` component with the following:

```
ReactDOM.render(<ReactLogic 
    onValueChange={$scope.updateAngular} 
    value={value} 
/>, $scope.reactNode);
```

We reference the element we bound earlier to `$scope.reactNode`, and we pass in our value as well as a function called `$scope.updateAngular()` which we've mapped to `onValueChange` (we'll visit this momentarily).

Off-hand, one might think that calling `ReactDOM.render()` each time we want to update our component would be slow. Thankfully, this isn't the case, as described by Dan Abramov:

>Misconception: calling ReactDOM.render() second time is very slow. Reality: it has the same performance as setState() on root component.

-[Dan Abramov (@dan_abramov) on Twitter, 24 Jan 2016](https://twitter.com/dan_abramov/status/691301224541503488)

By doing this, every time Angular detects an update to our value, we pass that change into our React component's props.

The final important part of this puzzle is how to perform the reverse: capturing changes occurring to our value in the React component and passing them back to our Angular controller. We keep this all inside the `AngularWrapper`'s sphere of authority by creating a `$scope.updateAngular()` function that looks like this:

```
$scope.updateAngular = function(value) {
    $scope.model.value = value;
    $scope.$apply();
}      
```

Which we pass into our `ReactLogic` component as onValueChange. Inside the component we can then call this function and have it pass the changes back up to the Angular.

### components/ReactLogic/ReactLogic.js

This is our React component that we're injecting into the Angular view using the `ReactDOM.render()` inside `AngularWrapper`, and that we're passing `$scope.model.value` to as `props.value`. It is a vanilla React component, with no need for additional changes to behave properly with our Angular wrapper. We can use it in any normal fashion we desire.

There will be some issues if we try to utilize Angular dependencies like `$http`, but we could inject those with [ngimport](https://github.com/bcherny/ngimport), and we also need to pass in any Umbraco services or resources into our component via `AngularWrapper` as props if we wish to utilize those, as we can't use ngimport to bring in non built-in Angular dependencies. More on how to do this will exist in a future version of this repo.