/// <reference path='../../_references.d.ts' />
'use strict';

import {Inject} from 'angular2/core';
import {IEmailService,EmailService} from '../../services/emailService';
import {BaseInbox} from './base';

export default class Trash extends BaseInbox { 

	constructor(@Inject(EmailService) emailService : IEmailService){
		super(emailService);		
	}
    
    ngOnInit() {
        this.getData(3);
    }
}