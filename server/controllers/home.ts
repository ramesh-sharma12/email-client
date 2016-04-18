/// <reference path='../_references.d.ts' />
'use strict';

import {Express, Request, Response} from "express";
import {IEmailService} from '../services/IEmail';

export class HomeController
{
    service: IEmailService;

    public constructor(service: IEmailService)
    {        
        this.service = service;
    }
}  