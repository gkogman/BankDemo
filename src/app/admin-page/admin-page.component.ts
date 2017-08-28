import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from "ng2-breadcrumb/ng2-breadcrumb";

import { Local } from '../../localization/Local_He';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
public local:Local;
  constructor(private router: Router, private breadcrumbService: BreadcrumbService) {
    this.local=new Local();
    this.breadcrumbService.addFriendlyNameForRouteRegex('/admin$', this.local.admin);
  }

  ngOnInit() {
  }

  goToUserAssignment() {
    this.router.navigate(['/admin/users']);
  }

  goToDeployDemoContract() {
    this.router.navigate(['/admin/demo']);
  }

   goToUploadCustomContract() {
    this.router.navigate(['/admin/upload']);
  }
}
