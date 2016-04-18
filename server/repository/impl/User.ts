/// <reference path='../../../typings/main.d.ts' />
'use strict';

import {Db, Collection} from 'mongodb';
import logger = require('winston');
import {BaseRepository} from './base';
import {IUser} from '../../models/User';
import {IUserRepository} from '../IUser';


export class UserRepository extends BaseRepository<IUser> implements IUserRepository
{ 
    constructor(database: Db) {
        super(database, "users");
    }
} 
