import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  customerFound: Customer;

  loadCustomerSubscription: any

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private rentalService: RentalService,
  ) {}

  customerId: number;

  ngOnInit() {
    this.loadCustomerSubscription = this.route.paramMap.subscribe(() => {
      this.loadCustomer();
    });
  }

  loadCustomer() {
    this.customerId = +this.route.snapshot.paramMap.get('id')!;

    this.customerService.getCustomerById(this.customerId).subscribe((data) => {
      if (data) {
        this.customerFound = data;

        this.checkRentalMade();
      }
    });
  }


  checkRentalMade() {
    this.customerService.getRentalMade(this.customerId).subscribe((data) => {
      if(data) {
        this.customerFound.rentalMade = data;
        this.checkRentedCar(this.customerFound.rentalMade?.id!);
      }
    });
  }

  checkRentedCar(id: number) {

    this.rentalService.getRentedCar(id).subscribe((data) => {
      if(data) this.customerFound.rentalMade!.rentedCar = data
    })
  }

  ngOnDestroy(): void {
    this.loadCustomerSubscription.unsubscribe();
  }
}
