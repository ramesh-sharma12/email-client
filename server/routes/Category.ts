/// <reference path='../../typings/main.d.ts' />
'use strict';

import {Express, Router, Request, Response} from 'express';
import {Db} from 'mongodb';

import {ICategoryService} from '../services/ICategory';
import {CategoryService} from '../services/impl/Category';
import {CategoryRepository} from '../repository/impl/Category';
import {CategoryController} from '../controllers/Category';


export class CategoryRoute
{
    categoryController: CategoryController;  
    service: ICategoryService;  
    app: Express;
    db: Db;

    constructor(app: Express, db: Db)
    {
        this.app = app;
        this.db = db;   

        this.onInit();
    }

    RegisterRoutes()
    {  
        var self = this;

        this.app.put('/api/category', this.categoryController.Create);
        this.app.post('/api/category/:id', this.categoryController.Update);
        this.app.delete('/api/category', this.categoryController.Delete);
        this.app.get('/api/category', function (req, res) {
            // body...
             self.onInit();  

            return self.categoryController.GetByQuery(req, res)
        });    

        this.app.get('/api/category/:id', function (req, res) {
            // body...
             self.onInit();  

            return self.categoryController.GetById(req, res)
        });
    }

    onInit(){
        var repository = new CategoryRepository(this.db)
        this.service = new CategoryService(repository);
        this.categoryController = new CategoryController(this.service);
    }
}