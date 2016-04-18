/// <reference path='../_references.d.ts' />
 'use strict';
import {Inject} from 'angular2/core';
import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';

import {Http, Headers} from 'angular2/http';
import {IHttpConfig} from '../models/httpConfig';
import {HttpConfigHelper} from '../utilities/httpConfigHelper';
import {Result} from '../models/result';

module Proxies
{ 
    export interface IBaseApiProxy<IEntity>
    {
        getById(config: IHttpConfig): Observable<IEntity>;
        get(config: IHttpConfig): Observable<Array<IEntity>>;
        query(config: IHttpConfig): Observable<Array<IEntity>>;

        post(config: IHttpConfig): Observable<Array<IEntity>>
        create(config: IHttpConfig): Observable<Result>;
        update(config: IHttpConfig): Observable<Result>;
        remove(config: IHttpConfig): Observable<Result>;
    }
    
    export class BaseApiProxy<IEntity> implements IBaseApiProxy<IEntity>
    {
        private http: Http;
        private url: any;
        private headers: Headers;
        private config: IHttpConfig;

        public constructor(@Inject(Http) http: Http)
        {
            this.http = http;            
            this.headers = new Headers();
            this.headers.set('Content-Type', 'application/json');

            //this.config = new IHttpConfig();
        }

        public getById(config: IHttpConfig): Observable<IEntity>
        {            
            this.config = config;

            var url = new HttpConfigHelper().getApiUrlFromConfig(this.config);
           
            return this.http.get(url).map(res => { return res.json() });
        }

        public get(config: IHttpConfig): Observable<Array<IEntity>>
        {
            this.config = config;
           
            var url = new HttpConfigHelper().getApiUrlFromConfig(this.config);
          
            return this.http.get(url).map(res => { return res.json()});
        }

        public search(config: IHttpConfig): Observable<IEntity>
        {
            this.config = config;
         
            var url = new HttpConfigHelper().getApiUrlFromConfig(this.config);
            var data = this.config.Data;           

            return this.http.post(url, data, {
                headers: this.headers
            }).map(res => { return res.json() });
        }

        public post(config: IHttpConfig): Observable<Array<IEntity>>
        {
            this.config = config;
           
            var url = new HttpConfigHelper().getApiUrlFromConfig(this.config);
            var data = this.config.Data;           
           
            return this.http.post(url, data, {
                headers: this.headers
            }).map(res => { return res.json() });
        }

        public query(config: IHttpConfig): Observable<Array<IEntity>>
        {  
            this.config = config
           
            var url = new HttpConfigHelper().getApiUrlFromConfig(this.config);
            var data = this.config.Data;      

            return this.http.post(url, data, {
                    headers: this.headers
            }).map(res => { return res.json() });
        }

        public create(config: IHttpConfig): Observable<Result>
        {
            this.config = config;

            var url = new HttpConfigHelper().getApiUrlFromConfig(this.config);
            var data = this.config.Data;

            return this.http.put(url, data, {
                    headers: this.headers
            }).map(res => { return res.json() });
        }

        public update(config: IHttpConfig): Observable<Result>
        {
           this.config = config;

            var url = new HttpConfigHelper().getApiUrlFromConfig(this.config);
            var data = this.config.Data;
            
            return this.http.post(url, data, {
                headers: this.headers
            }).map(res => { return res.json() });
        }

        public remove(config: IHttpConfig): Observable<Result>
        {
            this.config = config;
           
            var url = new HttpConfigHelper().getApiUrlFromConfig(this.config);            

            return this.http.delete(url, {
                headers: this.headers
            }).map(res => { return res.json() }); 
        } 
    }
}

export = Proxies;