/// <reference path='./_models.d.ts' />

'use strict';

import {IBaseEntity} from './baseEntity';

export interface ICategory extends IBaseEntity 
{
    Name : string;
    Description : string ;

	SubCategories : Array<ICategory> ;
}