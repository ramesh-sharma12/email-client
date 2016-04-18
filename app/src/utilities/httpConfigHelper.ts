/// <reference path='../_references.d.ts' />

import {ServiceConstants} from '../constants/serviceConstants';
import {IHttpConfig} from '../models/httpConfig';

 module Utilites
{
     export class HttpConfigHelper
    {
        serviceConstants: ServiceConstants;

        constructor()
        {
            this.serviceConstants = new ServiceConstants();
        }

        public getApiUrlFromConfig(config: IHttpConfig)
        {
            var apiUrl = this.serviceConstants.HttpHostName();

            apiUrl += 'api/';
            apiUrl += config.Controller;

            if(config.Action){
                apiUrl +=  '/' + config.Action;    
            }            

            if (config.Params)
            {
                if (config.Params.Id)
                {
                    apiUrl += '/' + config.Params.Id;
                }

                if (config.Params)
                {
                    apiUrl +=  this.GetQueryString(config.Params);
                }
            }

            return apiUrl;
        }

        private GetQueryString(obj : Object) {
            return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
        }
    }
}

export = Utilites;