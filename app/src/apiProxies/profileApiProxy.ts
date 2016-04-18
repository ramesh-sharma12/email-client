/// <reference path='../_references.d.ts' />
 'use strict';

import {Http} from 'angular2/http';
import {IBaseApiProxy, BaseApiProxy} from '../apiProxies/baseApiProxy';
import {Profile} from '../models/Profile';

module Proxies
{   
    export interface IProfileApiProxy extends BaseApiProxy<Profile>
    {

    }

    export class ProfileApiProxy extends BaseApiProxy<Profile> implements IProfileApiProxy
    {
        public constructor(http: Http)
        {
            super(http);
        }
    }
}

export = Proxies;