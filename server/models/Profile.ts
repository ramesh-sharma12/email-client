/// <reference path='./_models.d.ts' />

'use strict';

import {IBaseEntity} from './baseEntity';
import {IUser} from './User';

export interface IProfile extends IBaseEntity {
	FirstName: string;
	LastName: string;
	FullName: string;
	EmailId: string;
	Phone: string;
	DoB: string;
	Gender: string;
	MartialStatus : string;
	User: IUser;
}