/// <reference path='../../_references.d.ts' />

import {Component, View} from 'angular2/core';

@Component({
    selector: 'component-2'
})

@View({
    templateUrl: './components/about/about.html?v=<%= VERSION %>'
})


export default class AboutUs
{

}