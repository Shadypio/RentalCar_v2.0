import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/common/car/car';
import { CarService } from 'src/app/services/car.service';
import { MyButtonConfig } from '../my-button/config/my-button-config';
import { MyTableConfig } from './config/my-table-config';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
})
export class MyTableComponent implements OnInit {
  constructor(private carService: CarService) {}

  @Input() tableConfig?: MyTableConfig;

  data = this.carService.getCars();
  filteredData = this.data;
  searchTerm = '';

  // creating buttons
  newRowButton: MyButtonConfig = new MyButtonConfig(
    'newrow-button-class',
    'New Row',
    'fa fa-plus'
  );
  actionButton: MyButtonConfig = new MyButtonConfig(
    'action-button-class',
    '',
    'fa fa-pencil'
  );

  ngOnInit(): void {
    if (this.tableConfig)
      if (this.tableConfig.order)
        this.sortData(
          this.tableConfig?.order.defaultColumn,
          this.tableConfig?.order.orderType
        );
  }

  // sort data in columns
  columnPropertyMap = new Map<string, string>([
    ['0', 'id'],
    ['1', 'licensePlate'],
    ['2', 'brand'],
    ['3', 'model'],
    ['4', 'year'],
    ['5', 'category'],
  ]);

  sortData(headerKey: string, orderType: string) {

    console.log(`${headerKey} - ${orderType} `);

    let headerIndex: string = this.columnPropertyMap.has(headerKey)
      ? this.columnPropertyMap.get(headerKey)!
      : '';

    console.log(`${headerIndex} `);

    this.data.sort((a, b) => {
      if (a[headerIndex] < b[headerIndex]) {
        return orderType === 'asc' ? -1 : 1;
      } else if (a[headerIndex] > b[headerIndex]) {
        return orderType === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    this.filteredData.sort((a, b) => {
      if (a[headerIndex] < b[headerIndex]) {
        return orderType === 'asc' ? -1 : 1;
      } else if (a[headerIndex] > b[headerIndex]) {
        return orderType === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  // filter data in the table and display them
  filterData(searchTerm: string) {
    this.filteredData = this.data.filter((item: Car) => {
      return Object.values(item).some((value) => {
        return value
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    });
  }

  // the following methods refer to pagination
  currentPage = 1;

  setItemPerPage(itemPerPage: number) {
    if (this.tableConfig?.pagination) {
      this.tableConfig.pagination.itemPerPage = itemPerPage;
      this.currentPage = 1;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  getTotalPages() {
    if (this.tableConfig?.pagination)
      return Math.ceil(
        this.data.length / this.tableConfig?.pagination.itemPerPage
      );
    return 1;
  }

  // the following methods are referred to actions to perform on the table
  newRow() {
    console.log('New Row Clicked');
  }

  // sending data from child to parent
  @Output() performActionOnData: EventEmitter<any> = new EventEmitter();

  performActionOnDataItem(event: { dataItem: any; action: any }) {
    this.performActionOnData.emit(event);
  }
}
