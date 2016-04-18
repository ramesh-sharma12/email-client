/// <reference path='_models.d.ts' />

import {User} from './User';

module models
{
    export class Profile
    {
        FirstName: string;
		LastName: string;
		FullName: string;
		EmailId: string;
		Phone: string;
		DoB: string;
		Gender: string;
		MartialStatus : string;
		User: User;
    }
}

export = models;