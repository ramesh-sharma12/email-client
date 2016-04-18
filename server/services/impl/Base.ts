/// <reference path='../../../typings/main.d.ts' />

'use strict';

import {IBaseRepository} from '../../repository/IBase';
import logger = require('winston');
import {IBaseService} from '../IBase';
import {IResult} from '../../models/result';

export class BaseService<TEntity> implements IBaseService<TEntity>
{
    repository: IBaseRepository<TEntity>;

    public constructor(repository: IBaseRepository<TEntity>)
    {
        this.repository = repository;
    }

    public InitData(sampleData: Array<TEntity>, callback: (errr: Error, item: IResult) => any)
    {
        this.BulkCreate(sampleData, callback);
    }   

    public GetByQuery(query: Object, sortKey: string, sortOrder: string, callback: (errr: Error, item: Array<TEntity>) => any)
    {
        logger.log('debug', 'GetByQuery...BaseService');
        this.repository.GetByQuery(query, sortKey, sortOrder, callback);
    }

    public GetById(id: string, callback: (errr: Error, item: TEntity) => any)
    {
         logger.log('debug', 'GetById...BaseService');
        this.repository.Get(id, callback);
    }

    public GetSummary(query: Object, callback: (errr: Error, item:IResult) => any) 
    {
        this.repository.GetSummary(query, callback);
    }

    public Create(data: TEntity, callback: (errr: Error, item: IResult) => any)
    {
        this.repository.Create(data as TEntity, callback);
    }

    public Update(id: string, data: TEntity, callback: (errr: Error, item: IResult) => any)
    {
        this.repository.Update(id, data as TEntity, callback);
    }

    public Delete(id: string, callback : (err: Error, item: IResult) => any)
    {        

        this.repository.Delete(id, callback);
    }

    public BulkCreate(data: Array<TEntity>, callback: (errr: Error, item: IResult) => any)
    {
        this.repository.BulkCreate(data as Array<TEntity>, callback);
    }  


    public BulkUpdate(data: Array<TEntity>, callback: (errr: Error, item: IResult) => any)
    {
        this.repository.BulkUpdate(data as Array<TEntity>, callback);
    }  

    public BulkDelete(data: Array<string>, callback: (errr: Error, item: IResult) => any)
    {
        this.repository.BulkDelete(data, callback);
    }  
}


  