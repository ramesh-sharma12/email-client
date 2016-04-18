
/// <reference path="../../typings/main.d.ts"/>
/// <reference path='./_references.d.ts' />

import {Component, View, bind, provide, Injector, Input, EventEmitter} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {FORM_PROVIDERS} from 'angular2/common';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';

import {RouteConfig,
        RouterOutlet,
        AuxRoute,
        ROUTER_DIRECTIVES,
        ROUTER_PROVIDERS} from 'angular2/router';

import Inbox from './components/inbox/index';
import Sent from './components/inbox/Sent';
import Draft from './components/inbox/Draft';
import Trash from './components/inbox/Trash';
import Starred from './components/inbox/Starred';
import Spam from './components/inbox/Spam';

import Login from './components/account/login';
import Logout from './components/account/logout';
import Register from './components/account/register';

import AboutUs from './components/About/index';
import Profile from './components/profile/index';
import Settings from './components/settings/index';
import Compose from './components/inbox/Compose';

import {IEmailService,EmailService} from './services/emailService';
import {IEmailApiProxy,EmailApiProxy} from './apiProxies/emailApiProxy';
import {AccountService, IAccountService} from './services/accountService';
import {IAccountApiProxy,AccountApiProxy} from './apiProxies/accountApiProxy';
import {ProfileService, IProfileService} from './services/profileService';
import {IProfileApiProxy,ProfileApiProxy} from './apiProxies/profileApiProxy';
import {CategoryService, ICategoryService} from './services/categoryService';
import {ICategoryApiProxy,CategoryApiProxy} from './apiProxies/categoryApiProxy';


import {BaseComponent} from './components/baseComponent';

@Component({
  selector: 'my-app',
  templateUrl: './src/app.html?v=<%= VERSION %>',
  providers: [
      ROUTER_PROVIDERS, 
      FORM_PROVIDERS, 
      HTTP_PROVIDERS , 
      EmailService, 
      EmailApiProxy, 
      AccountService,
      AccountApiProxy,
      CategoryService, 
      CategoryApiProxy,
      ProfileService, 
      ProfileApiProxy
  ],
  directives: [ROUTER_DIRECTIVES, BaseComponent,RouterOutlet]
})

@RouteConfig([
  { path: '/', component: Inbox, name: 'Home' }, 
  { path: '/login', component: Login, name: 'Login' }, 
  { path: '/logout', component: Logout, name: 'Logout' }, 
  { path: '/register', component: Register, name: 'Register' }, 
  { path: '/about', component: AboutUs, name: 'About' },  
  { path: '/inbox', component: Inbox, name: 'Inbox' }, 
  { path: '/sent', component: Sent, name: 'Sent' }, 
  { path: '/compose', component: Compose, name: 'Compose' }, 
  { path: '/draft', component: Draft, name: 'Draft' }, 
  { path: '/trash', component: Trash, name: 'Trash' }, 
  { path: '/spam', component: Spam, name: 'Spam' }, 
  { path: '/starred', component: Starred, name: 'Starred' }, 
  { path: '/inbox/:id', component: Sent, name: 'InboxDetail' }, 
  { path: '/sent/:id', component: Sent, name: 'SentDetail' }, 
  { path: '/draft/:id', component: Draft, name: 'DraftDetail' }, 
  { path: '/trash/:id', component: Trash, name: 'TrashDetail' }, 
  { path: '/spam/:id', component: Spam, name: 'SpamDetail' }, 
  { path: '/starred/:id', component: Starred, name: 'StarredDetail' }, 
  { path: '/profile', component: Profile, name: 'Profile' },
  { path: '/settings', component: Settings, name: 'Settings' }
])

export class MainApp
 {   

  constructor(){ 

  }
  
  ngOnInit(){
   
  }
}

bootstrap(MainApp, 
      [
        EmailService, EmailApiProxy, 
        AccountService, AccountApiProxy,
        ProfileService,  ProfileApiProxy, 
        ProfileService, ProfileApiProxy,
        CategoryService, CategoryApiProxy
      ]
    );