import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private carService: CarService, private route: ActivatedRoute, private _router: Router) {}

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

  detailsButton: MyButtonConfig = new MyButtonConfig(
    'action-button-class',
    'Details',
    'fa fa-plus'
  );


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


  }

  listCars() {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }

  newRowHandler($event: { dataItem: any; action: any }) {

    const newRental = new Car(100, 'newlicenseplate', 'newbrand', "newmodel", 2, 'newcategory')
    this.carService.create(newRental).subscribe(
      response => {}
    )
  }

  performActionOnDataHandler(event: { dataItem: any; action: string }) {
    console.log(event.dataItem, event.action);
    if (event.action === "Edit") {
      this.carService.editCar(event.dataItem.id, event.dataItem)
    }
    else if (event.action === "Delete") {
      this.carService.deleteCar(event.dataItem.id).subscribe(
        response => {
          this.listCars();
        }
      )
    }
  }

  viewDetailsOnDataHandler(event: {dataItem: any}) {
    // view details of selected row
    this._router.navigateByUrl(`cars/${event.dataItem.id}`)
  }




}
