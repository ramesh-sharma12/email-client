/// <reference path='../../_references.d.ts' />
'use strict';

import {Component,Inject} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import DetailPanel from '../common/DetailPanel';
import ResultPanel from '../common/resultPanel';

import {IEmailService,EmailService} from '../../services/emailService';
import {Email} from '../../models/email';

@Component({
    selector: 'component-1',
    templateUrl: './src/components/inbox/index.html?v=<%= VERSION %>',
	directives: [DetailPanel, ResultPanel, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class BaseInbox{ 
	detailPanel: DetailPanel;
	resultPanel: ResultPanel;

    public emailService : IEmailService;
    public emails: Array<Email>;
    public email: Email;

	constructor(@Inject(EmailService) emailService : IEmailService){
		this.emailService = emailService;

		this.detailPanel = new DetailPanel(emailService,null);
		this.resultPanel = new ResultPanel(emailService,null);

		
		this.emails = new Array<Email>();
		this.email = new Email();
	}
	
	getData(status : number): void {      
		var self = this;

		this.emailService.getEmails({Status : status}, '', '')
				.subscribe((response) => {			
					self.email = response[0];
					self.emails = response;
		        });
    }
}