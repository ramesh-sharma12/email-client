/// <reference path='../../typings/main.d.ts' />
'use strict';

import {Express, Router, Request, Response} from 'express';
import {Db} from 'mongodb';

import {IEmailService} from '../services/IEmail';
import {EmailService} from '../services/impl/Email';
import {EmailRepository} from '../repository/impl/Email';
import {EmailController} from '../controllers/Email';


export class EmailRoute
{
    emailController: EmailController;  
    service: IEmailService;  
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
        this.app.get('/api/email/getSummary', this.emailController.GetSummary)
        this.app.put('/api/email', this.emailController.Create);
        this.app.post('/api/email/:id', this.emailController.Update);
        this.app.delete('/api/email/:id', this.emailController.Delete);
         this.app.get('/api/email', function (req, res) {
            // body...
            self. onInit();
            return self.emailController.GetByQuery(req, res)
        });   
        this.app.get('/api/email/:id', function (req, res) {
            // body...
            self. onInit();
            return self.emailController.GetById(req, res)
        }); 
    }

    onInit(){
         var repository = new EmailRepository(this.db);

         var service = new EmailService(repository);
         this.emailController = new EmailController(service);
    }
}