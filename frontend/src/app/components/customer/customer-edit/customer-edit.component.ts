import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/common/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit {
  customerFound: Customer;
  isCustomerEdited = false;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.loadCustomer();
    });
  }

  loadCustomer() {
    const customerId = +this.route.snapshot.paramMap.get('id')!;

    this.customerService.getCustomerById(customerId).subscribe((data) => {
      if (data) this.customerFound = data;
    });
  }

  editCustomer() {
    const data = {
      id: this.customerFound.id,
      firstName: this.customerFound.firstName,
      lastName: this.customerFound.lastName,
      username: this.customerFound.username,
      password: this.customerFound.password,
      dateOfBirth: this.customerFound.dateOfBirth,
      enabled: this.customerFound.enabled,
      role: this.customerFound.role,
      rentalMade: this.customerFound.rentalMade,
    };
    if (
      !data.firstName ||
      !data.lastName ||
      !data.username ||
      !data.password ||
      !data.dateOfBirth
    ) {
      alert('Please fill forms!');
      return;
    }

    this.customerService.editCustomer(data.id, data).subscribe(
      (response) => {
        console.log(response);
        this.isCustomerEdited = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
