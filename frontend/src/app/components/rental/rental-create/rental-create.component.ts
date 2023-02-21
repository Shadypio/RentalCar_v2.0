import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/common/car/car';
import { Rental } from 'src/app/common/rental/rental';
import { CarService } from 'src/app/services/car/car.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css'],
})
export class RentalCreateComponent implements OnInit {

  carFound: Car;
  carsFound: Car[];

  constructor(private rentalService: RentalService,
              private carService: CarService,
              private route: ActivatedRoute) {}

  rental: Rental = new Rental(RentalService.id++, '', '', 0, 0);
  isRentalAdded = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.loadCar();
      this.loadCars();

    })


    console.log(`prenotata ${this.rental.rentedCar}`)
  }


  loadCar() {
    const carId = +this.route.snapshot.paramMap.get('id')!;


    this.carService.getCarById(carId).subscribe(
      data => {
        if(data){
          this.carFound = data;
          this.rental.rentedCar = this.carFound.id
          console.log(`${this.carFound.licensePlate}`)
        }
      }

    )

  }

  loadCars() {
    this.carService.getCars().subscribe(
      data => {
        if(data)
          this.carsFound = data;
      }
    )
  }

  addRental(): void {

    const data = {

      id: this.rental.id,
      startDate: this.rental.startDate,
      endDate: this.rental.endDate,
      referredCustomer: this.rental.referredCustomer,
      rentedCar: this.rental.rentedCar,
    };

    if (
      !data.startDate ||
      !data.endDate ||
      data.referredCustomer === 0 ||
      data.rentedCar === 0
    ) {
      alert('Please fill forms!');
      return;
    }

    this.rentalService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.isRentalAdded = true;
      },
      error => {
        console.log(error);
      });
  }

  // Reset on adding new
  newRental(): void {
    this.isRentalAdded = false;
    this.rental = new Rental(RentalService.id++, '', '', 0, 0);
  }
}
