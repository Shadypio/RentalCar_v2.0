import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  cars: Car[] = [];

  constructor(private carService: CarService) {}

  @Input() tableConfig?: MyTableConfig;

  filteredData = this.cars;
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
    this.listCars();
    /*
    if (this.tableConfig)
      if (this.tableConfig.order)
        this.sortData(
          this.tableConfig?.order.defaultColumn,
          this.tableConfig?.order.orderType
        );
        */
  }

  listCars() {
    this.carService.getCars().subscribe(
      data => {
        this.cars = data
      }
    )
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
    /*
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
    */
  }


  /*
  filterData(searchTerm: string): Observable<Car[]> {

    return this.cars.pipe(
      map(carsData => {
        return carsData.filter((item: Car) => {
          return Object.values(item).some((value) => {
            return value
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          });
        });
      })
    );

  }*/

  filterData(searchTerm: string)  {
    console.log("a");
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
        this.cars.length / this.tableConfig?.pagination.itemPerPage
      );
    return 1;

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
