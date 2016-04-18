/// <reference path='../../_references.d.ts' />

import { Component, View , Inject } from 'angular2/core';

import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, HTTP_PROVIDERS } from 'angular2/http';


import {AccountService, IAccountService} from '../../services/accountService';
import {IAccountApiProxy,AccountApiProxy} from '../../apiProxies/accountApiProxy';

@Component({
  selector: 'logout'
})

export default class Logout {
  service : IAccountService;
  userName : string;
  password : string;

  constructor(@Inject(AccountService) service : IAccountService ) {
    this.service = service;
  }

  signup(event) {
    event.preventDefault(); 


    this.service.logOff()
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
    //this.router.parent.navigateByUrl('/login');
  }

}
