/// <reference path='../_references.d.ts' />
 'use strict';

import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {IBaseApiProxy, BaseApiProxy} from '../apiProxies/baseApiProxy';
import {IHttpConfig} from '../models/httpConfig';
import {Email} from '../models/email';

module Proxies
{
    export interface IEmailApiProxy extends IBaseApiProxy<Email>
    {
      
    }
   
    export class EmailApiProxy extends BaseApiProxy<Email> implements IEmailApiProxy {      
        public constructor(http: Http) {
            super(http);
        }
    }
}

export = Proxies;