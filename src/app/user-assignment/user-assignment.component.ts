import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CreateAssignmentDialogComponent } from '../create-assignment-dialog/create-assignment-dialog.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { UserPersonaMappingService } from '../user-persona-mapping/user-persona-mapping.service';
import { UserService } from '../user.service';
import { UserAssignment, UserAssignmentPage } from '../models';
import { BreadcrumbService } from "ng2-breadcrumb/ng2-breadcrumb";

import { Local } from '../../localization/Local_He';

@Component({
  selector: 'app-user-assignment',
  templateUrl: './user-assignment.component.html',
  styleUrls: ['./user-assignment.component.css']
})
export class UserAssignmentComponent implements OnInit {
  public local:Local;
  public userAssignmentPage: UserAssignmentPage;
  public isLoading: boolean = true;
  public currentPage: number = 1;
  private numberOfElementsPerPage = 10;
  constructor(private router: Router, private userService: UserService, public dialog: MdDialog, private userPersonaMappingService: UserPersonaMappingService, private breadcrumbService: BreadcrumbService) {
    this.local=new Local();
    this.breadcrumbService.addFriendlyNameForRouteRegex('/admin/users$', this.local.users);
    this.updateData();
  }

  ngOnInit() {
  }

  updateData() {
    this.userPersonaMappingService.getUserAssignments(this.currentPage - 1, this.numberOfElementsPerPage).then(userAssignmentPage => {
      this.userAssignmentPage = userAssignmentPage;
      this.isLoading = false;
    });
  }

  getCurrentUser() {
    return this.userService.currentUser;
  }
  createAssignment() {
    this.openEditCreateAssignment();
  }

  goToPageNumber(number) {
    this.currentPage = number + 1;
    this.userPersonaMappingService.getUserAssignments(number, this.numberOfElementsPerPage).then(userAssignmentPage => {
      this.userAssignmentPage = userAssignmentPage;
    });
  }

  editAssignment(assignment: UserAssignment) {
    this.openEditCreateAssignment(assignment);
  }

  deleteAssignment(assignment: UserAssignment) {
    let dialogRef: MdDialogRef<ConfirmationDialogComponent>;
    dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.title = this.local.deleteUserAssignment;
    dialogRef.componentInstance.message = this.local.deleteUserAssignmentMsg;
    dialogRef.componentInstance.submitted.subscribe(((response) => {
      if (this.userAssignmentPage.UserAssignments.length <= 1 && this.currentPage > 1) {
        this.currentPage--;
        this.userAssignmentPage.PageCount--;
      }
      this.userPersonaMappingService.deleteUserAssignment(assignment.ID).then(x => {
        this.userService.getUser(true);
        this.updateData();
      });
    }).bind(this));
  }

  openEditCreateAssignment(userAssignment?: UserAssignment) {
    let dialogRef: MdDialogRef<CreateAssignmentDialogComponent>;
    dialogRef = this.dialog.open(CreateAssignmentDialogComponent);
    if (userAssignment) {
      dialogRef.componentInstance.title = this.local.editUserAssignment;
      dialogRef.componentInstance.isEdit = true;
      dialogRef.componentInstance.userAssignmentToEdit = userAssignment;
      dialogRef.componentInstance.submitted.subscribe(((response) => {
        this.userPersonaMappingService.updateUserAssignment(response).then(x => {
          this.userService.getUser(true);
          this.updateData();
        })
      }).bind(this));
    }
    else {
      dialogRef.componentInstance.title = this.local.deleteUserAssignment;
      dialogRef.componentInstance.submitted.subscribe(((response) => {
        this.userPersonaMappingService.createUserAssignment(response).then(x => {
          this.userService.getUser(true);
          this.updateData();
        })
      }).bind(this));
    }
  }
}
