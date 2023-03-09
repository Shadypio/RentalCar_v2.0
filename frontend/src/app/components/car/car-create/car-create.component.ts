import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/common/car/car';
import { CarService } from 'src/app/services/car/car.service';
import { MyButtonConfig } from '../../my-button/config/my-button-config';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css'],
})
export class CarCreateComponent implements OnInit {
  car: Car = new Car(CarService.id++, '', '', '', 0, '', null);
  isCarAdded = false;
  years: number[] = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ];
  carAlreadyIn = false;
  fillForm = false;
  addCarMessage = "Add New Car";
  createButton: MyButtonConfig = new MyButtonConfig(
    'btn btn-success',
    'Create',
    'fa fa-check'
  );
  createMoreButton: MyButtonConfig = new MyButtonConfig(
    'btn btn-success text-center',
    'Add More',
    'fa fa-plus'
  );

  constructor(private carService: CarService) {}

  ngOnInit(): void {}

  addCar(): void {
    const data = {
      id: this.car.id,
      licensePlate: this.car.licensePlate,
      brand: this.car.brand,
      model: this.car.model,
      year: this.car.year,
      category: this.car.category,
    };
    if (
      !data.licensePlate ||
      !data.brand ||
      !data.model ||
      data.year === 0 ||
      !data.category
    ) {
      this.fillForm = true;
      return;
    }

    this.carService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.isCarAdded = true;
      },
      (error) => {
        console.log(error);
        this.carAlreadyIn = true;
      }
    );
  }

  // Reset on adding new
  newCar(): void {
    this.isCarAdded = false;
    this.car = new Car(CarService.id++, '', '', '', 0, '',null);
  }
}
