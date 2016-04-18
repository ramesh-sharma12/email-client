/// <reference path='../../typings/main.d.ts' />
'use strict';

import {Express, Router, Request, Response} from 'express';
import logger = require('winston');

var self ;
export class IndexRoute
{   
    app: any;

    constructor(app)
    {   
       self = this;
        this.app = app;
    }

   public RegisterRoutes()
    {
       this.app.get('/', function (req, res)
       {
           return res.render('index.html');
       });  

       var endpoints = [
                         '/register', '/login', 
                         '/settings', '/profile',
                         '/inbox', '/inbox/:id',
                         '/draft', '/draft/:id',
                         '/sent', '/sent/:id',
                         '/trash', '/trash/:id'
                       ];

        endpoints.forEach(function(name) {          
            self.app.get(name, function(req, res) {
               return res.render('../build/index.html');
            });
        });    
    }
}

