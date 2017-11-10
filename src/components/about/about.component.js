import template from './about.html!text';

class AboutController {
    constructor($anchorScroll) {
        'ngInject';
        this.onScreen = "";
        this.scroll = $anchorScroll;
        this.scroll.yOffset = 225; 
        this.onscreenHandler = (section) => this.onScreen = section;
        this.scroll();
    }

    goto() {
        return this.scroll();
    }

}

let aboutComponent = {
    require: {
    },
    template,
    bindings:{},
    controller: AboutController
};

export default aboutComponent;