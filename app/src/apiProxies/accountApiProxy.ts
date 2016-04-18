/// <reference path='../_references.d.ts' />
 'use strict';

import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {IBaseApiProxy, BaseApiProxy} from '../apiProxies/baseApiProxy';
import {IHttpConfig} from '../models/httpConfig';
import {User} from '../models/user';

module Proxies
{
    export interface IAccountApiProxy extends IBaseApiProxy<User>
    {
      
    }
   
    export class AccountApiProxy extends BaseApiProxy<User> implements IAccountApiProxy {      
        public constructor(http: Http) {
            super(http);
        }
    }
}

export = Proxies;