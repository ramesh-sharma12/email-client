/// <reference path='../_references.d.ts' />
'use strict';

import {Express, Request, Response} from "express";
import logger = require('winston');

import {IEmail} from '../models/Email';
import {BaseController} from './base';
import {IEmailService} from '../services/IEmail';

var self;    

export class EmailController extends BaseController<IEmail>
{
    private emails: Array<IEmail>;
    private email : IEmail;
    private emailService: IEmailService;       

    constructor(service: IEmailService) {
        super(service);

        self = this;

        self.email = <IEmail>{};
        self.emailService = service;
    }  

    public Search (){

        
    }  

	public Create(req: Request, res: Response) {
		var data = req.body;		

		if(data){			
			self.email = data.Entity;		

			self.emailService.Create(self.email, function(err, item) {
				if (err) console.log(err);

				return res.json(item);
			});
		}		
    } 

    public Update(req: Request, res: Response) {
        var data = req.body;        
        var id = req.params.id; 

        if(data){            
            self.email = data.Entity;        

            self.emailService.Update(id, self.email, function(err, item) {
                if (err) console.log(err);

                return res.json(item);
            });
        }        
    } 

    public GetSummary(req: Request, res: Response) {
        var query = {
            Read : false
        };
       

        self.emailService.GetSummary(query, function(err, items) {
            if (err) console.log(err);

            if(items){
                for (var i = items.length - 1; i >= 0; i--) {
                   
                }
            }

            return res.json(items);
        });
    }        
}
