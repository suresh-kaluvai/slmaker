import * as angular from 'angular';

let heroCardComponent = {
    template: `
        <div class="card">
            <img class="card-img-top" height="320" ng-src="{{$ctrl.imgSrc}}">
            <div class="card-block">
                <h4 class="card-title" ng-transclude="title"></h4>
                <h6 class="card-subtitle text-muted" ng-transclude="subtitle"></h6>
                <hr clas="m-y-2" />
                <div class="card-text" ng-transclude="text"></div>
            </div>
        </div>
    `,
    transclude: {
        title: "?heroCardTitle",
        subtitle: "?heroCardSubtitle",
        text: "?heroCardText"
    },
    bindings: {
        imgSrc: "@"
    }
}

export default heroCardComponent;