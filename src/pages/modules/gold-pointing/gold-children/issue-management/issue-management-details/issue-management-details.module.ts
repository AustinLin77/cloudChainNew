import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssueManagementDetailsPage } from './issue-management-details';

@NgModule({
  declarations: [
    IssueManagementDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(IssueManagementDetailsPage),
  ],
})
export class IssueManagementDetailsPageModule {}
