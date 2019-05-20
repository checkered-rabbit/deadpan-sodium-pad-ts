// The require and define functions are defined directly as self-contained
// top-level functions to ensure hoisting makes them available at any point in
// the "bundle" produced by the TypeScript compiler, this is done in order to 
// avoid developers using AMD.ts to force inclusion/ execution order and work 
// against the compiler itself.
// NOTE: The code below purposely uses loose equality checks (==) against null
// to detect both null and undefined.
// TODO: Support reloading/re-defining modules
function require(dependencies, definition) {
    // A definition of a require call is nothing more than a nameless AMD
    // module, treat it as such.
    // TODO: make this concurrent
    define("require." + Date.now() + "." + Math.random(), dependencies, definition);
}
function define(name, dependencies, definition) {
    function processDefinition(name, dependencies, definition, state) {
        // Exclude require and exports as dependencies, both will be injected
        // in resolve
        var deps = (dependencies.length > 0 && dependencies[0] === "require" && dependencies[1] === "exports") ?
            (dependencies.slice(2)) : dependencies;
        if (deps.length === 0) {
            state.modules[name] = resolve(name, [], definition);
            processUpstreamDependencies(name, state);
        }
        else {
            // Register an initializer which will manage executing a module's
            // definition when all of it's dependencies are eventually available
            if (!(name in state.trackers)) {
                state.trackers[name] = track.bind(null, name, deps, definition, state);
            }
            // Build an inverse dependency map, this allows initializers to
            // track when all the module's definition become available
            deps.forEach(function (dependency) {
                if (!(dependency in state.inverseDependencyMap))
                    state.inverseDependencyMap[dependency] = {};
                state.inverseDependencyMap[dependency][name] = null; // the value for a given key is irrelevant
                processUpstreamDependencies(dependency, state);
            });
        }
    }
    // Tracks the status of the definition of a module's dependencies    
    function track(name, dependencies, definition, state) {
        // When all depdendencies are defined, then execute the module's
        // definition and notify all the upstream dependencies
        if (dependencies.filter(function (dependency) { return !(dependency in state.modules); }).length === 0) {
            state.modules[name] = resolve(name, dependencies.map(function (dependency) { return state.modules[dependency]; }), definition);
            processUpstreamDependencies(name, state);
            state.trackers[name] = null;
        }
    }
    function processUpstreamDependencies(name, state) {
        if (name in state.inverseDependencyMap) {
            Object.keys(state.inverseDependencyMap[name]).forEach(function (parent) {
                if (state.trackers[parent] != null)
                    state.trackers[parent]();
            });
        }
    }
    function resolve(name, dependencies, definition) {
        var exported = {}, returned = definition.apply(null, (definition.length === dependencies.length + 2) ?
            [require, exported].concat(dependencies) : dependencies);
        return Object.keys(exported).length === 0 ? returned : exported;
    }
    if (name == null || dependencies == null || definition == null) {
        throw new Error("Missing or wrong parameters for module definition: name " + name + " - dependencies " + dependencies + " - definition " + definition);
    }
    // Force typing to avoid compiler errors and force-casting define to any
    var def = define;
    // The state is kept as a property of the top-level define function to
    // ensure it's available at the same time the function is and to avoid
    // polluting the global scope.    
    if (def.__state__ == null)
        def.__state__ = { inverseDependencyMap: {}, modules: {}, trackers: {} };
    processDefinition(name, dependencies, definition, def.__state__);
}
/// <reference path="../node_modules/amd.ts/src/amd.ts" />
require(['real_client'], function (mod1) {
});
define("public/other_mod", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.xtext = " :-)";
});
// client-side js
// run by the browser each time your view template referencing it is loaded
define("public/client_real", ["require", "exports", "public/other_mod"], function (require, exports, other_mod_1) {
    "use strict";
    exports.__esModule = true;
    console.log('hello world :o');
    var dreams = [];
    // define variables that reference elements on our page
    var dreamsList = document.getElementById('dreams');
    var dreamsForm = document.forms[0];
    var dreamInput = dreamsForm.elements['dream'];
    // a helper function to call when our request for dreams is done
    var getDreamsListener = function () {
        // parse our response to convert to JSON
        dreams = JSON.parse(this.responseText);
        // iterate through every dream and add it to our page
        dreams.forEach(function (row) {
            appendNewDream(row.dream);
        });
    };
    // request the dreams from our app's sqlite database
    var dreamRequest = new XMLHttpRequest();
    dreamRequest.onload = getDreamsListener;
    dreamRequest.open('get', '/getDreams');
    dreamRequest.send();
    // a helper function that creates a list item for a given dream
    var appendNewDream = function (dream) {
        var newListItem = document.createElement('li');
        newListItem.innerText = dream + other_mod_1.xtext;
        dreamsList.appendChild(newListItem);
    };
    // listen for the form to be submitted and add a new dream when it is
    dreamsForm.onsubmit = function (event) {
        // stop our form submission from refreshing the page
        event.preventDefault();
        // get dream value and add it to the list
        dreams.push(dreamInput.value);
        appendNewDream(dreamInput.value);
        // reset form 
        dreamInput.value = '';
        dreamInput.focus();
    };
});
