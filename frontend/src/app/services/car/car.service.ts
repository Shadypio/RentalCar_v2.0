import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Car } from 'src/app/common/car/car';
import { Rental } from 'src/app/common/rental/rental';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  // apiUrl: string = 'http://localhost:3000/cars';
  baseUrl = 'http://localhost:8080/api/cars';
  carsData: Car[];
  static id: number = 100;

  constructor(private httpClient: HttpClient) {}

  // Show lists of item
  getCars(): Observable<any> {
    return this.httpClient
      .get<Car[]>(this.baseUrl)
      .pipe(map(response => this.carsData = response));
  }

  getCarById(id: any): Observable<any> {
    const carUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Car>(carUrl);
  }

  getRentalMade(id: any): Observable<any> {
    const rentalUrl = `${this.baseUrl}/${id}/rental`;
    return this.httpClient.get<Rental>(rentalUrl);
  }

  // Create new item
  create(data: any): Observable<any> {
    return this.httpClient
      .post(this.baseUrl, data)
      .pipe(catchError(this.handleError));
  }

  // Edit / Update
  editCar(id: any, data: any): Observable<any> {
    return this.httpClient
      .put(`${this.baseUrl}/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  // Delete
  deleteCar(id: any): Observable<any> {
    const carUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(carUrl);
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

interface GetResponse {
  _embedded: {
    cars: Car[];
  };
}
