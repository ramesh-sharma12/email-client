/// <reference path='../../typings/main.d.ts' />
'use strict';

import {Express, Router, Request, Response} from 'express';
import {Db} from 'mongodb';

import {IUserService} from '../services/IUser';
import {UserService} from '../services/impl/User';
import {UserRepository} from '../repository/impl/User';
import {UserController} from '../controllers/User';


export class UserRoute
{
    userController: UserController;  
    service: IUserService;  
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

        this.app.put('/api/user', this.userController.Create);
        this.app.post('/api/user/:id', this.userController.Update);
        this.app.delete('/api/user/:id', this.userController.Delete);
        this.app.get('/api/user', function(req, res){
           self.onInit();
            return self.userController.GetByQuery(req, res);
        });       
        this.app.get('/api/user/:id',  function(req, res){
            self.onInit();
            return self.userController.GetById(req, res);
        });
    }

    onInit(){
        var repository = new UserRepository(this.db)
        this.service = new UserService(repository);
        this.userController = new UserController(this.service);
    }
}