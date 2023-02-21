import { Component, OnInit } from '@angular/core';
import { PasswordRecoveryFlow } from '@okta/okta-auth-js/lib/idx/flow';
import { Customer } from 'src/app/common/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customer: Customer = new Customer(CustomerService.id++,
    "","","","","",true,2,0)
  isCustomerAdded = false;


  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  addCustomer(): void {
    const data = {
      id: this.customer.id,
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      username: this.customer.username,
      password: this.customer.password,
      dateOfBirth: this.customer.dateOfBirth,
      enabled: this.customer.enabled,
      role: this.customer.role,
      rentalMade: this.customer.rentalMade
    }
    if (!data.firstName ||
      !data.lastName ||
      !data.username ||
      ! data.password  ||
      ! data.dateOfBirth ||
      data.role == 0) {
      alert('Please fill forms!');
      return;
  }

    this.customerService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.isCustomerAdded = true;
      },
      error => {
        console.log(error);
      });
  }

  // Reset on adding new
  newCustomer(): void {
    this.isCustomerAdded = false;
    this.customer = new Customer(CustomerService.id++,
      "","","","","",true,2,0)
  }

}
