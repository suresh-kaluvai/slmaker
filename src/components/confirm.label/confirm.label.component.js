import angular from 'angular';
import template from './confirm.label.html!text';

class confirmLabelController {
    constructor() {
        'ngInject';
        let $ctrl = this;
    }
}

let confirmLabelComponent = {
    template,
    controller: confirmLabelController
};

export default confirmLabelComponent;