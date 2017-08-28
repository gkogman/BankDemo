import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';
import { AdminGuard } from './admin.guard';
import { ContractService } from './contract.service';
import { DemoService } from './demo.service';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { UserPersonaMappingService } from './user-persona-mapping/user-persona-mapping.service';
import { ContractInstanceActionParameterHelperService } from './contract-instance-action-parameter-helper.service';
import { ConstantsService } from './constants.service';
import { DocumentsService } from './documents.service';
import { UploadService } from './upload.service';
import { ContractListViewComponent } from './contract-list-view/contract-list-view.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractUploadComponent } from './contract-upload/contract-upload.component';
import { DeployDemoComponent } from './deploy-demo/deploy-demo.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContractProgressComponent } from './contract-progress/contract-progress.component';
import { ContractDocumentsComponent } from './contract-documents/contract-documents.component';
import { ContractTransactionsComponent } from './contract-transactions/contract-transactions.component';
import { ContractInformationComponent } from './contract-information/contract-information.component';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { ContractActionsComponent } from './contract-actions/contract-actions.component';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import { ProfileImageService } from "app/profile-image.service";
import { Logger } from "angular2-logger/core";
import { Ng2BreadcrumbModule } from "ng2-breadcrumb/ng2-breadcrumb";
import { DonutchartComponent } from './shared/donutchart/donutchart.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { ContractInstancePropertyPipe } from './contract-instance-property.pipe';
import { UTCToLocalPipe } from './utcto-local.pipe';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { MessageComponent } from './shared/message/message.component';
import { ContractMetadataHelperService } from './contract-metadata-helper.service';
import { AccordionModule } from 'primeng/primeng';     //accordion and accordion tab
import { MenuItem } from 'primeng/primeng';            //api
import { CalendarModule } from 'primeng/primeng';
import { CommaSeparatedStringToArrayPipe } from './comma-separated-string-to-array.pipe';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserAssignmentComponent } from './user-assignment/user-assignment.component';
import { CreateAssignmentDialogComponent } from './create-assignment-dialog/create-assignment-dialog.component';
import { NumberOfElementsToArrayPipe } from './number-of-elements-to-array.pipe';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { LoadSpinnerComponent } from './shared/load-spinner/load-spinner.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ArrayToMultiSelectOptionArrayPipe } from './array-to-multi-select-option-array.pipe';
import { MutiselectMessagesComponent } from './mutiselect-messages/mutiselect-messages.component';
import { LookupByAddressesService } from './lookup-by-addresses.service';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { ToastrModule } from 'ngx-toastr';

export function startupServiceFactory(startupService: ConstantsService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ContractListViewComponent,
    CreateUserComponent,
    ContractDetailsComponent,
    ContractUploadComponent,
    DeployDemoComponent,
    NotificationsComponent,
    ContactsComponent,
    ContractProgressComponent,
    ContractDocumentsComponent,
    ContractTransactionsComponent,
    ContractInformationComponent,
    GenericModalComponent,
    ContractActionsComponent,
    DonutchartComponent,
    CarouselComponent,
    ContractInstancePropertyPipe,
    UTCToLocalPipe,
    SingleContactComponent,
    UploadDocumentsComponent,
    MessageComponent,
    CommaSeparatedStringToArrayPipe,
    AdminPageComponent,
    UserAssignmentComponent,
    CreateAssignmentDialogComponent,
    NumberOfElementsToArrayPipe,
    ConfirmationDialogComponent,
    LoadSpinnerComponent,
    ArrayToMultiSelectOptionArrayPipe,
    MutiselectMessagesComponent,
    CommaSeparatedStringToArrayPipe,
    FileSelectorComponent
  ],
  entryComponents: [
    GenericModalComponent,
    CreateAssignmentDialogComponent,
    UploadDocumentsComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [LoginGuard] },
      { path: 'contracts', component: HomeComponent, canActivate: [LoginGuard] },
      { path: 'admin', component: AdminPageComponent, canActivate: [LoginGuard, AdminGuard] },
      { path: 'admin/users', component: UserAssignmentComponent, canActivate: [LoginGuard, AdminGuard] },
      { path: 'admin/demo', component: DeployDemoComponent, canActivate: [LoginGuard, AdminGuard] },
      { path: 'admin/upload', component: ContractUploadComponent, canActivate: [LoginGuard, AdminGuard] },
      { path: 'users/create', component: CreateUserComponent, canActivate: [LoginGuard] },
      { path: 'contracts/:id', component: ContractListViewComponent, canActivate: [LoginGuard] },
      { path: 'contracts/:contractId/:id', component: ContractDetailsComponent, canActivate: [LoginGuard] },
      { path: '**', redirectTo: 'HomeComponent', canActivate: [LoginGuard] }
    ]),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    AccordionModule,
    CalendarModule,
    MultiselectDropdownModule,
    BrowserAnimationsModule,
    Ng2BreadcrumbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    Logger,
    LoginGuard,
    AdminGuard,
    ContractService,
    DemoService,
    UserService,
    ConstantsService,
    ProfileImageService,
    DocumentsService,
    UploadService,
    TokenService,
    ContractMetadataHelperService,
    LookupByAddressesService,
    UserPersonaMappingService,
    ArrayToMultiSelectOptionArrayPipe,
    CommaSeparatedStringToArrayPipe,
    ContractInstanceActionParameterHelperService,
    Adal4Service,
    {
      provide: Adal4HTTPService,
      useFactory: Adal4HTTPService.factory,
      deps: [Http, Adal4Service]
    },
    HttpModule,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [ConstantsService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
