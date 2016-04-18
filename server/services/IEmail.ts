/// <reference path='../../typings/main.d.ts' />
'use strict';

import {IEmail} from '../models/Email';
import {IResult} from '../models/Result';
import logger = require('winston');
import {IBaseService} from '../services/IBase';


export interface IEmailService extends IBaseService<IEmail> {
 	GetSummary(query: Object, callback: (errr: Error, item:IResult) => any);
}


 