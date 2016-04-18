/// <reference path='_models.d.ts' />

module models
{
    export class Category
    {
         Id: number;
         Name: string;
         SubCategory : Array<Category>;
    }
}

export = models;