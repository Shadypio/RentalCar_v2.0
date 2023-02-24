import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Customer } from 'src/app/common/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RentalService } from 'src/app/services/rental/rental.service';
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
    private rentalService: RentalService,
    private roleService: RoleService
  ) {}

  customerId: number;

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.loadCustomer();
    });
  }

  loadCustomer() {
    this.customerId = +this.route.snapshot.paramMap.get('id')!;

    this.customerService.getCustomerById(this.customerId).subscribe((data) => {
      if (data) {
        this.customerFound = data;
        this.checkRole();
        this.checkRentalMade();
      }
    });
  }

  checkRole() {
    this.customerService.getRole(this.customerId).subscribe((data) => {
      if(data) this.customerFound.role = data;
    });
  }

  checkRentalMade() {
    this.customerService.getRentalMade(this.customerId).subscribe((data) => {
      if(data) {
        this.customerFound.rentalMade = data;
        this.checkRentedCar();
      }
    });
  }

  checkRentedCar() {
    this.rentalService.getRentedCar(this.customerFound.rentalMade?.id).subscribe((data) => {
      if(data) this.customerFound.rentalMade!.rentedCar = data
    })
  }
}
