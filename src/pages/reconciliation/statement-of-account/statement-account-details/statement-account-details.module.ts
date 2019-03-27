import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatementAccountDetailsPage } from './statement-account-details';

@NgModule({
  declarations: [
    StatementAccountDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StatementAccountDetailsPage),
  ],
})
export class StatementAccountDetailsPageModule {}
