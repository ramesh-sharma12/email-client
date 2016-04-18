/// <reference path='../../_references.d.ts' />

import {Component, View, bind} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'search-results',
    injectables: [bind('searchService').toClass(SearchService)]
})

@View({
    templateUrl: './components/search/searchResults.html?v=<%= VERSION %>',
    directives: [RouterLink, NgFor, NgIf]
})

export class SearchResults
{
    sortKeys: Array<any>;

    constructor()
    {
        
        this.sortKeys = [];

        this.getData();
        this.getSortKeys();
    }

    getData(): void
    {

       
    }

    getSortKeys()
    {
        
    }

    calculateOverAllRating()
    {


    }

    removeBookFromWishlist()
    {


    }

    addBookToWishlist()
    {


    }

    addItemToCart()
    {

    }

    refreshSortKey()
    {


    }

    goToBookDetail()
    {

    }

    onItemSelect(): void
    {

    }

    onInit(): void
    {
        this.getData();
        this.getSortKeys();
    }
}