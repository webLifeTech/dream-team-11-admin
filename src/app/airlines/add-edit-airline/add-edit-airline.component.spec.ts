import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAirlineComponent } from './add-edit-airline.component';

describe('AddEditAirlineComponent', () => {
  let component: AddEditAirlineComponent;
  let fixture: ComponentFixture<AddEditAirlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAirlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
