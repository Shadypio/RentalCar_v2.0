import { Component, OnInit } from '@angular/core';
import { PasswordRecoveryFlow } from '@okta/okta-auth-js/lib/idx/flow';
import { Customer } from 'src/app/common/customer/customer';
import { Role } from 'src/app/common/role/role';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
})
export class CustomerCreateComponent implements OnInit {
  role: Role = new Role(3, "USER")
  customer: Customer = new Customer(
    CustomerService.id++,
    '',
    '',
    '',
    '',
    '',
    true,
    this.role,
    0
  );
  isCustomerAdded = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

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
      rentalMade: this.customer.rentalMade,
    };
    if (
      !data.firstName ||
      !data.lastName ||
      !data.username ||
      !data.password ||
      !data.dateOfBirth ||
      data.role.id == 0
    ) {
      alert('Please fill forms!');
      return;
    }

    this.customerService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.isCustomerAdded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Reset on adding new
  newCustomer(): void {
    this.isCustomerAdded = false;
    this.customer = new Customer(
      CustomerService.id++,
      '',
      '',
      '',
      '',
      '',
      true,
      this.role,
      0
    );
  }
}
