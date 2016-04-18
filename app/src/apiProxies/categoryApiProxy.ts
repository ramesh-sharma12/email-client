/// <reference path='../_references.d.ts' />
 'use strict';

import {Http} from 'angular2/http';
import {IBaseApiProxy, BaseApiProxy} from '../apiProxies/baseApiProxy';
import {Category} from '../models/Category';

module Proxies
{   
    export interface ICategoryApiProxy extends BaseApiProxy<Category>
    {

    }

    export class CategoryApiProxy extends BaseApiProxy<Category> implements ICategoryApiProxy
    {
        public constructor(http: Http)
        {
            super(http);
        }
    }
}

export = Proxies;