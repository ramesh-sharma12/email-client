/// <reference path='../_references.d.ts' />

import {Inject, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs';
import {IBaseService , BaseService} from './baseService';
import {IEmailApiProxy,EmailApiProxy} from '../apiProxies/emailApiProxy';
import {IHttpConfig, HttpConfig} from '../models/httpConfig';
import {Email} from '../models/email';
import {Result} from '../models/result';

module Services
{  	
	export interface IEmailService extends IBaseService<Email> {
		getEmailById(id: string): Observable<Email>;      
		getEmails(query: Object, sortKey: string, sortOrder: string): Observable<Array<Email>>;
      	send(email: Email): Observable<Result>;
      	saveDraft(email: Email): Observable<Result>;
      	getSummary() : Observable<any>;

        emailChangeEmit: EventEmitter<any>; 
	}
        
    export class EmailService extends BaseService<Email> implements IEmailService
    {         
        public emailChangeEmit : EventEmitter<any>;
        private emailProxy : IEmailApiProxy;       

	    public constructor(@Inject(EmailApiProxy) emailProxy: IEmailApiProxy) {
	    	super(emailProxy, 'email');
	    	this.emailProxy = emailProxy;
            this.emailChangeEmit = new EventEmitter<any>();	    	
	    }

		public getEmailById(id: string): Observable<Email> { 
			
			return this.getById(id);
	    }

	    public getEmails(query : Object, sortKey: string, sortOrder: string): Observable<Array<Email>> 
	    {
	    	
	    	return this.get(query,sortKey, sortOrder);
	    }

	    public getSummary()
	    {			
	    	var httpConfig = new HttpConfig();
			httpConfig.Controller = 'email';
	    	httpConfig.Action = 'getSummary';
	    		
            return this.emailProxy.get(httpConfig);
	    }

		public send(email: Email): Observable<Result> {			
			
            return this.post(email.Id, email);
	    }

		public saveDraft(email: Email): Observable<Result> 
		{ 
			if(email.Id){
 				return this.post(email.Id, email);
			}else{
				return this.put(email);
			}
	    }		
    }
}

export = Services;