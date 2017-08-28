import { Component, OnInit, Input } from '@angular/core';
import { ProfileImageService } from "app/profile-image.service";
import { ContractInstanceParticipant, ContractInstance } from '../models';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.css']
})
export class SingleContactComponent implements OnInit {
  @Input() public contact: any;
  constructor(private profileImageService: ProfileImageService) { }

  ngOnInit() {
   
  }

}
