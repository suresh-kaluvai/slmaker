import template from './ShippingLabelMaker.html!text';


class ShippingLabelMakerController {
    constructor($state) {
        'ngInject';
    }
}

let shippingLabelMakerComponent = {
    template,
    controller: ShippingLabelMakerController
};	

export default shippingLabelMakerComponent;