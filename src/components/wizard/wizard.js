import * as angular from 'angular';
import wizardComponent from './wizard.component';

/**
 *This is the component which generates the shipping label forms
 *@module wizard
 */
let wizardModule = angular.module('wizard', [])
    .config(function ($stateProvider) {
        $stateProvider.state({
            name: "wizard",
            url: "/wizard",
            template: `<wizard wizard-context="$resolve.wizardContext"></wizard>`,
            resolve: {
                wizardContext: (ReferenceDataService) => {
                    return ReferenceDataService.getWizardContext();
                }
            }
        });
    })
    .component('wizard', wizardComponent);

export default wizardModule;