import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Car } from 'src/app/common/car/car';
import { Customer } from 'src/app/common/customer/customer';
import { Rental } from 'src/app/common/rental/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {


  apiUrl: string = 'http://localhost:3000/rentals';
  baseUrl = 'http://localhost:8080/api/rentals';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  static id: number = 100;



  rentalsData: Rental[];

  constructor(private httpClient: HttpClient) { }

  // Show lists of item
  getRentals(): Observable<any> {
    return this.httpClient.get<Rental[]>(this.baseUrl).pipe(
      map(response => this.rentalsData = response)
    );
  }

  // Create new item
  getRentalById(id: any): Observable<any> {

    const rentalUrl = `${this.baseUrl}/${id}`
    return this.httpClient.get<Rental>(rentalUrl)
  }

  getRentedCar(id: any): Observable<any> {

    const carUrl =  `${this.baseUrl}/${id}/rentedCar`
    return this.httpClient.get<Car>(carUrl)
  }

  getReferredCustomer(id: any): Observable<any> {

    const customerUrl =  `${this.baseUrl}/${id}/referredCustomer`
    return this.httpClient.get<Customer>(customerUrl)
  }



  create(data: Rental): Observable<any> {

    console.log(`data nel create`)
    console.log(data.referredCustomer)
    return this.httpClient.post<Rental>(this.baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }


  // Edit/ Update
  editRental(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  deleteRental(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`).pipe(
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

interface GetResponse {
  _embedded: {
    rentals: Rental[]
  }
}
