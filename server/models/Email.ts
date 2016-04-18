/// <reference path='./_models.d.ts' />

'use strict';

import {IBaseEntity} from './baseEntity';
import {IUser} from './User';
import {ICategory} from './Category';
import {IStatus} from './Status';

export interface IEmail extends IBaseEntity 
{
    Subject: string;
    Description: string;
    Message: string;
    FromUser: IUser;
    ToUser: Array<IUser>;
    CC: string;
    BCC: string;
    Status: IStatus;
    ReceivedOn: string;
    SentOn: string;
    Read : boolean;
    Type: string;   
    HasAttachments: boolean;

    User: IUser;
    Category : ICategory
}