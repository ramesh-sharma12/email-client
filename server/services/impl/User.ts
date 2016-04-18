/// <reference path='../../../typings/main.d.ts' />
'use strict';

import {IUser} from '../../models/User';
import {IUserRepository} from '../../repository/IUser';
import logger = require('winston');
import {BaseService} from '../../services/impl/base';
import {IBaseService} from '../../services/IBase';


export class UserService extends BaseService<IUser> implements IBaseService<IUser>
{
    repository: IUserRepository;

    public constructor(repository: IUserRepository)
    {
        super(repository);
    }
}
