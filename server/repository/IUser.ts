/// <reference path='../../typings/main.d.ts' />
'use strict';

import {IBaseRepository} from "./IBase";
import {IUser} from  '../models/User';


export interface IUserRepository extends IBaseRepository<IUser>
{
   
} 