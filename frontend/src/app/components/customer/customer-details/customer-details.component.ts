import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Customer } from 'src/app/common/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  /*

  isAuthenticated: boolean;
  userFullName: string = '';
  userEmail: string = '';
  zoneinfo: string = '';

  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  authState : any;
  ngOnInit() {
    // Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    )
  }

  getUserDetails() {

    if (this.isAuthenticated) {

      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;
          this.userEmail = res.email as string;
          this.zoneinfo = res.zoneinfo as string;
        }
      );
    }
  } */

  customerFound: Customer

  constructor(private route: ActivatedRoute,
    private customerService: CustomerService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.loadCustomer();
    })

  }

  loadCustomer() {

    const customerId = +this.route.snapshot.paramMap.get('id')!;

    this.customerService.getCustomerById(customerId).subscribe(
      data => {
        if(data)
          this.customerFound = data;
      }

    )
  }

}
