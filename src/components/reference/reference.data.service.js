import angular from 'angular';

class ReferenceDataService {
    /*@ngInject*/
    constructor($q, SHIPPINGRATE) {
        'ngInject';
        let $ctrl = this;
        $ctrl.$q = $q;
        $ctrl.shippingRate = SHIPPINGRATE;
    }

    $onInit() {
        let $ctrl = this;
        $ctrl.currentLabelData = {};
    }

    getWizardContext() {
        let $ctrl = this;
        let deferred = $ctrl.$q.defer();

        let processSteps = [
            {
                step: 0,
                title: "Receiver's Address",
                pageData: [
                    {
                        label: 'Name',
                        type: 'text',
                        name: 'receiverName',
                    },
                     {
                        label: 'Street',
                        type: 'text',
                        name: 'receiverStreet',
                    },
                     {
                        label: 'City',
                        type: 'text',
                        name: 'receiverCity',
                    },
                     {
                        label: 'State',
                        type: 'text',
                        name: 'receiverState',
                    },
                     {
                        label: 'Zip',
                        type: 'text',
                        name: 'receiverZip',
                    }
                ]
            },
            {
                step: 1,
                title: "Senders's Address",
                pageData: [
                    {
                        label: 'Name',
                        type: 'text',
                        name: 'senderName',
                    },
                     {
                        label: 'Street',
                        type: 'text',
                        name: 'senderStreet',
                    },
                     {
                        label: 'City',
                        type: 'text',
                        name: 'senderCity',
                    },
                     {
                        label: 'State',
                        type: 'text',
                        name: 'senderState',
                    },
                     {
                        label: 'Zip',
                        type: 'text',
                        name: 'senderZip',
                    }
                ]
            },
            {
                step: 2,
                title: "Package Weight",
                pageData: [
                    {
                        label: 'Weight',
                        type: 'text',
                        name: 'packageWeight',
                    }
                ]
            },
            {
                step: 3,
                title: "Shipping Preference",
                pageData: [
                    {
                        label: 'Shipping Preference',
                        type: 'radio',
                        name: 'shippingOption',
                        data: [
                            {label: 'Ground', value: 1},
                            {label: 'Priority', value: 2}
                        ]
                    }
                ]
            }
        ];

        deferred.resolve(processSteps);
        return deferred.promise;
    }
    
    setCurrentLabelData(data) {
        let $ctrl = this;
        $ctrl.currentLabelData = $ctrl.formatLabelData(data);
    }

    formatLabelData(data) {
        let $ctrl = this;

        let formattedLabelData = {
            to: {
                name: data[0].receiverName,
                street: data[0].receiverStreet,
                city: data[0].receiverCity,
                state: data[0].receiverState,
                zip: data[0].receiverZip
            },
            from: {
                name: data[1].senderName,
                street: data[1].senderStreet,
                city: data[1].senderCity,
                state: data[1].senderState,
                zip: data[1].senderZip
            },
            weight: data[2].packageWeight,
            shippingOption: data[3].shippingOption
        }

        return formattedLabelData;
    }

    getFormattedLabelData() {
        let $ctrl = this;
        let deferred = $ctrl.$q.defer();

        deferred.resolve($ctrl.currentLabelData);
        return deferred.promise;
    }

    calculateShippingCost(weight, shippingOption) {
       let $ctrl = this;

       let cost =  parseFloat(weight) * $ctrl.shippingRate * (shippingOption === 1 ? 1 : 1.5);

       return cost;
    }



}

let referenceDataServiceModule = angular.module('reference.data.service', [])
.service('ReferenceDataService', ReferenceDataService)
.constant('SHIPPINGRATE', 0.40);

export default referenceDataServiceModule;