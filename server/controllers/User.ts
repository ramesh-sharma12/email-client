/// <reference path='../_references.d.ts' />
'use strict';

import {Express, Request, Response} from "express";
import logger = require('winston');

import {IUser} from '../models/User';
import {BaseController} from './base';
import {IUserService} from '../services/IUser';

var self;    

export class UserController extends BaseController<IUser>
{    
    constructor(service: IUserService) {
        super(service);

        self = this;
    }  
}