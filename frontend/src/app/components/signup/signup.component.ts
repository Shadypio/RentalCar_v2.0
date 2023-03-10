import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Customer } from 'src/app/common/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RoleService } from 'src/app/services/role/role.service';
import { MyButtonConfig } from '../my-button/config/my-button-config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private roleService: RoleService,
    private router: Router
  ) {}

  customer: Customer = new Customer(
    CustomerService.id++,
    '',
    '',
    '',
    '',
    '',
    true,
    null,
    null
  );
  isCustomerAdded = false;
  fillForm = false;
  errorOccurred = false;
  signUpMessage = "Please Fill the Sign Up Form";
  signUpButton: MyButtonConfig = new MyButtonConfig(
    'login-button-2',
    'Sign Up',
    'fa fa-user'
  );

  ngOnInit(): void {
    this.roleService.getRoleById(2).subscribe((data) => {
      if (data) {
        this.customer.role = data;
      }
    });
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
      rentalMade: this.customer.rentalMade,
    };
    if (
      !data.firstName ||
      !data.lastName ||
      !data.username ||
      !data.password ||
      !data.dateOfBirth
    ) {
      this.fillForm = true;
      return;
    }


    this.customerService.register(data).subscribe(
      (response) => {
        console.log(response);
        this.isCustomerAdded = true;
      },
      (error) => {
        console.log(error);
        this.errorOccurred = true;
      }
    );
  }

  loginRedirect() {
    this.router.navigateByUrl("/login")
  }
}
