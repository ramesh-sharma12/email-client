/// <reference path='../../../typings/main.d.ts' />
'use strict';

import {ICategory} from '../../models/Category';
import {ICategoryRepository} from '../../repository/ICategory';
import logger = require('winston');
import {BaseService} from '../../services/impl/base';
import {IBaseService} from '../../services/IBase';


export class CategoryService extends BaseService<ICategory> implements IBaseService<ICategory>
{
    repository: ICategoryRepository;

    public constructor(repository: ICategoryRepository)
    {
        super(repository);
    }
}
