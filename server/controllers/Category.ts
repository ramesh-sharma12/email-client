/// <reference path='../_references.d.ts' />
'use strict';

import {Express, Request, Response} from "express";
import logger = require('winston');

import {ICategory} from '../models/Category';
import {BaseController} from './base';
import {ICategoryService} from '../services/ICategory';

var self;    

export class CategoryController extends BaseController<ICategory>
{
    private categories: Array<ICategory>;
    private categoryService: ICategoryService;       

    constructor(service: ICategoryService) {
        super(service);

        self = this;

        self.email = <ICategory>{};
        self.categoryService = service;
    }  

}