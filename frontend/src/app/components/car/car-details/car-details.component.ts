import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/common/car/car';
import { CarService } from 'src/app/services/car/car.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  carFound : Car;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    // this.loadCar();
    this.route.paramMap.subscribe(() => {
      this.loadCar();
    })
  }


  loadCar() {
    const carId = +this.route.snapshot.paramMap.get('id')!;


    this.carService.getCarById(carId).subscribe(
      data => {
        if(data)
          this.carFound = data;
      }

    )

  }

  rentCar(rentedCarId: number) {
    console.log("ciao button")
    this.rentalService.createWithRentedCar(rentedCarId).subscribe(
      response => {}
    );
  }

}