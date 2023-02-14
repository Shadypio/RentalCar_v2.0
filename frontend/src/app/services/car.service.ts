import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Car } from '../common/car/car';

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

  // a simple car has ID, license plate, brand, model, year, category
  /*
  carsData: Car[] = [
    new Car(1, 'AT161FL', 'Panda', '2 serie', 2014, 'Automobile'),
    new Car(3, 'CG272GM', 'Renault', 'Turbo', 2010, 'Autocarro'),
    new Car(13, 'BQ383KN', 'Volkswagen', 'Express', 2015, 'Camper'),
    new Car(14, 'FN494JO', 'Opel', 'Max', 2013, 'Automobile'),
    new Car(15, 'EM515KP', 'BMW', 'New', 2022, 'Autocarro'),
    new Car(11, 'AO111PB', 'Fiat', 'Punto', 2010, 'Camper'),
    new Car(12, 'BN222QC', 'Volkswagen', 'Golf', 2012, 'Camper'),
    new Car(10, 'DL444SE', 'Renault', 'Clio', 2009, 'Automobile'),
    new Car(8, 'EK555TF', 'Peugeot', '208', 2013, 'Camper'),
    new Car(4, 'FJ666AS', 'BMW', '1 series', 2015, 'Automobile'),
    new Car(7, 'GI777BQ', 'Mercedes-Benz', 'A-Class', 2014, 'Autocarro'),
    new Car(5, 'HH888CW', 'Audi', 'A3', 2012, 'Camper'),
    new Car(2, 'JF000ER', 'Toyota', 'Yaris', 2010, 'Autocarro'),
    new Car(6, 'FE666FT', 'BMW', '1 series', 2015, 'Camper'),
    new Car(9, 'GD777HY', 'Mercedes-Benz', 'A-Class', 2014, 'Autocarro'),
    new Car(18, 'HC888IU', 'Audi', 'A3', 2012, 'Automobile'),
    new Car(17, 'IB999JI', 'Nissan', 'Qashqai', 2013, 'Camper'),
    new Car(16, 'JA000AK', 'Toyota', 'Yaris', 2010, 'Autocarro'),
  ];*/

  getCars() : Observable<Car[]> {
    return this.httpClient.get(this._jsonURL).pipe(
      map(response => this.carsData)
    )
  }

  getCarById() {
    return this.carsData[0];
  }
}


