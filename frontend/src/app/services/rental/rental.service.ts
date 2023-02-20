import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Rental } from 'src/app/common/rental/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {



  //private _jsonURL = '../assets/rentals.json';
  /*
  private _jsonURL = 'http://localhost:3000/rentals'

  rentalsData: Rental[];

  constructor(private httpClient: HttpClient) {
    this.getJSON().subscribe(data => {
      this.rentalsData = data;
    });
  }

  public getJSON(): Observable<any> {
    return this.httpClient.get(this._jsonURL);
  }

  getRentals(): Observable<any> {*/
    /*
    return this.httpClient.get(this._jsonURL).pipe(
      map(response => this.rentalsData)
    )*/
    /*
    return this.httpClient.get(this._jsonURL).pipe(
      catchError(this.handleError)
    );
  }

  getRentalById(rentalId: number) {
    const rental = this.rentalsData.find(rental => rental.id === rentalId);
    console.log(`trovata ${rental?.id}, ${rental?.startDate}`)
    return of(rental);
  }

  getRentalsByCustomer(customerId: number) {
    // need to adjust
    const rentals = this.rentalsData.find(rental => rental.referredCustomer === customerId);
    return of(rentals);
  }

  create(newRental: Rental){


  }


  deleteRental(id: any): Observable<any> {
    console.log("aaaa")
    this.httpClient.delete(`${this._jsonURL}/${id}`).pipe(
      catchError(this.handleError)
    );
    this.getJSON().subscribe(data => {
      this.rentalsData = data;
     });
     return this.getRentals()
  }

  editRental(id: any) {
    throw new Error('Method not implemented.');
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
  }; */

  apiUrl: string = 'http://localhost:3000/rentals';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  rentalsData: Rental[];

  constructor(private httpClient: HttpClient) { }

  // Show lists of item
  getRentals(): Observable<any> {
    return this.httpClient.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Create new item
  getRentalById(id: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(data: any): Observable<any> {
    console.log(`${data.id}    ${data.startDate}`)
    return this.httpClient.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  createWithRentedCar(rentedCarId: number) : Observable<any> {

    const newRental = new Rental(11, "inizio","fine", 1, rentedCarId);
    return this.httpClient.post(this.apiUrl, newRental).pipe(
      catchError(this.handleError)

    );

  }

  // Edit/ Update
  editRental(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  deleteRental(id: any): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Search By Name
  filterByTitle(title: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}?title_like=${title}`).pipe(
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
