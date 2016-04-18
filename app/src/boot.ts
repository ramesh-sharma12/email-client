/// <reference path="../../typings/main.d.ts"/>

import 'rxjs/add/operator/map';
import 'angular2/bundles/angular2-polyfills';
import {provide} from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';

import {APP_BASE_HREF, 
        RouteConfig, 
        RouterOutlet,        
        LocationStrategy,
        HashLocationStrategy,
        RouterLink, ROUTER_DIRECTIVES, 
        ROUTER_PROVIDERS} from 'angular2/router';

import { MainApp} from './app';

bootstrap(MainApp, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'}),   
    HTTP_PROVIDERS
  ]);

