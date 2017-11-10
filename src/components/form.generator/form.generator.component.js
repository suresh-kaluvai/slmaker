import angular from 'angular';
import template from './form.generator.html!text';

class FormGeneratorController {
    constructor() {
        'ngInject';
        let $ctrl = this;
    }
}

let formGeneratorComponent = {
    template,
    bindings: {
        modelObj: '=',
        context: '<',
        previousIndex: '<',
        nextIndex: '<',
        onPrevious: '&',
        onNext: '&',
        onContinue: '&'
    },
    controller: FormGeneratorController
};

export default formGeneratorComponent;