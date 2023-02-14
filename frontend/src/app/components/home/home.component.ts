import { Component, OnInit } from '@angular/core';
import { MyButtonConfig } from '../my-button/config/my-button-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gettingStartedButton: MyButtonConfig = new MyButtonConfig("btn btn-primary", "Rent your car", "fa fa-icon fa-car");

}
