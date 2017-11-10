import * as angular from 'angular';
import shippingLabelMakerComponent from './shippingLabelMaker.component';

let shippingLabelMakerModule = angular.module('shippinglabel', [])
.component('slm', shippingLabelMakerComponent);

export default shippingLabelMakerModule;