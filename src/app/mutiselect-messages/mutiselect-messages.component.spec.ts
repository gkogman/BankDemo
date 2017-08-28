import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutiselectMessagesComponent } from './mutiselect-messages.component';

describe('MutiselectMessagesComponent', () => {
  let component: MutiselectMessagesComponent;
  let fixture: ComponentFixture<MutiselectMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutiselectMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutiselectMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
