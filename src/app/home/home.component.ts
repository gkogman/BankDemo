import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContractMetadata } from '../models';
import { HttpModule } from '@angular/http';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import { Logger } from "angular2-logger/core";

import { Local } from '../../localization/Local_He';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public local:Local;

	public contracts: ContractMetadata[];

	constructor(private router: Router,
				private contractService: ContractService,
				private adalService: Adal4Service,
				private http: Adal4HTTPService,
				private _logger: Logger) {
		this.local=new Local();
		this.contractService.getContracts().then(contracts => {
			this._logger.debug('retrieved the following contracts: ');
			this._logger.debug(contracts);
			this.contracts = contracts;
		 }).catch(error => this._logger.log(error));
		 console.log(location.href);
		 if(!location.href.endsWith('contracts')){
			 location.href = 'contracts';
		 }
		
	}

	ngOnInit() {
		this._logger.log("ngOnInit of HomeComponent");

	}

	public goToPage(contract: ContractMetadata) {
		this._logger.debug(contract);
		var path = '/contracts/' + contract.ContractID;
		this._logger.debug('navigating to %s', path);
		this.router.navigate([path]);
	}
}
