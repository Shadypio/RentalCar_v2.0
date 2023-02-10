import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  // a simple car has ID, license plate, brand, model, year, category
  @Input () carsData : any[] = [[1, "AT161FL", "Panda", "2 serie", 2014, "Automobile"],
                            [3, "CG272GM", "Renault", "Turbo", 2010 ,"Autocarro"],
                            [13, "BQ383KN", "Volkswagen", "Express", 2015,"Camper"],
                            [14, "FN494JO", "Opel", "Max",2013,"Automobile"],
                            [15, "EM515KP", "BMW", "New", 2022,"Autocarro"],
                            [11, "AO111PB", "Fiat", "Punto", 2010, "Camper"],
                            [12, "BN222QC", "Volkswagen", "Golf", 2012, "Camper"],
                            [9, "CM333RD", "Ford", "Focus", 2011, "Autocarro"],
                            [10, "DL444SE", "Renault", "Clio", 2009, "Automobile"],
                            [8, "EK555TF", "Peugeot", "208", 2013, "Camper"],
                            [20, "FJ666AS", "BMW", "1 series", 2015, "Automobile"],
                            [7, "GI777BQ", "Mercedes-Benz", "A-Class", 2014, "Autocarro"],
                            [5, "HH888CW", "Audi", "A3", 2012, "Camper"],
                            [4, "IG999DE", "Nissan", "Qashqai", 2013, "Automobile"],
                            [2, "JF000ER", "Toyota", "Yaris", 2010, "Autocarro"],
                            [6, "FE666FT", "BMW", "1 series", 2015, "Camper"],
                            [19, "GD777HY", "Mercedes-Benz", "A-Class", 2014, "Autocarro"],
                            [18, "HC888IU", "Audi", "A3", 2012, "Automobile"],
                            [17, "IB999JI", "Nissan", "Qashqai", 2013, "Camper"],
                            [16, "JA000AK", "Toyota", "Yaris", 2010, "Autocarro"],
                            ]

  getCars()  {

    return this.carsData;
  }
}
