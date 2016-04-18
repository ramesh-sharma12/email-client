/// <reference path='../_references.d.ts' />

import {Inject} from 'angular2/core';
import {IBaseService , BaseService} from './baseService';
import {IProfileApiProxy , ProfileApiProxy} from '../apiProxies/profileApiProxy';
import {Profile} from '../models/profile';

module Services
{  	
	export interface IProfileService extends IBaseService<Profile> {

	}

	export class ProfileService extends BaseService<Profile> implements IProfileService
	{

		public constructor(@Inject(ProfileApiProxy) profileProxy: IProfileApiProxy){
				super(profileProxy, 'Profile');
		}
	}

}

export = Services;