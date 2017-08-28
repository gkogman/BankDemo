import { Component, OnInit, Input } from '@angular/core';
import { ContractService } from '../contract.service';
import { Notification, ContractMetadata } from '../models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Logger } from "angular2-logger/core";
import { ProfileImageService } from "app/profile-image.service";
@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
	@Input()
	public notifications: Notification[] = [];

	constructor(private router: Router, private contractService: ContractService, private _logger: Logger, private profileImageService: ProfileImageService) {
	}

	ngOnInit() {
	}

	public goToPage(contractId: any) {
		this.router.navigate(['/contracts/contract', contractId]);
	}
}
