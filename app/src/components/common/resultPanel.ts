/// <reference path='../../_references.d.ts' />

'use strict';

import {Component, View, Inject, Optional} from 'angular2/core';
import {Router, RouterLink, LocationStrategy, RouteParams } from 'angular2/router';
import {NgFor, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {IEmailService,EmailService} from '../../services/emailService';
import {Email} from '../../models/email';

@Component({
    selector: 'result-panel',
    inputs: ['emails'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgFor, RouterLink],
    templateUrl: './src/components/common/result-panel.html'
})

export default class ResultPanel {	
	emails : Array<Email>;
    selectedEmail : Email;
	router : Router;

    constructor(@Inject(EmailService) emailService : IEmailService, @Optional() router : Router) {    	
    	this.router = router;
		this.emails = Array<Email>();       		
    } 

    getDetails(email : Email){
        var url = this.getEmailType(email.Status) + 'Detail';
        this.router.navigate( [url, { id: email.Id }]  );
    }

    getEmailType (type) : string{
        var page : string = "";

        switch (type) {
            case 0:
                page = "Draft";
                break;
           
            case 1:
                page = "Sent";
                break;
            case 2:
                page = "Inbox";
                break;
            case 3:
                page = "Trash";
                break;
            case 4:
                page = "Spam";
                break;
            case 5:
                page = "Starred";
                break;
            
            default:
                page = "Inbox"
                break;

                           
        }
        return page;   
    }
}