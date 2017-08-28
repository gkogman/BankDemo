import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDocumentsComponent } from './contract-documents.component';

describe('ContractDocumentsComponent', () => {
  let component: ContractDocumentsComponent;
  let fixture: ComponentFixture<ContractDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
