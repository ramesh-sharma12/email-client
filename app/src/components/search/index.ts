/// <reference path='../../_references.d.ts' />

import {Component, View, OnInit, Inject, bind} from 'angular2/core';
import {RouterLink, RouterOutlet, RouteConfig} from 'angular2/router';

@Component({
    selector: 'component-1'
})

@View({
    templateUrl: './components/search/index.html?v=<%= VERSION %>',
    directives: [RouterLink, RouterOutlet]
})

export class Search
{


    constructor()
    {

    }

    onInit(): void
    {

    }
}