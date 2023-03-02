import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/common/car/car';
import { Rental } from 'src/app/common/rental/rental';
import { CarService } from 'src/app/services/car/car.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css'],
})
export class RentalCreateComponent implements OnInit {

  carFound: Car;
  carsFound: Car[];
  rental: Rental = new Rental(RentalService.id++, '', '', null, null);
  isRentalAdded = false;

  constructor(
    private rentalService: RentalService,
    private carService: CarService,
    private customerService: CustomerService,
    private roleService: RoleService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.loadCarAndCustomer();

      this.loadCars();
    });
  }

  loadCarAndCustomer() {
    const carId = +this.route.snapshot.paramMap.get('idCar')!;
    const customerId = +this.route.snapshot.paramMap.get('idCustomer')!;

    this.carService.getCarById(carId).subscribe((data) => {
      if (data) {
         this.rental.rentedCar = data;
      }
    });

    this.customerService.getCustomerById(customerId).subscribe((data) => {
      if (data) {
         this.rental.referredCustomer = data;

      }
    });


  }

  loadCars() {
    this.carService.getCars().subscribe((data) => {
      if (data) this.carsFound = data;
    });
  }

  addRental(): void {
    const dataRental = {
      id: this.rental.id,
      startDate: this.rental.startDate,
      endDate: this.rental.endDate,
      referredCustomer: this.rental.referredCustomer,
      rentedCar: this.rental.rentedCar,
    };

    if (
      !dataRental.startDate ||
      !dataRental.endDate ||
      !dataRental.referredCustomer ||
      !dataRental.rentedCar
    ) {
      alert('Please fill forms!');
      return;
    }

    const idUser = sessionStorage.getItem("idUser");
    this.customerService.getRentalMade(idUser).subscribe((data) => {
      if(!data){
        this.createRental(dataRental);
      }
      else {
        alert("You have already rented a car");
      }
    })



  }

  createRental(dataRental: Rental) {
    this.rentalService.create(dataRental).subscribe(
      (response) => {
        this.isRentalAdded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
