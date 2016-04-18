/// <reference path='../../../typings/main.d.ts' />
'use strict';

import {Db, Collection} from 'mongodb';
import logger = require('winston');
import {BaseRepository} from './base';
import {IEmail} from '../../models/Email';
import {IEmailRepository} from '../IEmail';


export class EmailRepository extends BaseRepository<IEmail> implements IEmailRepository
{ 
    constructor(database: Db) {
        super(database, "emails");
    }
} 
