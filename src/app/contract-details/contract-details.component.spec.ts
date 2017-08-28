import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractdetailsComponent } from './contractdetails.component';

describe('ContractdetailsComponent', () => {
  let component: ContractdetailsComponent;
  let fixture: ComponentFixture<ContractdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
