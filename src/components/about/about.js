import * as angular from 'angular';
import about from './about.component.js';

/**
 *This is the sample component that was generated
 *@module about
 */
let aboutModule = angular.module('about', [])
    .config(function ($stateProvider) {
        $stateProvider.state({
            name: "about",
            url: "/about",
            template: "<about></about>"
        });
    })
    .component('about', about);

export default aboutModule;