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
      console.log("info rental")


      this.loadCars();
    });
  }

  loadCarAndCustomer() {
    const carId = +this.route.snapshot.paramMap.get('idCar')!;
    const customerId = +this.route.snapshot.paramMap.get('idCustomer')!;

    this.carService.getCarById(carId).subscribe((data) => {
      if (data) {
         this.rental.rentedCar = data;
         console.log(this.rental.rentedCar)
      }
    });

    this.customerService.getCustomerById(customerId).subscribe((data) => {
      if (data) {
         this.rental.referredCustomer = data;
         console.log("vedo il customer")
         console.log(this.rental.referredCustomer)
      }
    });


  }

  loadCars() {
    this.carService.getCars().subscribe((data) => {
      if (data) this.carsFound = data;
    });
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
      !data.referredCustomer ||
      !data.rentedCar
    ) {
      alert('Please fill forms!');
      return;
    }

    console.log("info data")
    console.log(data)

    this.rentalService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.isRentalAdded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
