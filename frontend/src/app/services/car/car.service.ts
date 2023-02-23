import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Car } from 'src/app/common/car/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {


  apiUrl: string = 'http://localhost:3000/cars';
  baseUrl = 'http://localhost:8080/api/cars';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  carsData: Car[];
  static id: number = 100;
  // private baseUrl = "http://localhost:8080/api/cars"

  constructor(private httpClient: HttpClient) { }

  // Show lists of item
  getCars(): Observable<any> {
    /*
    return this.httpClient.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );*/
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.cars)
    );
  }

  // Create new item
  getCarById(id: any): Observable<any> {
    /*
    return this.httpClient.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );*/
    const carUrl = `${this.baseUrl}/${id}`
    return this.httpClient.get<Car>(carUrl)
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit / Update
  editCar(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  deleteCar(id: any): Observable<any> {
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

interface GetResponse {
  _embedded: {
    cars: Car[]
  }
}

