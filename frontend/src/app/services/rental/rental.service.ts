import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Rental } from 'src/app/common/rental/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {


  private _jsonURL = '../assets/rental.json';
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
    return of(rental);
  }

  getRentalsByCustomer(customerId: number) {
    // need to adjust
    const rentals = this.rentalsData.find(rental => rental.referredCustomer.id === customerId);
    return of(rentals);
  }
}
