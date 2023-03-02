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
  /*
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
  }*/



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

        if(this.customer.role.id === 1)
          sessionStorage.setItem('role', "ADMIN");
        else
          sessionStorage.setItem('role', "USER")
      }
    )
  }

  /*checkLogin() {
    this.userService.getLoggedUser(this.username!).subscribe(user =>{
      this.user = user;
      if(this.user!.typeUser == true){
        sessionStorage.setItem('User_Type', 'CUSTOMER')
      }else if(this.user!.typeUser ==false){
        sessionStorage.setItem('User_Type', 'ADMIN')
      }
      this.loginService.authenticate(this.username!, this.password!).subscribe(
        () => {
          if(this.user!.typeUser == true){
            this.router.navigate(['my-bookings'])
            this.invalidLogin = false
          }else if(this.user!.typeUser ==false){
            this.router.navigate(['list-of-users'])
            this.invalidLogin = false
          }
        },
        () => {
          this.invalidLogin = true
        }
      )
    });

  }*/


}
