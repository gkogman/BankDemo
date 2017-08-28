import { Component, OnInit, Input } from '@angular/core';
import { ContractService } from '../contract.service';
import { ContractInstanceActivity, ContractInstance } from '../models';

@Component({
	selector: 'app-contract-progress',
	templateUrl: './contract-progress.component.html',
	styleUrls: ['./contract-progress.component.css']
})
export class ContractProgressComponent implements OnInit {
	@Input()
	public contractActivities: ContractInstanceActivity[] = [];
	@Input()
	public creatingAction: boolean;
	
	constructor(private contractService: ContractService) {
	}

	ngOnInit() {
	}

	ngOnChanges(changes: any) {
	}

}
