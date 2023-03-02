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

  username = ''
  password = ''
  invalidLogin = false
  customer: any;

  constructor(private router: Router,
    private loginservice: AuthService,
    private customerService: CustomerService) { }

  ngOnInit() {
  }


  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate([''])
        this.getCustomer(this.username);
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true

      }

    )
    );

  }

  getCustomer(username: string) {
    this.customerService.getCustomerByUsername(username).subscribe(
      data => {
        this.customer = data;
        sessionStorage.setItem('idUser', this.customer.id)
        if(this.customer.role.id === 1)
          sessionStorage.setItem('role', "ADMIN");
        else
          sessionStorage.setItem('role', "USER")
      }
    )
  }




}
