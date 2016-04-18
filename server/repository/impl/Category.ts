/// <reference path='../../../typings/main.d.ts' />
'use strict';

import {Db, Collection} from 'mongodb';
import logger = require('winston');
import {BaseRepository} from './base';
import {ICategory} from '../../models/Category';
import {ICategoryRepository} from '../ICategory';


export class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository
{ 
    constructor(database: Db) {
        super(database, "categories");
    }
} 
