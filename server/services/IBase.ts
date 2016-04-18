/// <reference path='../../typings/main.d.ts' />

'use strict';

import {IResult} from '../models/result';

export interface IBaseService<TEntity>
{
    InitData(sampleData: Array<TEntity>, callback: (errr: Error, item: IResult) => any);

    GetByQuery(query: any, sortKey : string, sortOrder: string, callback: (errr: Error, item: Array<TEntity>) => any);
    GetById(id: string, callback: (errr: Error, item: TEntity) => any);

    Create(data: TEntity, callback: (errr: Error, item: IResult) => any);        
    Update(id: string, data: TEntity, callback: (errr: Error, item: IResult) => any);
    Delete(id: string, callback: (errr: Error, item: IResult) => any);

    BulkCreate(data: Array<TEntity>, callback: (errr: Error, item: IResult) => any);
    BulkDelete(data: Array<string>, callback: (errr: Error, item: IResult) => any);  
    BulkUpdate(data: Array<TEntity>, callback: (errr: Error, item: IResult) => any);
}

  