import { Component, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Inject } from '@angular/core';
import OktaSignIn from '@okta/okta-signin-widget'

import myAppConfig from '../../config/my-app-config'
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Customer } from 'src/app/common/customer/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*

  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      base: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
   }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
      (response: any) => {
        if(response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
      );
  }
  */

  username = '';
  password = '';
  customerLoggedArray: Customer[];
  customerLogged: Customer;

  constructor(private router: Router,
              private customerService: CustomerService) {}

  ngOnInit(): void {



  }

  login() {
    console.log(`${this.username} and ${this.password}`)

    this.customerService.getCustomerByUsernamePassword(this.username, this.password).subscribe(
      data => {
        if(data){
          this.customerLoggedArray = data;
          this.customerLogged = this.customerLoggedArray[0];
          if(this.customerLogged!=undefined)
            this.redirectAccount(this.customerLogged.id)
        }


      }

    )


  }

  redirectAccount(id: number) {
    this.router.navigateByUrl(`/customers/${id}`)
  }


}
