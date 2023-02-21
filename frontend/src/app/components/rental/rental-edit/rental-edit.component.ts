import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/common/rental/rental';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental-edit',
  templateUrl: './rental-edit.component.html',
  styleUrls: ['./rental-edit.component.css']
})
export class RentalEditComponent implements OnInit {

  rentalFound: Rental
  isRentalEdited = false;

  constructor(private route: ActivatedRoute,
              private rentalService: RentalService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.loadRental();
    })
  }

  loadRental() {
    const rentalId = +this.route.snapshot.paramMap.get('id')!;


    this.rentalService.getRentalById(rentalId).subscribe(
      data => {
        if(data)
          this.rentalFound = data;
      }

    )

  }

  editRental() {

    const data = {
      id: this.rentalFound.id,
      startDate: this.rentalFound.startDate,
      endDate: this.rentalFound.endDate,
      referredCustomer: this.rentalFound.referredCustomer,
      rentedCar: this.rentalFound.rentedCar,
    };

    if (
      !data.startDate ||
      !data.endDate
    ) {
      alert('Please fill forms!');
      return;
    }

    this.rentalService.editRental(data.id, data)
    .subscribe(
      response => {
        console.log(response);
        this.isRentalEdited = true;
      },
      error => {
        console.log(error);
      });
  }

}
