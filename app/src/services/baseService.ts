 /// <reference path='../_references.d.ts' />

import {Inject} from 'angular2/core';
import {Observable} from 'rxjs';

import {IBaseApiProxy,BaseApiProxy} from '../apiProxies/baseApiProxy';
import {IHttpConfig, HttpConfig} from '../models/httpConfig';
import {Result} from '../models/result';


module Services
{  		
	export interface IBaseService<TEntity> 
	{
		getById(id: string): Observable<TEntity>;      
		get(query: Object, sortKey: string, sortOrder: string): Observable<Array<TEntity>>;
		put(entity: TEntity): Observable<Result>;
		post(id: string, entity: TEntity): Observable<Result>;
		delete(id: string) : Observable<any>;
	}

	export class BaseService<TEntity> implements IBaseService<TEntity>
	 {
		private baseProxy : IBaseApiProxy<TEntity>
        private httpConfig : HttpConfig;

		constructor(@Inject(BaseApiProxy) baseProxy: IBaseApiProxy<TEntity>, controllerName : string)
		{			
			this.baseProxy = baseProxy;
			this.httpConfig = new HttpConfig();

			this.httpConfig.Controller = controllerName;
		}

		public getById(id: string): Observable<TEntity>
		{			
			this.httpConfig.Params = {
				Id: id
			};

			return this.baseProxy.getById(this.httpConfig);
		}     

		public get(query: Object, sortKey: string, sortOrder: string): Observable<Array<TEntity>>
		{		
			this.httpConfig.Params = {
	    		sortKey : sortKey,
	    		sortOrder : sortOrder	    		
	    	};			

	    	this.httpConfig.Params = Object.assign(this.httpConfig.Params, query)

 			return this.baseProxy.get(this.httpConfig);
		}

		public put(entity: TEntity): Observable<Result>
		{
			this.httpConfig.Data = JSON.stringify({ 'Entity': entity });

			return this.baseProxy.create(this.httpConfig);
		}

		public post(id: string, entity: TEntity): Observable<Result>
		{
			this.httpConfig.Data = JSON.stringify({ 'Entity': entity });
			this.httpConfig.Params = { Id : id};
			return this.baseProxy.update(this.httpConfig);
		}

		public delete(id: string): Observable<any>
		{
			this.httpConfig.Params = {
				id: id
			};

			return this.baseProxy.remove(this.httpConfig);
		}
	}	
}

export = Services;