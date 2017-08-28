import { Component, OnInit, Input } from '@angular/core';
import { ContractService } from '../contract.service';
import { ContractInstance, ContractMetadata } from '../models';
import { ContractMetadataHelperService } from '../contract-metadata-helper.service';
@Component({
	selector: 'app-contract-information',
	templateUrl: './contract-information.component.html',
	styleUrls: ['./contract-information.component.css']
})
export class ContractInformationComponent implements OnInit {
	@Input()
	public contract: ContractMetadata;
	@Input()
	public contractInstance: ContractInstance;

	constructor(private contractService: ContractService, private contractMetadataService: ContractMetadataHelperService) {
	}

	ngOnInit() {

	}

}
