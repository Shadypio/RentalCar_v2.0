import { Injectable } from '@angular/core';
import { Customer } from 'src/app/common/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private customerInSession: Customer;
  private isAuthenticated = false;

  login(customerLogged: Customer) {
    this.customerInSession = customerLogged;
    this.isAuthenticated = true;
    localStorage.setItem('currentUser', JSON.stringify(this.customerInSession))
  }

  logout() {
    this.customerInSession = undefined!
    this.isAuthenticated = false;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
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
  }

  isAdmin() {
    if (this.customerInSession.role === 1)
      return true;
    else
      return false;
  }

}