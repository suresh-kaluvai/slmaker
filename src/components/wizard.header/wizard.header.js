import angular from 'angular';
import wizardHeaderComponent from './wizard.header.component';

let wizardHeaderModule = angular.module('wizard.header', [])
    .component('wizardHeader', wizardHeaderComponent);

export default wizardHeaderModule;