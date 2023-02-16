import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/common/rental/rental';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.css']
})
export class RentalDetailsComponent implements OnInit {

  rentalFound: Rental

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      this.loadRental();
    })
  }

  loadRental() {

    console.log("prenotazione")

    const rentalId = +this.route.snapshot.paramMap.get('id')!;


    this.rentalService.getRentalById(rentalId).subscribe(
      data => {
        if(data)
          this.rentalFound = data;
      }

    )
  }

}
