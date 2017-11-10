import template from './home.html!text';
class HomeController {
    constructor($state) {
        'ngInject';
        this.stateService = $state;

    }

    $onInit() {
    }

    gotoAbout(bookmark) {
        this.stateService.go("about");
    }




}


let homeComponent = {
    template,
    bindings: {

    },
    controller: HomeController
};



export default homeComponent;