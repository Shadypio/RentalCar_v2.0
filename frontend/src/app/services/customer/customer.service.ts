import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Customer } from 'src/app/common/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  apiUrl: string = 'http://localhost:3000/customers';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  customersData: Customer[];
  static id: number = 100;

  constructor(private httpClient: HttpClient) { }

  // Show lists of item
  getCustomers(): Observable<any> {
    return this.httpClient.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCustomerById(id: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getCustomerByUsernamePassword(username: string, password: string): Observable<any> {
    console.log(`${this.apiUrl}?username=${username}&password=${password}`)
    return this.httpClient.get(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      catchError(this.handleError)
    );
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit / Update
  editCustomer(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  deleteCustomer(id: any): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}
