import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyButtonConfig } from '../my-button/config/my-button-config';

import { MyTableConfig } from './config/my-table-config';


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
})
export class MyTableComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  @Input() tableConfig?: MyTableConfig;
  @Input() data : any[];

  ngOnInit(): void {


  }


}
