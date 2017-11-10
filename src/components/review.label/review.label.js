import angular from 'angular';
import reviewLabelComponent from './review.label.component';

let reviewLabelModule = angular.module('review.label', [])
.config(function ($stateProvider) {
    $stateProvider.state({
        name: "review",
        url: "/review",
        template: `<review-label content="$resolve.reviewContent"></review-label>`,
        resolve: {
            reviewContent: (ReferenceDataService) => {
                return ReferenceDataService.getFormattedLabelData();
            }
        }
    });
})
.component('reviewLabel', reviewLabelComponent);

export default reviewLabelModule;