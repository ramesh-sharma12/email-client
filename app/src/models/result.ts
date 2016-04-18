/// <reference path='_models.d.ts' />

module models
{
    export interface Result
    {
		Success: boolean;
		Message: string;
		Entities: any;
    }
}

export = models;