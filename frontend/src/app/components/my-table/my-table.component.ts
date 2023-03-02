import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { MyButtonConfig } from '../my-button/config/my-button-config';

import { MyTableConfig } from './config/my-table-config';


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
})
export class MyTableComponent implements OnInit {

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

  searchButton: MyButtonConfig = new MyButtonConfig(
    'search-button-class',
    'Search',
    'fas fa-search'
  )

  clearButton: MyButtonConfig = new MyButtonConfig(
    'clear-button-class',
    'Clear search ',
    'fas fa-trash'
  )



  constructor(private route: ActivatedRoute,
              public authService: AuthService) {}

  @Input() tableConfig?: MyTableConfig;
  @Input() data : any[];

  filteredData: any[]

  currentPage = 1;

  searchTerm = '';
  term = '';

  sortByParam = '';
  sortDirection = 'asc'

  ngOnInit(): void {

  }

  performActionOnDataHandler(event: { dataItem: any; action: string }) {
    console.log(event.dataItem, event.action);
  }




  sortData(headerKey: string, orderType: string) {

    this.data.sort((a, b) => {
      if (a[headerKey] < b[headerKey]) {
        return orderType === 'asc' ? -1 : 1;
      } else if (a[headerKey] > b[headerKey]) {
        return orderType === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

  }

  onSearchTermFilter() {
    this.term = this.searchTerm;
  }

  clearSearch() {
    this.term = '';
    this.searchTerm = '';
  }

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


  // sending data from child to parent
  @Output() performActionOnData: EventEmitter<any> = new EventEmitter();
  @Output() newRowOnData: EventEmitter<any> = new EventEmitter();
  @Output() viewDetailsOnData: EventEmitter<any> = new EventEmitter();

  newRow() {
    console.log('New Row Clicked');
    this.newRowOnData.emit()
  }

  performActionOnDataItem(event: { dataItem: any; action: any }) {
    this.performActionOnData.emit(event);
  }

  viewDetails(event: { dataItem: any}) {
    this.viewDetailsOnData.emit(event);
  }

}
