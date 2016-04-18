/// <reference path='../../_references.d.ts' />
'use strict';

import {Component, View, Inject, Input, NgZone, Optional} from 'angular2/core';
import {Router, RouterLink, LocationStrategy } from 'angular2/router';
import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';
import {Alert, TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {HTTP_PROVIDERS} from 'angular2/http';
import {TreeView} from './treeview/index';
import {Directory} from './treeview/directory';
import {CORE_DIRECTIVES} from 'angular2/common';

import {Category} from '../../models/category';


import {IEmailService,EmailService} from '../../services/emailService';
import {ICategoryService,CategoryService} from '../../services/categoryService';

@Component({
    selector: 'action-panel',   
    providers: [HTTP_PROVIDERS],
	directives: [TAB_DIRECTIVES, CORE_DIRECTIVES, TreeView, RouterLink],
	templateUrl: './src/components/common/action-panel.html'
})

export default class ActionPanel 
{ 
	location: LocationStrategy;
	node: Array<any>;
    categories: Array<Category>;
    directories: Array<any>;
    router: Router;  
    tabs : Array<any>;
    emailService : IEmailService;
    categoryService: ICategoryService;
	subscription: any;
	zone:NgZone;

    constructor(@Optional() router: Router, 
    	@Inject(EmailService) emailService : IEmailService,
    	@Inject(CategoryService) categoryService : ICategoryService) {
		this.router = router; 
        this.emailService = emailService;  
        this.categoryService = categoryService;
        this.zone = new NgZone({enableLongStackTrace: false});     

        this.categories = new Array<Category>();    

        this.getCategories();        
    }

    getCategories(){
    	var self = this;

    	this.categoryService.get({},'','').subscribe((response) => 
    		{
    			self.categories = response;
				self.categories.forEach(function (item){
						self.directories.push(new Directory(item.Name, item, item.SubCategory))
					});
    		});	
    }
    
    ngOnInit(){        		
    	var self = this;
    	
    	self.buildTabs();

        this.subscription = this.emailService.emailChangeEmit.subscribe(() => {
        		self.buildTabs();
            });        
    }

    buildTabs(){
    	var self = this;    	

		this.tabs = [];

    	var inboxCounts = 0, sentCount = 0, spamCount = 0, starredCount = 0, draftCount = 0, trashCount=0;

    	 this.emailService.getSummary().subscribe((response) => {

			if(response){
			    response.forEach((item) => {
			        switch (item.Status) {
			            case 0:
			                draftCount = item.count;
			                break;
			            case 1:
			                sentCount = item.count;
			                break;
			            case 2:
			                inboxCounts = item.count;
			                break;
			            case 3:
			                trashCount = item.count;
			                break;
			            case 4:
			                spamCount = item.count;
			                break;
			            case 5:
			                starredCount = item.count;
			                break;
			            default:
			                break;
			        }
			    });
			}

			 this.zone.run(() => {

			self.tabs =	self.tabs.concat(self.tabs, [
				                { title: 'Inbox (' + inboxCounts + ')'  , href: 'Inbox' },
				                { title: 'Sent (' + sentCount + ')' ,href: 'Sent' },
				                { title: 'Starred (' + starredCount +')', href: 'Starred' },
				                { title: 'Draft (' + draftCount +')', href: 'Draft' },
				                { title: 'Trash (' + trashCount +')', href: 'Trash' },
				                { title: 'Spam (' + spamCount +')', href: 'Spam' }
				            ]);
            });
		});
    }

    public onTabSelect = function(tab) {
		this.router.navigate([tab.href]);
	};

	 public removeTabHandler(/*tab:any*/):void {
	    console.log('Remove Tab handler');
	 };

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
