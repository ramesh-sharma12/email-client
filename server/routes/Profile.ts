/// <reference path='../../typings/main.d.ts' />
'use strict';

import {Express, Router, Request, Response} from 'express';
import {Db} from 'mongodb';

import {IProfileService} from '../services/IProfile';
import {ProfileService} from '../services/impl/Profile';
import {ProfileRepository} from '../repository/impl/Profile';
import {ProfileController} from '../controllers/Profile';


export class ProfileRoute
{
    profileController: ProfileController;  
    service: IProfileService;  
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
        this.app.put('/api/profile', this.profileController.Create);
        this.app.post('/api/profile/:id', this.profileController.Update);
        this.app.delete('/api/profile/:id', this.profileController.Delete);
        this.app.get('/api/profile', function (req, res) {
            // body...
          self.onInit();

            return self.profileController.GetByQuery(req, res)
        });       
        this.app.get('/api/profile/:id', function (req, res) {
            // body...
          self.onInit();

            return self.profileController.GetById(req, res)
        })
    }

    onInit(){
        var repository = new ProfileRepository(this.db)
        this.service = new ProfileService(repository);
        this.profileController = new ProfileController(this.service);

    }
}