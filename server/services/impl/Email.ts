/// <reference path='../../../typings/main.d.ts' />
'use strict';

import {IEmail} from '../../models/Email';
import {IEmailRepository} from '../../repository/IEmail';
import logger = require('winston');
import {BaseService} from '../../services/impl/base';
import {IBaseService} from '../../services/IBase';


export class EmailService extends BaseService<IEmail> implements IBaseService<IEmail>
{
    repository: IEmailRepository;

    public constructor(repository: IEmailRepository)
    {
        super(repository);
    }
}

 