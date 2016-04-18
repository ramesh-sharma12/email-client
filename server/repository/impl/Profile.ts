/// <reference path='../../../typings/main.d.ts' />
'use strict';

import {Db, Collection} from 'mongodb';
import logger = require('winston');
import {BaseRepository} from './base';
import {IProfile} from '../../models/Profile';
import {IProfileRepository} from '../IProfile';


export class ProfileRepository extends BaseRepository<IProfile> implements IProfileRepository
{ 
    constructor(database: Db) {
        super(database, "profiles");
    }
} 
