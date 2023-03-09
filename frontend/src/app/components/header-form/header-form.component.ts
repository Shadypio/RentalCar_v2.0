import { Component, Input, OnInit } from '@angular/core';
import { MyButtonConfig } from '../my-button/config/my-button-config';

@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.css']
})
export class HeaderFormComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    console.log("message ", this.message)
  }

  @Input() message?: string;

}
