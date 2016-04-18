/// <reference path='./_models.d.ts' />

'use strict';


import {IBaseEntity} from './baseEntity';

export interface IUser extends IBaseEntity
{	
     LogonName: string;
     Password: string;
     FullName: string;
     PageSize : string;
     Status: boolean;
     Ques : string;
     Ans: string;
     Timeout : string;
     RememberMe : boolean;
}
