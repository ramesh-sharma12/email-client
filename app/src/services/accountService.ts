/// <reference path='../_references.d.ts' />

import {User} from '../models/User';
import {Login} from '../models/Login';

import {Injectable, OnInit,Inject} from 'angular2/core';
import {IBaseService , BaseService} from './baseService';
import {IAccountApiProxy,AccountApiProxy} from '../apiProxies/accountApiProxy';

module Services
{   
	export interface IAccountService extends IBaseService<User>
	{
		authenticate(userName : string , password: string);
		register(user : User);
		logOff();
	}

    export class AccountService extends BaseService<User> implements IAccountService
    {
		public login : Login
    	constructor(@Inject(AccountApiProxy) proxy: IAccountApiProxy){
    		super(proxy, 'account');
    	}

    	authenticate(userName : string , password: string){
    		//this.post();
    	}

    	register(user : User){
    		return this.put(user);
    	}

    	logOff(){
    		
    	}
    }
}

export = Services;