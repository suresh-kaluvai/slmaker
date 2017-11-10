import * as angular from 'angular';
import * as components from './component.imports';

var deps = [];

for (let key of Object.keys(components)) {
    deps.push(components[key].name);
}

let componentsModule = angular.module('components', deps);

export default componentsModule;