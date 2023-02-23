import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.rentals)
    );
  }

  // Create new item
  getRentalById(id: any): Observable<any> {

    const rentalUrl = `${this.baseUrl}/${id}`
    return this.httpClient.get<Rental>(rentalUrl)
  }

  create(data: any): Observable<any> {
    console.log(`${data.id}    ${data.startDate}`)
    return this.httpClient.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  /*
  createWithRentedCar(rentedCarId: number) : Observable<any> {

    const newRental = new Rental(RentalService.id++, "inizio","fine", 1, rentedCarId);
    return this.httpClient.post(this.apiUrl, newRental).pipe(
      catchError(this.handleError)

    );

  }*/

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

interface GetResponse {
  _embedded: {
    rentals: Rental[]
  }
}
