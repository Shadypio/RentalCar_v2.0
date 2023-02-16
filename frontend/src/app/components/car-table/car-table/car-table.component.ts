import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/common/car/car';
import { CarService } from 'src/app/services/car/car.service';
import { MyButtonConfig } from '../../my-button/config/my-button-config';
import { MyTableActions } from '../../my-table/config/actions/my-table-actions';
import { MyHeaders } from '../../my-table/config/header/my-headers';
import { MyTableConfig } from '../../my-table/config/my-table-config';
import { MyOrder } from '../../my-table/config/order/my-order';
import { MyPagination } from '../../my-table/config/pagination/my-pagination';
import { MySearch } from '../../my-table/config/search/my-search';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.css'],
})

export class CarTableComponent implements OnInit {
  constructor(private carService: CarService, private route: ActivatedRoute) {}

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

  myDefaultButton: MyButtonConfig;

  idHeader: MyHeaders;
  licensePlateHeader: MyHeaders;
  brandHeader: MyHeaders;
  modelHeader: MyHeaders;
  yearHeader: MyHeaders;
  categoryHeader: MyHeaders;
  myHeaders: MyHeaders[];

  orderByID: MyOrder;
  searchByBrandAndModel: MySearch;
  pagination: MyPagination;
  carTable: MyTableConfig;

  cars: Car[] = [];

  filteredData = this.cars;

  currentPage = 1;

  searchTerm = '';

  ngOnInit(): void {

    // creating headers for table
    // declaring some headers
    this.idHeader = new MyHeaders('0', 'ID');
    this.licensePlateHeader = new MyHeaders('1', 'License Plate');
    this.brandHeader = new MyHeaders('2', 'Brand');
    this.modelHeader = new MyHeaders('3', 'Model');
    this.yearHeader = new MyHeaders('4', 'Registration Year');
    this.categoryHeader = new MyHeaders('5', 'Category');
    this.myHeaders = [
      this.idHeader,
      this.licensePlateHeader,
      this.brandHeader,
      this.modelHeader,
      this.yearHeader,
      this.categoryHeader,
    ];

    // declaring order criteria
    this.orderByID = new MyOrder('0', 'asc');

    // declaring search option
    this.searchByBrandAndModel = new MySearch(['2', '3']);

    // declaring MyPagination object
    this.pagination = new MyPagination(5, [5, 10, 15, 20]);

    // declaring table for displaying data cars
    this.carTable = new MyTableConfig(
      this.myHeaders,
      this.orderByID,
      this.searchByBrandAndModel,
      this.pagination,
      [MyTableActions.NEW_ROW, MyTableActions.EDIT, MyTableActions.DELETE]
    );

    this.listCars();

    if (this.carTable)
      if (this.carTable.order)
        this.sortData(
          this.carTable?.order.defaultColumn,
          this.carTable?.order.orderType
        );
  }

  listCars() {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }

  performActionOnDataHandler(event: { dataItem: any; action: string }) {
    console.log(event.dataItem, event.action);
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

    this.cars.sort((a, b) => {
      if (a[headerIndex] < b[headerIndex]) {
        return orderType === 'asc' ? -1 : 1;
      } else if (a[headerIndex] > b[headerIndex]) {
        return orderType === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    /*
    this.filteredData.sort((a, b) => {
      if (a[headerIndex] < b[headerIndex]) {
        return orderType === 'asc' ? -1 : 1;
      } else if (a[headerIndex] > b[headerIndex]) {
        return orderType === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });*/

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

  filterData(searchTerm: string) {
    console.log("a")
  }

  setItemPerPage(itemPerPage: number) {
    if (this.carTable?.pagination) {
      this.carTable.pagination.itemPerPage = itemPerPage;
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

    if (this.carTable?.pagination)
      return Math.ceil(
        this.cars.length / this.carTable?.pagination.itemPerPage
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
