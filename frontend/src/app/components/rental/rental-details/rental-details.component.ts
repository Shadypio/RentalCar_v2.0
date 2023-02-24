import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/common/rental/rental';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.css'],
})
export class RentalDetailsComponent implements OnInit {
  rentalFound: Rental;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  rentalId: number

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.loadRental();
    });
  }

  loadRental() {
    this.rentalId = +this.route.snapshot.paramMap.get('id')!;

    this.rentalService.getRentalById(this.rentalId).subscribe((data) => {
      if (data) {
        this.rentalFound = data;
        this.checkRentedCar();
        this.checkReferredCustomer();
      }
    });
  }

  checkRentedCar() {
    this.rentalService.getRentedCar(this.rentalId).subscribe((data) => {
      if(data) this.rentalFound.rentedCar = data;
    });
  }

  checkReferredCustomer() {
    this.rentalService.getReferredCustomer(this.rentalId).subscribe((data) => {
      if(data) this.rentalFound.referredCustomer = data;
    });
  }
}
