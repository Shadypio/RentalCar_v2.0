import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/common/car/car';
import { CarService } from 'src/app/services/car/car.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { MyButtonConfig } from '../../my-button/config/my-button-config';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  carFound : Car;
  rentButton: MyButtonConfig = new MyButtonConfig(
    'button-53',
    'Rent now',
    ''
  )

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
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
    /*
    console.log("ciao button")
    this.rentalService.createWithRentedCar(rentedCarId).subscribe(
      response => {}
    );*/
    this._router.navigateByUrl(`cars/rent/${rentedCarId}`)
  }

}
