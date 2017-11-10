import angular from 'angular';
import template from './wizard.header.html!text';

class WizardHeaderController {
    constructor($scope) {
        'ngInject';
        let $ctrl = this;
        $ctrl.$scope = $scope;
    }

    $onInit() {
        let $ctrl = this;

        $ctrl.progressBarWidth = ((($ctrl.currentStep + 1) / $ctrl.totalSteps) * 100) + '%';

        $ctrl.$scope.$watch('$ctrl.currentStep', (newVal, oldVal) => {
            if(newVal !== oldVal) {
                $ctrl.progressBarWidth = ((($ctrl.currentStep + 1) / $ctrl.totalSteps) * 100) + '%';
            }
        });

    }
}

let WizardHeaderComponent = {
    template,
    bindings: {
        wizardTitle: '<',
        currentStep: '<',
        totalSteps: '<'
    },
    controller: WizardHeaderController
};

export default WizardHeaderComponent;