class RootController {
    constructor($state) {
        'ngInject';
    }
}

let rootComponent = {
    template: `
        <div>               
            <ui-view></ui-view>        
        </div>
    `,
    controller: RootController,
    controllerAs: "Root"
};

	

export default rootComponent;