import { Component, OnInit } from '@angular/core';
import { PasswordRecoveryFlow } from '@okta/okta-auth-js/lib/idx/flow';
import { Customer } from 'src/app/common/customer/customer';
import { Role } from 'src/app/common/role/role';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RoleService } from 'src/app/services/role/role.service';
import { MyButtonConfig } from '../../my-button/config/my-button-config';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
})
export class CustomerCreateComponent implements OnInit {

  constructor(private customerService: CustomerService,
              private roleService: RoleService) {}


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
  roles : any;
  addCustomerMessage = "Add New Customer";
  createButton: MyButtonConfig = new MyButtonConfig(
    'btn btn-success',
    'Create',
    'fa fa-check'
  );
  createMoreButton: MyButtonConfig = new MyButtonConfig(
    'btn btn-success',
    'Add More',
    'fa fa-plus'
  );

  ngOnInit(): void {
    /*
    this.roleService.getRoleById(2).subscribe((data) => {
      if(data) {
        this.customer.role = data;
      }
  });*/

    this.roleService.getRoles().subscribe(
      (data) =>{
        if(data){
          this.roles = data;
        }
      }
    )

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

    console.log("data create")
    console.log(this.customer.username)
    console.log(this.customer.role?.id + "-" + this.customer.role?.roleName)
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
      null,
      null
    );
  }
}
