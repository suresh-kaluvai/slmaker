import * as angular from 'angular';
import home from './home.component';

/**
 *This is the sample component that was generated
 *@module home
 */
let homeModule = angular.module('home', [])
    .config(function ($stateProvider) {
        $stateProvider.state({
            name: "home",
            url: "/",
            template: "<home></home>"
        });
    })
    .component('home', home);

export default homeModule;