import angular from 'angular';
import template from './form.generator.html!text';

class FormGeneratorController {
    constructor($scope) {
        'ngInject';
        let $ctrl = this;
        $ctrl.$scope = $scope;
    }

    $onInit() {
        let $ctrl = this;
        console.log($ctrl.formName);
    }

    $postLink() {
        let $ctrl = this;
        $ctrl.formValid = $ctrl.formName.$valid;
        // $ctrl.$scope.$watch(
        //     '$ctrl.formName',
        //     (newVal, oldVal) => {
        //             console.log(newVal);
        //             console.log('==wwrerte====');
        //     }
        // );
    }
}

let formGeneratorComponent = {
    template,
    bindings: {
        modelObj: '=',
        context: '<',
        formValid: '='
    },
    controller: FormGeneratorController
};

export default formGeneratorComponent;