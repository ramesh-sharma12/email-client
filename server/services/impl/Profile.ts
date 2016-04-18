/// <reference path='../../../typings/main.d.ts' />
'use strict';

import {IProfile} from '../../models/Profile';
import {IProfileRepository} from '../../repository/IProfile';
import logger = require('winston');
import {BaseService} from '../../services/impl/base';
import {IBaseService} from '../../services/IBase';


export class ProfileService extends BaseService<IProfile> implements IBaseService<IProfile>
{
    repository: IProfileRepository;

    public constructor(repository: IProfileRepository)
    {
        super(repository);
    }
}
