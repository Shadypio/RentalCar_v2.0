import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Customer } from 'src/app/common/customer/customer';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  customerLoggedArray: Customer[];
  customerLogged: Customer;

  constructor(
    private router: Router,
    private authService: AuthService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {}

  login() {
    console.log(`${this.username} and ${this.password}`);

    this.customerService
      .getCustomerByUsernamePassword(this.username, this.password)
      .subscribe((data) => {
        if (data) {
          this.customerLoggedArray = data;
          this.customerLogged = this.customerLoggedArray[0];
          if (this.customerLogged != undefined)
            this.redirectAccount(this.customerLogged.id);
        }
      });
  }

  redirectAccount(id: number) {
    this.authService.login(this.customerLogged);
    console.log(`is admin ${this.authService.isAdmin()}`);
    this.router.navigateByUrl(`/customers/${id}`);
  }
}
