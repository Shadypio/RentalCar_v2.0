import { Component, Input, OnInit } from '@angular/core';
import { MyTableConfig } from './config/my-table-config';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {

  constructor() { }
  @Input () tableConfig? : MyTableConfig;

  ngOnInit(): void {
  }

}
