import * as angular from 'angular';
//import commonModules from './common/common';
import componentModules from './components/components';
import 'angular-ui-router';
// import 'ngaamc/aamc-ux-framework';


let app = angular.module('app', [
    'ui.router',
    componentModules.name
]).config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
});

// System.import("appConfig!json")
//     .then((appConfig) => {
//         app.constant("APP_CONFIG", appConfig);
//         angular.element(document).ready(() => {
//             angular.bootstrap(document, [app.name]);
//         });

//     });

angular.bootstrap(document, [app.name]);

export default app;

