import angular from 'angular';
import formGeneratorComponent from './form.generator.component';

let formGeneratorModule = angular.module('form.generator', [])
    .component('formGenerator', formGeneratorComponent);

export default formGeneratorModule;