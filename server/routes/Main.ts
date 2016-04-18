/// <reference path='../../typings/main.d.ts' />
'use strict';

import {Express, Router, Request, Response} from 'express';
import {Db} from 'mongodb';

import {UserRoute} from './user';
import {EmailRoute} from './email';
import {ProfileRoute} from './profile';
import {CategoryRoute} from './category';
import {IndexRoute} from './index';

export class MainRoute
{    
    app: Express;
    db: Db;

    constructor(app: Express, db: Db)
    {
        this.app = app;
        this.db = db;
    }

    Register()
    {          
        var indexRoute = new IndexRoute(this.app);
        indexRoute.RegisterRoutes();

        var emailRoute = new EmailRoute(this.app, this.db);
        emailRoute.RegisterRoutes();

         var profileRoute = new ProfileRoute(this.app, this.db);
        profileRoute.RegisterRoutes();

         var categoryRoute = new CategoryRoute(this.app, this.db);
        categoryRoute.RegisterRoutes();

         var userRoute = new UserRoute(this.app, this.db);
        userRoute.RegisterRoutes();
    }

}