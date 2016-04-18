
/// <reference path='_models.d.ts' />

'use strict'

module models {
    export enum Status {
    	Draft = 0,
        Sent = 1,
        Received = 2,
        Deleted = 3,        
        Spam = 4,
        Starred = 5
    }
}

export = models;
