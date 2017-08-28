import { Component, OnInit } from '@angular/core';
import { Adal4Service } from 'adal-angular4';
import { Logger } from "angular2-logger/core";
import { Router } from "@angular/router";
import { Ng2BreadcrumbModule, BreadcrumbService } from "ng2-breadcrumb/ng2-breadcrumb";
import { environment } from '../environments/environment';
import { ConstantsService } from "app/constants.service";
import { Title } from "@angular/platform-browser";
import { Local } from '../localization/Local_He';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	public local:Local;
	constructor(private service: Adal4Service, private _logger: Logger, private router: Router,
		private breadcrumbService: BreadcrumbService, private startup: ConstantsService,
		private titleService: Title ) {
		this._logger.level = this._logger.Level.LOG;
		this._logger.warn("Setting logging level to %s", this._logger.level);
		this.breadcrumbService.addFriendlyNameForRouteRegex('/contracts$', 'Home');
		this.local=new Local();
	}
	

	ngOnInit() {

		// If there is no startup data received (maybe an error!)
		// navigate to error route
		if (!this.startup.startupData) {
			console.log('app.component: startup data does not exists');
			console.error('app.component: WHERE TO NAVIGATE ON ERROR');
			// this.router.navigate(['error'], { replaceUrl: true });
		}
		else {
			console.log('app.component: good, startup data exists.');
			console.log('app.component: startup data: %s', JSON.stringify(this.startup.startupData));
			console.log('app.component: gatewayApiHost: %s', this.startup.gatewayApiHost);
		}

		this.setTitle("CryptletFX PoC");
		this.service.init({
			tenant: this.startup.activeDirectoryTenant,
			clientId: this.startup.activeDirectoryClientId
		});

	}

	public goHome() {
		this.router.navigate(['/contracts']);
	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle(newTitle);
	}
}
