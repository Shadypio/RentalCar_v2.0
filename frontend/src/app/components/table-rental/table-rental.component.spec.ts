import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRentalComponent } from './table-rental.component';

describe('TableRentalComponent', () => {
  let component: TableRentalComponent;
  let fixture: ComponentFixture<TableRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
