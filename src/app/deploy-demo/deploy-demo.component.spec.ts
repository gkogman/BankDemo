import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployDemoComponent } from './deploy-demo.component';

describe('DeployDemoComponent', () => {
  let component: DeployDemoComponent;
  let fixture: ComponentFixture<DeployDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
