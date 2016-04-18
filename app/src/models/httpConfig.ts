/// <reference path='../_references.d.ts' />

module models
{
    export interface IHttpConfig
    {
    	 Url : string;
    	 Method: string;
         Controller: string;
         Action: string;
         Params: any;
         Data: any;
    }

    export class HttpConfig implements IHttpConfig
    {
    	Url : string;
    	Method : string;	
        Controller: string;
        Action: string;
        Params: any;
        Data: any;
    }
}

export = models;