import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Customer } from 'src/app/common/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  customerFound: Customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.loadCustomer();
    });
  }

  loadCustomer() {
    const customerId = +this.route.snapshot.paramMap.get('id')!;

    this.customerService.getCustomerById(customerId).subscribe((data) => {
      if (data) {
        this.customerFound = data;
        this.roleService.getRoleById(1).subscribe((data) => {
          if(data)
            this.customerFound.role = data;
        });
        console.log(`roleeee ${this.customerFound.role}`)
      }
    });
  }
}
