import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("gnam")
    this.loadCar();
  }

  loadCar() {
    const carId = this.route.snapshot.paramMap.get('id');
    console.log(carId);
    console.log("we");
  }

}
