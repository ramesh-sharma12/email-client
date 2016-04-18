/// <reference path='../../_references.d.ts' />

import {Component, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'component-1'
})
@View({
    templateUrl: './src/components/settings/index.html?v=<%= VERSION %>',
    directives: [RouterLink]
})

 export default class Settings { }