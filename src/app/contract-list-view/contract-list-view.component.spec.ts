import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractListViewComponent } from './contract-list-view.component';

describe('ContractListViewComponent', () => {
  let component: ContractListViewComponent;
  let fixture: ComponentFixture<ContractListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
