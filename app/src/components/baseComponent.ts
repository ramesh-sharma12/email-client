/// <reference path='../_references.d.ts' />
'use strict';

import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgIf} from 'angular2/common';
import {Injectable, Inject} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouterLink,RouterOutlet} from 'angular2/router';
import {Router, RouteConfig, RouteParams, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router'
import { bootstrap } from 'angular2/platform/browser';
import ActionPanel from './common/actionPanel';

@Component({
    selector: 'base-component',
    templateUrl: './src/components/layout.html?v=<%= VERSION %>',
    providers: [ROUTER_PROVIDERS,HTTP_PROVIDERS],
	directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES, RouterLink, RouterOutlet, NgIf, ActionPanel]
})

export class BaseComponent { 	
	
	isUserAuthenticated : boolean;   
    
	constructor(){
        this.isUserAuthenticated = false;
	}

	logOut() {	 
	   //this.router.navigate(['Logout']);
	}

	logIn() {	 
	   //this.router.navigate(['Login']);
	}

	signUp(){
       //this.router.navigate(['Register']);
	}

	ngOnInit(){
		this.isUserAuthenticated = true;
	}
}