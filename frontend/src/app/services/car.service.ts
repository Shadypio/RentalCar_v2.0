import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  // a simple car has ID, license plate, brand, model, year, category
  @Input () carsData : any[] = [[7, "AT161FL", "Panda", "2 serie", 2014, "Automobile"],
                            [2, "CG272GM", "Renault", "Turbo", 2010 ,"Autocarro"],
                            [3, "BQ383KN", "Volkswagen", "Express", 2015,"Camper"],
                            [8, "FN494JO", "Opel", "Max",2013,"Automobile"],
                            [5, "EM515KP", "BMW", "New", 2022,"Camper"],
                            ]

  getCars()  {

    return this.carsData;
  }
}
