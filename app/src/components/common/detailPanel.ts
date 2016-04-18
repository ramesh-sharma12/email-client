/// <reference path='../../_references.d.ts' />
'use strict';

import {Component, View,Inject, Optional} from 'angular2/core';
import {Email} from '../../models/email';
import {Router, RouteConfig, RouteParams, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_PROVIDERS, CanActivate} from 'angular2/router'
import {IEmailService,EmailService} from '../../services/emailService';

@Component({
    selector: 'detail-panel',
    inputs: ['email'],
    directives: [],
    templateUrl: './src/components/common/detail-panel.html'
})

export default class DetailPanel
 { 
     emailId : string;
     params: RouteParams;
     email : Email;
     emailService : IEmailService;

	constructor(@Inject(EmailService) emailService : IEmailService, @Optional() params: RouteParams){
		this.emailService = emailService;
        this.params = params;		
	}	   
    
    ngOnInit() {        
        this.emailId = this.params.get('id');
        if(this.emailId){
        	this.emailService.getEmailById(this.emailId).subscribe((response) => this.email = response);
        }        
    }
}