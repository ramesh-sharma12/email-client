/// <reference path='../../_references.d.ts' />
'use strict';


import {Component, View, ElementRef, Inject,ChangeDetectionStrategy,Input,Output, EventEmitter} from 'angular2/core';
import {NgControl, FORM_PROVIDERS, FORM_DIRECTIVES, CORE_DIRECTIVES, NgIf, NgFor} from 'angular2/common';
import {Alert} from 'ng2-bootstrap';

import {HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs';
import {CKEditor} from 'ng2-ckeditor';

import {BaseInbox} from './base';
import {Email} from '../../models/email';
import {Status} from '../../models/status';
import {Result} from '../../models/result';
import {ObjectHelper} from '../../utilities/objectHelper';

import {EmailService, IEmailService} from '../../services/emailService';
import {IEmailApiProxy,EmailApiProxy} from '../../apiProxies/emailApiProxy';

//import CKEDITOR  = require('ckeditor'); 

@Component({
    selector: 'component-1',     
    directives: [CKEditor, FORM_DIRECTIVES, CORE_DIRECTIVES, Alert , NgIf, NgFor],
    providers: [HTTP_PROVIDERS, FORM_PROVIDERS],
    templateUrl: './src/components/inbox/compose.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Compose
 {
    public emailService : IEmailService;
    public emails: Array<Email>;
    public email: Email;

 	ckeditorContent : any;
 	ckeditor : CKEditor;
 	config : CKEDITOR.config; 
  @Input() alerts: Array<Object>; 

   constructor(@Inject(EmailService) emailService : IEmailService) {

    this.emailService = emailService;

   	this.configureCkEditor();
    this.ckeditorContent = "";
    this.alerts = [];    
    this.emails = new Array<Email>();
    this.email = new Email();
  }

   ngOnInit() {   

     var self = this;


      this.email.FromUser = "ramesh.sharma@gmail.com";
      this.email.Message = "";
      this.email.ToUser = null;
      this.email.Id = null;
      this.email.CC = '';
      this.email.BCC = '';
      this.email.ReceivedOn = new Date();
      this.email.SentOn = new Date();
      this.email.Status = Status.Draft;
      this.email.Type = 'Important';
      this.email.Read = false;
      this.email.HasAttachments = false;  

      //this.draftEmail = this.email;

     var editor = CKEDITOR.replace('editor1' , this.config);

      CKEDITOR.basePath = '/libs/ckeditor/';

      editor.on('blur', function( evt ) {        
        self.ckeditorContent = evt.editor.getData();      

        setTimeout(() => {
          self.onSaveDraft();         
        }, 1000);
      });       
    }

    configureCkEditor() {

      this.config = {
                        toolbar : 'customToolbar', /* this does the magic */
                       // toolbarLocation : 'bottom',
                        toolbarCanCollapse : true,
                        toolbarGroups : [                         
                          { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                          { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
                          { name: 'styles', groups: [ 'styles' ] },
                          { name: 'colors', groups: [ 'colors' ] },
                          { name: 'about', groups: [ 'about' ] },
                          { name: 'clipboard', groups: ['clipboard', 'undo'] },
                          { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                          { name: 'links', groups: ['links'] },
                          { name: 'insert', groups: ['insert'] },
                          { name: 'forms', groups: ['forms'] },
                          { name: 'tools', groups: ['tools'] },
                          { name: 'document', groups: ['mode', 'document', 'doctools'] },
                          { name: 'others', groups: ['others'] }
                        ],
                        uiColor : '#DFDFDF',    
                        height: 300, 
                        removePlugins : 'elementspath',                                               
                        removeButtons : 'Subscript,Superscript,Cut,Undo,Source,Strike,About,Anchor,Copy,Paste,PasteText,PasteFromWord,Redo,HorizontalRule'
                    };
    }

    onSendEmail() {     
       var self = this;

        this.alerts = [];
        this.email.Status = Status.Sent;  
        this.email.Message = this.ckeditorContent;
        this.email.SentOn = new Date();

        this.emailService.send(this.email)
            .subscribe((response) => {
                self.alerts.push({ msg: 'Message sent succesfully', type: 'success', closable: true });
            }, (err) => {
                self.alerts.push({ msg: 'Unable to sent message', type: 'danger', closable: true });
            });

    }

    onSaveDraft() 
    {  
       var self = this;
       self.alerts = [];
      
        this.email.Status = Status.Draft;
        this.email.Message = this.ckeditorContent;

        this.emailService.saveDraft(this.email)
                .subscribe((response) => {
                    if (response) 
                    {
                          self.alerts.push({ msg: 'Draft saved succesfully', type: 'success', closable: true });
                          if (response.Entities) {
                            self.email.Id = response.Entities._id;
                          }  
                          self.emailService.emailChangeEmit.emit(null);                                               
                    }
                  }, (err) => {
                      self.alerts.push({ msg: 'Unable to save draft', type: 'danger', closable: true });
                  });
    } 

    onDiscardEmail()
    {
         var self = this;

          this.emailService.delete(this.email.Id)
                .subscribe((response) => {
                    if (response) 
                    {
                          self.alerts.push({ msg: 'Draft saved succesfully', type: 'success', closable: true });
                          if (response.Entities) {
                            self.email.Id = response.Entities._id;
                          }   
                    }
                  }, (err) => {
                      self.alerts.push({ msg: 'Unable to save draft', type: 'danger', closable: true });
                  });

         //this.router.navigate(['Inbox']);
    }

    public closeAlert(i:number):void {
      this.alerts.splice(i, 1);
    }
}
