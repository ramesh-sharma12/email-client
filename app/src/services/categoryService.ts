/// <reference path='../_references.d.ts' />

import {Inject} from 'angular2/core';
import {IBaseService , BaseService} from './baseService';
import {ICategoryApiProxy , CategoryApiProxy} from '../apiProxies/categoryApiProxy';
import {Category} from '../models/category';

module Services
{  	
	export interface ICategoryService extends IBaseService<Category> {

	}

	export class CategoryService extends BaseService<Category> implements ICategoryService
	{

		public constructor(@Inject(CategoryApiProxy) categoryProxy: ICategoryApiProxy){
				super(categoryProxy, 'category');
		}
	}

}

export = Services;