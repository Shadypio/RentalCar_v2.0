import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Customer } from 'src/app/common/customer/customer';
import { CustomerService } from '../customer/customer.service';

export class User{
  constructor(
    public status:string,
     ) {}

}

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  constructor(private httpClient:HttpClient,
              private customerService: CustomerService,
              private route: Router) { }


  customerFound: any;

  authenticate(username: string, password: string) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate',{username,password}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        let tokenStr= 'Bearer '+userData.token;
        sessionStorage.setItem('token', tokenStr);

        return userData;
       }
     )

    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')

    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

  isUserAdmin() {

    const role = sessionStorage.getItem("role")

    if(role === "ADMIN")
      return true;
    else
      return false;

  }

  getUserId() {
    return sessionStorage.getItem("idUser")
  }

  navigateToPersonalProfile() {
    const id = this.getUserId();
    this.route.navigateByUrl(`customers/${id}`);
  }


}
