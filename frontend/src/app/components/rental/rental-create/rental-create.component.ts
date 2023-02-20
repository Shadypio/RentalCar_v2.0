import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/common/rental/rental';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css'],
})
export class RentalCreateComponent implements OnInit {
  constructor(private rentalService: RentalService) {}

  rental: Rental = new Rental(RentalService.id++, '', '', 0, 0);
  isRentalAdded = false;

  ngOnInit(): void {}

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
