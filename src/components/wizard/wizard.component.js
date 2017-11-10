import template from './wizard.html!text';
class WizardController {
    constructor($state, ReferenceDataService) {
        'ngInject';
        let $ctrl = this;
        $ctrl.stateService = $state;
        $ctrl.referenceDataService = ReferenceDataService;
    }

    $onInit() {
        let $ctrl = this;
        $ctrl.LabelData = {};

        $ctrl.context = $ctrl.wizardContext[0];
        $ctrl.totalSteps = $ctrl.wizardContext.length;
        $ctrl.previousIndex = false;
        $ctrl.currentIndex = 0;
        $ctrl.nextIndex = 1;

        $ctrl.isFormValid = false;
    }

    goToPreviousStep(previousIndex) {
        let $ctrl = this;
        $ctrl.context = $ctrl.wizardContext[previousIndex];
        $ctrl.setCurrentNextPreviousIndex(previousIndex);
    }

    goToNextStep(nextIndex) {
        let $ctrl = this;
        $ctrl.context = $ctrl.wizardContext[nextIndex];
        $ctrl.setCurrentNextPreviousIndex(nextIndex);
    }

    setCurrentNextPreviousIndex(currentStep) {
        let $ctrl = this;
        $ctrl.currentIndex = currentStep;
        $ctrl.nextIndex = (($ctrl.totalSteps - 1) > currentStep) ? (parseInt(currentStep) + 1): false;
        $ctrl.previousIndex = (currentStep !== 0) ? (parseInt(currentStep) - 1) : false;
    }

    goToReview() {
        let $ctrl = this;
        $ctrl.referenceDataService.setCurrentLabelData($ctrl.LabelData);
        $ctrl.stateService.go('review');
    }
}

let wizardComponent = {
    template,
    bindings: {
        wizardContext: '<'
    },
    controller: WizardController
};

export default wizardComponent;