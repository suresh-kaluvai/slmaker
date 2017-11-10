import * as angular from 'angular';
import componentModules from './components/components';
import 'angular-ui-router';


let app = angular.module('app', [
    'ui.router',
    componentModules.name
]).config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/wizard");
});

angular.bootstrap(document, [app.name]);

export default app;

