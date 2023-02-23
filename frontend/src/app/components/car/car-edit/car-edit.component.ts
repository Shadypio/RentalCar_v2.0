import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/common/car/car';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
})
export class CarEditComponent implements OnInit {
  carFound: Car;
  isCarEdited = false;

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.loadCar();
    });
  }

  loadCar() {
    const carId = +this.route.snapshot.paramMap.get('id')!;

    this.carService.getCarById(carId).subscribe((data) => {
      if (data) this.carFound = data;
    });
  }

  editCar(): void {
    const data = {
      id: this.carFound.id,
      licensePlate: this.carFound.licensePlate,
      brand: this.carFound.brand,
      model: this.carFound.model,
      year: this.carFound.year,
      category: this.carFound.category,
    };
    if (
      !data.licensePlate ||
      !data.brand ||
      !data.model ||
      data.year === 0 ||
      !data.category
    ) {
      alert('Please fill forms!');
      return;
    }

    this.carService.editCar(data.id, data).subscribe(
      (response) => {
        console.log(response);
        this.isCarEdited = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
