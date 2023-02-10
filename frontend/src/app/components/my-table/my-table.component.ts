import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/common/car/car';
import { CarService } from 'src/app/services/car.service';
import { MyButtonConfig } from '../my-button/config/my-button-config';
import { MyTableConfig } from './config/my-table-config';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {

  constructor(private carService: CarService) { }

  @Input () tableConfig? : MyTableConfig;

  data = this.carService.getCars();
  filteredData = this.data;
  searchTerm="";

  // creating buttons
  newRowButton: MyButtonConfig = new MyButtonConfig("newrow-button-class", 'New Row', "fa fa-plus");
  actionButton: MyButtonConfig = new MyButtonConfig("action-button-class", '', "fa fa-pencil");

  ngOnInit(): void {

    if(this.tableConfig)
      if(this.tableConfig.order)
        this.sortData(this.tableConfig?.order.defaultColumn,this.tableConfig?.order.orderType );

  }


  // sort data in columns
  sortData(colName: string, orderType?: string) {
    /*
    if (orderType == "asc"){
        this.data.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
        this.filteredData?.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)


    }
    else if (orderType == "desc"){
        this.data.sort((a, b) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
        this.filteredData?.sort((a, b) => a[colName] > b[colName] ? -1 : a[colName] < b[colName] ? 1 : 0)
    }*/
    }



  // filter data in the table and display them
  filterData(searchTerm: string) {
    this.filteredData = this.data.filter((item: Car) => {
      return this.tableConfig?.search?.columns.some(column => {
        return (item as any)[column].toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }


  // the following methods refer to pagination
  currentPage = 1;

  setItemPerPage(itemPerPage: number) {
    if(this.tableConfig?.pagination){
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
    if(this.tableConfig?.pagination)
      return Math.ceil(this.data.length / this.tableConfig?.pagination.itemPerPage);
    return(1);
  }

  // the following methods are referred to actions to perform on the table
  newRow() {
    console.log("New Row Clicked")
  }

  // sending data from child to parent
  @Output() performActionOnData: EventEmitter<any> = new EventEmitter();

  performActionOnDataItem(event: {dataItem: any, action: any}) {
    this.performActionOnData.emit(event);
  }

}
