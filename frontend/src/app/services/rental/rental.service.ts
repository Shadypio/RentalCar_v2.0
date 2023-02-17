import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Rental } from 'src/app/common/rental/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private _jsonURL = '../assets/rentals.json';
  rentalsData: Rental[];

  constructor(private httpClient: HttpClient) {
    this.getJSON().subscribe(data => {
      this.rentalsData = data;
     });
  }

  public getJSON(): Observable<any> {
    return this.httpClient.get(this._jsonURL);
  }

  getRentals(): Observable<Rental[]> {
    return this.httpClient.get(this._jsonURL).pipe(
      map(response => this.rentalsData)
    )
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

  create(newRental: Rental): Observable<any> {

    // to fix
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })


    };


    return this.httpClient.post<Rental>(this._jsonURL, newRental, httpOptions).pipe(

      map(response => {
        console.log(`rentals ${this.rentalsData[0].id}`)
        this.rentalsData.push(response);
        console.log(`rentals ${this.rentalsData}`)
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }


  deleteRental(id: any): Observable<any> {
    return this.httpClient.delete(`${this._jsonURL}/${id}`).pipe(
      map(response => this.rentalsData)
    );
  }

  editRental(id: any) {
    throw new Error('Method not implemented.');
  }


}
