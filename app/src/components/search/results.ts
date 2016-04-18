/// <reference path='../../_references.d.ts' />

import {Component, View, bind} from 'angular2/core';
import {RouterLink, RouteConfig, RouteParams, Location} from 'angular2/router';

@Component({
    selector: 'search-results'
})

@View({
    templateUrl: './components/search/results.html?v=<%= VERSION %>',
    directives: [RouterLink, RouteParams]
})

    export class SearchResults
    {
        sortKey: string;
        sortKeys: Array<any>;
        location: Location

        constructor( location: Location)
        {
           
            this.location = location;          
            this.sortKeys = [];

        }

        getData(): void
        {
            
        }

        getSortKeys()
        {
            
        }

        showBookDetail(id: string)
        {
            this.location.go('/books/details/' + id)
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