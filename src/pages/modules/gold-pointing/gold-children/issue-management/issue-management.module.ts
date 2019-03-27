import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssueManagementPage } from './issue-management';

@NgModule({
  declarations: [
    IssueManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(IssueManagementPage),
  ],
})
export class IssueManagementPageModule {}
