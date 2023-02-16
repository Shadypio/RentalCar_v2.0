import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Car } from 'src/app/common/car/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {


  private _jsonURL = '../assets/cars.json';
  carsData: Car[];
  // private baseUrl = "http://localhost:8080/api/cars"

  constructor(private httpClient: HttpClient) {
    this.getJSON().subscribe(data => {
      this.carsData = data;
     });
  }

  public getJSON(): Observable<any> {
    return this.httpClient.get(this._jsonURL);
  }

  getCars() : Observable<Car[]> {
    return this.httpClient.get(this._jsonURL).pipe(
      map(response => this.carsData)
    )
  }

  getCarById(carId: number) {

    const car = this.carsData.find(car => car.id === carId);
    return of(car);
  }

  getCarsByBrand(carBrand: string) {

    this.carsData = this.carsData.filter(car => car.brand === carBrand);
    // return of(cars);
  }

  getCarsByModel(carModel: string) {

    this.carsData = this.carsData.filter(car => car.model === carModel);
    // return of(car);
  }


}


