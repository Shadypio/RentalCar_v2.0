import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Customer } from 'src/app/common/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  /*

  private customerInSession: Customer;
  private isAuthenticated = false;

  login(customerLogged: Customer) {
    this.customerInSession = customerLogged;
    this.isAuthenticated = true;
  }

  logout() {
    this.customerInSession = undefined!
    this.isAuthenticated = false;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }


  isAdmin() {
    if (this.customerInSession.role?.id === 1)
      return true;
    else
      return false;
  }

  getCurrentUserUsername() {
    if(this.customerInSession)
      return this.customerInSession.username
    return
  }

  getCurrentUserName() {
    if(this.customerInSession)
      return this.customerInSession.firstName + this.customerInSession.lastName
    return
  }

  getCurrentUserId() {
    if(this.customerInSession)
      return this.customerInSession.id
    return
  } */

  authenticate(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<Customer>('http://localhost:8080/api/customers/validateLogin',{headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        let authString = 'Basic ' + btoa(username + ':' + password);
        sessionStorage.setItem('basicauth', authString);
        return userData;
       }
     )

    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }


}
