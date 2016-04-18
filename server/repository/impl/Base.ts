/// <reference path='../../../typings/main.d.ts' />
'use strict';

import {Db, Collection, ObjectID} from 'mongodb';
import logger = require('winston');
import {IBaseRepository} from '../IBase';
import {IResult} from '../../models/result';

export class BaseRepository<TEntity> implements IBaseRepository<TEntity>
{
    db: Db;
    docName : string;

    constructor(database: Db, collectionName : string)
    {
        this.db = database;
        this.docName = collectionName;

         logger.log('debug', 'BaseRepository...working on collection....' +  this.docName);
    }

    public Get(id: string, callback: (err: Error, item: any) => any)
    {
        var self = this;
        logger.log('debug', 'Get by id...BaseRepository');
        this.db.open(function (err, db)
        {
            if (err) callback(err, null);

            var collections = db.collection(self.docName);
            var objectId = new ObjectID(id);

            collections.find(objectId).next(function(err, res) {
                logger.log('debug', 'get data...' + self.docName +'..with id...'+ objectId);
               
                callback(err, res);                               
            });
        });
    }   

    public GetByQuery(query: any, sortKey : string, sortOrder: string, callback: (err: Error, item: Array<any>) => any)
    {
        var self = this;
        logger.log('debug', 'GetByQuery...BaseRepository');

        this.db.open(function (err, db)
        {
            if (err)
            {
                callback(err, null);
            }

            var collections = db.collection(self.docName);

            var options;

            if (sortKey && sortOrder)
            {
               
                options = {
                    // "limit": 20,
                    // "skip": 10,
                    "sort": [sortKey, sortOrder]
                };

                collections.find(query).toArray(function (err, results)
                {
                    logger.log('debug', 'get..with query and sortkey, sortorder');
                    
                    callback(err, results);
                });
            } else if (sortKey) {
               
                options = {
                    //  "limit": 20,
                    //  "skip": 10,
                    "sort": sortKey
                };
                collections.find(query).toArray(function(err, res) {
                    logger.log('debug', 'get data..with query and sortkey');
                   
                    callback(err, res);
                });
            } else {                
                collections.find(query).toArray(function(err, res) {
                    logger.log('debug', 'get data..with query...' + (res ? res.length : 0));
                   
                    callback(err, res);
                });
            }
        });
    }

    public GetSummary(query: any, callback: (err: Error, item: IResult) => any)
    {
        var self = this;

        this.db.open(function (err, db)
        {
            if (err) callback(err, null);

            var collections = db.collection(self.docName);
                
            collections.group(['Status'], {}, {"count":0}, function (obj, prev) { prev.count++; }, function(){}, false , function(err, res) {
                logger.log('debug', 'get GetSummary....');
                
               

                callback(err, res);
            });
        });
    }

    public Create(data: TEntity, callback: (errr: Error, item: IResult) => any)
    {      
        var self = this;

        if (data)
        {
            this.db.open(function (err, db)
            {
                if (err) callback(err, null);

                var collections = db.collection(self.docName);

                collections.insertOne(data, function (err, res)
                {
                    logger.log('debug', 'inserting data..');

                    if (err) callback(err, null);  

                    var result = <IResult>{};
                    result.Entities = res.ops[0];
                    if(result.Entities){
                        result.Entities.Id = res.insertedId;    
                    }                    
                    result.Success = res.result.ok ? true : false;
                    result.Message = "Data succesfully inserted";

                    

                    callback(err, result);
                });
            });

        } else {

            callback(new Error('Empty'), null);
        }
    }

    public Update(id: string, data: TEntity, callback: (errr: Error, item: IResult) => any)
    {
        var self = this;

        logger.log('debug', 'called update data with id....' + id);

        if (data)
        {
            this.db.open(function (err, db)
            {
                if (err) callback(err, null);

                var collections = db.collection(self.docName);
                var objectId = new ObjectID(id);
                data['Id'] = objectId;

                collections.findOneAndUpdate(
                    {_id : objectId }, data, { upsert: true } ,
                    function (err, res)
                    {                      

                    if (err) callback(err, null);

                    logger.log('debug', 'updating data..');  
                    var result = <IResult>{}; 

                    if (res && res.value)
                    {                        
                        result.Entities = res.value;                      
                        result.Success = res.ok ? true : false;
                        result.Message = "Data succesfully updated";
                         
                    } else{

                       logger.log('debug', 'updating record but didnt return any document');
                    }

                  

                     callback(err, result);
                });
            });

        } else {

            callback(new Error('Empty'), null);
        }
    }

    public Delete(id: string, callback: (errr: Error, item: IResult) => any)
    {
        var self = this;
        logger.log('debug', 'called create data..');

        if (id)
        {
            this.db.open(function (err, db)
            {
                if (err) callback(err, null);

                var collections = db.collection(self.docName);
                var objectId = new ObjectID(id);


                collections.findOneAndDelete({ _id : objectId }, function (err, res)
                {
                    logger.log('debug', 'removing data..');

                     var result = <IResult>{};
                     result.Success = res.ok ? true : false;
                     result.Message = "Data succesfully deleted";

                    

                    callback(err, result);
                });
            });

        } else {

            callback(new Error('Empty'), null);
        }
    }

    public BulkCreate(data: Array<TEntity>, callback: (errr: Error, item: IResult) => any)
    {
        var self = this;

        logger.log('debug', 'called bulk data..');

        if (data)
        {
            this.db.open(function (err, db)
            {
                if (err) callback(err, null);

                var collections = db.collection(self.docName);

                collections.insertMany(data, function (err, res)
                {
                    if (err) callback(err, null);

                    logger.log('debug', 'inserting bulk data..');
                 

                    var result = <IResult>{};
                    result.Entities = res.ops;
                    result.Success = res.result.ok ? true : false;
                    result.Message = "Bulk Data succesfully inserted";

                   

                    callback(err, result);

                });
            });
        } else {
            callback(new Error("Empty data.."), null);
        }
    }

    public BulkUpdate(data: Array<TEntity>, callback: (errr: Error, item: IResult) => any)
    {
        var self = this;

        logger.log('debug', 'called bulk data..');

        if (data)
        {
            this.db.open(function (err, db)
            {
                if (err) callback(err, null);

                var collections = db.collection(self.docName);

                collections.updateMany(data, function (err, res)
                {
                    logger.log('debug', 'updating bulk data..');

                   var result = <IResult>{};
                    result.Entities = res.ops;
                    result.Success = res.result.ok ? true : false;
                    result.Message = "Bulk Data succesfully Updated";

                  

                    callback(err, result);
                });
            });
        } else {
            callback(new Error("Empty data.."), null);
        }
    }

    public BulkDelete(data: Array<string>, callback: (errr: Error, item: IResult) => any)
    {
        var self = this;

        logger.log('debug', 'called bulk data..');

        if (data)
        {
            this.db.open(function (err, db)
            {
                if (err) callback(err, null);

                var collections = db.collection(self.docName);

                collections.deleteMany(data, function (err, res)
                {
                    logger.log('debug', 'deleting bulk data...');
                
                    var result = <IResult>{};
                    result.Success = res.result.ok ? true : false;
                    result.Message = "Data succesfully deleted";

                   
                    callback(err, result);
                });
            });
        } else {
            callback(new Error("Empty data.."), null);
        }
    }
}