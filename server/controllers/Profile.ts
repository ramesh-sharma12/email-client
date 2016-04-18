/// <reference path='../_references.d.ts' />
'use strict';

import {Express, Request, Response} from "express";
import logger = require('winston');

import {IProfile} from '../models/Profile';
import {BaseController} from './base';
import {IProfileService} from '../services/IProfile';

var self;    

export class ProfileController extends BaseController<IProfile>
{
    private categories: Array<IProfile>;
    private categoryService: IProfileService;       

    constructor(service: IProfileService) {
        super(service);

        self = this;

        self.email = <IProfile>{};
        self.categoryService = service;
    }  

}