import { Component, OnInit, Input } from '@angular/core';
import { UIElementContractInstanceActivityParameterInput } from "app/models";

@Component({
  selector: 'app-mutiselect-messages',
  templateUrl: './mutiselect-messages.component.html',
  styleUrls: ['./mutiselect-messages.component.css']
})
export class MutiselectMessagesComponent implements OnInit {

  @Input()
  public parameter: UIElementContractInstanceActivityParameterInput;
  
  constructor() { }

  ngOnInit() {
  }

}
