import angular from 'angular';
import template from './wizard.navigation.html!text';

class WizardNavigationController {
    constructor() {
        'ngInject';
        let $ctrl = this;
    }
}

let WizardNavigationComponent = {
    template,
    bindings: {
        previousIndex: '<',
        nextIndex: '<',
        onPrevious: '&',
        onNext: '&',
        onContinue: '&',
        formValid: '<'
    },
    controller: WizardNavigationController
};

export default WizardNavigationComponent;