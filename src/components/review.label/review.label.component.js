import angular from 'angular';
import template from './review.label.html!text';

class ReviewLabelController {
    constructor(ReferenceDataService) {
        'ngInject';
        let $ctrl = this;
        $ctrl.referenceDataService = ReferenceDataService;
    }
}

let reviewLabelComponent = {
    template,
    bindings: {
        content: '<',
    },
    controller: ReviewLabelController
};

export default reviewLabelComponent;