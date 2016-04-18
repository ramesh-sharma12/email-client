/// <reference path='../../_references.d.ts' />

import { Component, View , Inject } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES,FORM_PROVIDERS } from 'angular2/common';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import {User} from '../../models/user';
import {AccountService, IAccountService} from '../../services/accountService';
import {IAccountApiProxy,AccountApiProxy} from '../../apiProxies/accountApiProxy';

@Component({
  selector: 'register',
  providers: [FORM_PROVIDERS],
  templateUrl: './register.html'
})

export default class Register {
  service : IAccountService;

  constructor(@Inject(AccountService) service : IAccountService ) {
    this.service = service;
  }

  signup(event) {
    event.preventDefault();
    
    var user = new User();

    this.service.register(user)
      .subscribe(
        response => {         
          //this.router.parent.navigateByUrl('/home');
        },
        error => {
            console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
   // this.router.parent.navigateByUrl('/login');
  }

}
