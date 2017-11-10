import * as angular from 'angular';
import rootComponent from './root.component.js';

/**
 *This is the sample component that was generated
 *@module app
 */
let rootModule = angular.module('root', [])
.component('root', rootComponent);

export default rootModule;