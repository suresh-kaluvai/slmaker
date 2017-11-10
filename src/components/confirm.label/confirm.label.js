import angular from 'angular';
import confirmLabelComponent from './confirm.label.component';

let confirmLabelModule = angular.module('confirm.label', [])
.config(function ($stateProvider) {
    $stateProvider.state({
        name: "confirm",
        url: "/confirm",
        template: `<confirm-label></confirm-label>`
    });
})
.component('confirmLabel', confirmLabelComponent);

export default confirmLabelModule;