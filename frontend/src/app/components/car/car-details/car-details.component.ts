import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from 'src/app/common/car/car';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { CarService } from 'src/app/services/car/car.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { MyButtonConfig } from '../../my-button/config/my-button-config';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit, OnDestroy {
  carFound: Car;
  rentButton: MyButtonConfig = new MyButtonConfig('button-53', 'Rent now', '');

  loadCarSubscription: any

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private carService: CarService,
    private rentalService: RentalService,
    private authService: AuthService
  ) {}


  carId: number;

  ngOnInit(): void {
    this.loadCarSubscription = this.route.paramMap.subscribe(() => {
      this.loadCar();
    });
  }

  loadCar() {
    const hasCarId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCarId) {
      this.carId = +this.route.snapshot.paramMap.get('id')!;

      this.carService.getCarById(this.carId).subscribe((data) => {
        if (data) {
          this.carFound = data;
          this.checkRental();
        }
      });


    }
  }

  checkRental() {
    this.carService.getRentalMade(this.carFound.id).subscribe((data) => {
      if (data) {
        this.carFound.rental = data;
      }
    })

  }

  rentCar(rentedCarId: number) {
    const idCustomer = sessionStorage.getItem('idUser');
    this._router.navigateByUrl(`cars/rent/${rentedCarId}/${idCustomer}`);
  }

  ngOnDestroy(): void {
    this.loadCarSubscription.unsubscribe();
  }

}
