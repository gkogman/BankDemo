import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import { Logger } from "angular2-logger/core";
import { ToastrService } from 'ngx-toastr';
import { ToastConfig } from 'ngx-toastr';

@Component({
  selector: 'app-deploy-demo',
  templateUrl: './deploy-demo.component.html',
  styleUrls: ['./deploy-demo.component.css']
})

export class DeployDemoComponent implements OnInit {
  public demoNames: string[];
  public inProgress: boolean = false;
  private toastConfig: ToastConfig = { closeButton: true, tapToDismiss: true, timeOut: 0 };

  constructor(private router: Router,
        private demoService: DemoService,
        private adalService: Adal4Service,
        private http: Adal4HTTPService,
        private toastrService: ToastrService,
        private _logger: Logger) {
    this.demoService.getAllDemos().then(result => {
      this._logger.debug('Received demos:', result);
      this.demoNames = result;
    }).catch(error => this._logger.log(error));
  }

  ngOnInit() {
    this._logger.log("ngOnInit of DeployDemo");
  }

  public deploy(demoName: string) {
    this.inProgress = true;
    this._logger.log('Deploying ', demoName);
    this.demoService.deployDemo(demoName)
    .then(result => {
      this.toastrService.success(`Successfuly deployed ${demoName}`, 'Success', this.toastConfig);
      this.inProgress = false;
    }).catch(err => {
      this.inProgress = false;
      if (err.status == 500) {
        var msg = err;
        if (err._body) {
          var body = JSON.parse(err._body);
          msg = body.message;
        }

        this.toastrService.error(msg, 'Failed', this.toastConfig);
      } else {
        this.toastrService.error(err, 'Failed', this.toastConfig);
      }
    })
  }
}
