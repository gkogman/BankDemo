import { Component, OnInit, Input } from '@angular/core';
import { ContractInstanceParticipant, ContractInstance } from '../models';
import { ContractService } from '../contract.service';
import { ProfileImageService } from "app/profile-image.service";
@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
	@Input()
	public contractInstance: ContractInstance;
	public participants: ContractInstanceParticipant[] = [];

	constructor(private contractService: ContractService, private profileImageService: ProfileImageService) {
	}

	ngOnInit() {
		this.loadContractInstance();
	}

	loadContractInstance() {
			this.participants = this.contractInstance.Personas;
	}
}
