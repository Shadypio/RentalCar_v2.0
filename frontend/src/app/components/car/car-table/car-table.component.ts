import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/common/car/car';
import { AuthService } from 'src/app/services/authentication/auth.service';
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
export class CarTableComponent implements OnInit, OnDestroy {
  constructor(
    private carService: CarService,
    private _router: Router,
  ) {}


  idHeader: MyHeaders;
  licensePlateHeader: MyHeaders;
  brandHeader: MyHeaders;
  modelHeader: MyHeaders;
  yearHeader: MyHeaders;
  categoryHeader: MyHeaders;
  rentalHeader: MyHeaders;
  myHeaders: MyHeaders[];

  orderByID: MyOrder;
  searchByBrandAndModel: MySearch;
  pagination: MyPagination;
  carTable: MyTableConfig;

  cars: Car[] = [];

  listCarSubscription : any;

  detailsButton: MyButtonConfig = new MyButtonConfig(
    'action-button-class',
    'Details',
    'fa fa-plus'
  );

  ngOnInit(): void {
    // creating headers for table
    // declaring some headers
    this.idHeader = new MyHeaders('id', 'ID');
    this.licensePlateHeader = new MyHeaders('licensePlate', 'License Plate');
    this.brandHeader = new MyHeaders('brand', 'Brand');
    this.modelHeader = new MyHeaders('model', 'Model');
    this.yearHeader = new MyHeaders('year', 'Registration Year');
    this.categoryHeader = new MyHeaders('category', 'Category');
    this.rentalHeader = new MyHeaders('rental', 'Rental')
    this.myHeaders = [
      //this.idHeader,
      this.licensePlateHeader,
      this.brandHeader,
      this.modelHeader,
      this.yearHeader,
      this.categoryHeader,
      //this.rentalHeader
    ];

    // declaring order criteria
    this.orderByID = new MyOrder('0', 'asc');

    // declaring search option
    this.searchByBrandAndModel = new MySearch(['brand', 'model']);

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
  }

  listCars() {
    this.listCarSubscription = this.carService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }

  newRowHandler($event: { dataItem: any; action: any }) {
    this._router.navigateByUrl(`cars/create`);
  }

  performActionOnDataHandler(event: { dataItem: any; action: string }) {

    console.log(event.dataItem, event.action);
    if (event.action === 'Edit') {
      this._router.navigateByUrl(`cars/edit/${event.dataItem.id}`);
    } else if (event.action === 'Delete') {
      this.carService.deleteCar(event.dataItem.id).subscribe((response) => {
        this.listCars();
      });
    }
  }

  viewDetailsOnDataHandler(event: { dataItem: any }) {
    // view details of selected row
    this._router.navigateByUrl(`cars/${event.dataItem.id}`);
  }

  ngOnDestroy(): void {
    this.listCarSubscription.unsubscribe();
  }
}
