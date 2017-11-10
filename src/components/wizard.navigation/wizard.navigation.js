import angular from 'angular';
import wizardNavigationComponent from './wizard.navigation.component';

let wizardNavigationModule = angular.module('wizard.navigation', [])
    .component('wizardNavigation', wizardNavigationComponent);

export default wizardNavigationModule;