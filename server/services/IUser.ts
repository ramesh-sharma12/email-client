/// <reference path='../../typings/main.d.ts' />
'use strict';

import {IUser} from '../models/User';
import logger = require('winston');
import {IBaseService} from '../services/IBase';

export interface IUserService extends IBaseService<IUser> {
 
}