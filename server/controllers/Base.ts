/// <reference path='../_references.d.ts' />
'use strict';

import {Express, Request, Response} from "express";
import logger = require('winston');

import {IBaseService} from '../services/IBase';

var self;

export class BaseController<IEntity> {

    private entity: IEntity;
	private entities: Array<IEntity>;
    private service: IBaseService<IEntity>;       

    constructor(service: IBaseService<IEntity>) {
        self = this;
        this.service = service;
    }   

    public GetById(req: Request, res: Response) {

         logger.log('debug', 'GetById...BaseController');

        self.service.GetById(req.params.id, function(err, item)
        {
            if(err) console.log(err);

            return res.json(item);
        });
    }        

    public GetByQuery(req: Request, res: Response) {      

        var query = {}

        if(req.query.Status){
            query =  { 
                Status : +req.query.Status
            }
        }

        logger.log('debug', 'GetByQuery...BaseController');

        self.service.GetByQuery(query, req.query.sortKey, req.query.sortOrder, function(err, item) {
            if (err) console.log(err);

            return res.json(item);
        });
    }      

     public Create(req: Request, res: Response) {  
         var data = req.body;

         self.service.Create(data, function(err, item) {
             if (err) console.log(err);

             return res.json(item);
        });
    }

    public Update(req: Request, res: Response) {
        var id = req.params.id; 
        var data = req.body;
          
         self.service.Update(id, data, function(err, item) {
            if (err) console.log(err);

            return res.json(item);
        });
    }

    public Delete(req: Request, res: Response) {
        var id = req.params.id; 
        
        self.service.Delete(id, function(err, item) {
            if (err) console.log(err);

            return res.json(item);
        });
    }


    public BulkCreate(req: Request, res: Response) {       
        self.service.BulkCreate(this.entities, function(err, item) {
            if (err) console.log(err);

            return res.json(item);
        });
    }

    public BulkUpdate(req: Request, res: Response) {
        var id = 0;       
        self.service.BulkUpdate(this.entities, function(err, item) {
            if (err) console.log(err);

            return res.json(item);
        });
    }

    public BulkDelete(req: Request, res: Response) {
        var ids = new Array<string>();
        self.service.BulkDelete(ids, function(err, item) {
            if (err) console.log(err);

            return res.json(item);
        });
    }
}