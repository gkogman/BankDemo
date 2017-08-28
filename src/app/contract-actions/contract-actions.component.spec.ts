import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractActionsComponent } from './contract-actions.component';

describe('ContractActionsComponent', () => {
  let component: ContractActionsComponent;
  let fixture: ComponentFixture<ContractActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
