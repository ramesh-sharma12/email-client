/// <reference path='_models.d.ts' />

import {Status} from './status';

module models
{
    export class Email
    {
		Id: string;
        Subject: string;
		Description: string;
		Message: string;
		FromUser: string;
		ToUser: string;
		CC: string;
		BCC: string;
		ReceivedOn: Date;
		SentOn : Date;
		Status: Status;
		Read : boolean;
		Type: string;
		HasAttachments: boolean;
    }
}

export = models;