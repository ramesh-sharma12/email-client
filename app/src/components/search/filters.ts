/// <reference path='../../_references.d.ts' />

import {Component, View, OnInit, Inject, bind} from 'angular2/core';

@Component({
    selector: 'search-filters'
})

@View({
    templateUrl: './components/search/searchFilters.html?v=<%= VERSION %>',
    directives: []
})


export class SearchFilters
{
    langauge: boolean;
    category: boolean;
    price: boolean;

    prices: Array<any>;
    filters: Array<any>;

    
    toggleLanguage()
    {

    }

    toggleCategory()
    {

    }

    togglePrices()
    {


    }

    onItemSelect(): void
    {

    }

    onInit(): void
    {
        
    }
}