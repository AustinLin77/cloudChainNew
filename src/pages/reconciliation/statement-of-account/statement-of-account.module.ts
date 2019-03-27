import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatementOfAccountPage } from './statement-of-account';

@NgModule({
  declarations: [
    StatementOfAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(StatementOfAccountPage),
  ],
})
export class StatementOfAccountPageModule {}
