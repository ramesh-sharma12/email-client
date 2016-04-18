/// <reference path='_models.d.ts' />

module models
{
    export class History
    { 

         Id: number;
         Name: string;
         Password: string;
         LogonName: string;
         Status: string;
         BadAttempts: number;
         LastLogonDate: string;
         ModifiedDate: string;
         CreatedDate: string;
         Timeout: number;
         roleId: number;
         PageSize: number;
         UserType: number;      
    }
}
export = models;