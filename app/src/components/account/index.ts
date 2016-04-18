/// <reference path='../../_references.d.ts' />

import {Component, View} from 'angular2/core';

@Component({
    selector: 'component-2'
})
@View({
    templateUrl: './components/account/index.html?v=<%= VERSION %>'
})


export class Account
{

}
 