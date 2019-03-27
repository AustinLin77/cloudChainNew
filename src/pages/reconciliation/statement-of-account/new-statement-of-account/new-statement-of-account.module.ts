import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewStatementOfAccountPage } from './new-statement-of-account';

@NgModule({
  declarations: [
    NewStatementOfAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(NewStatementOfAccountPage),
  ],
})
export class NewStatementOfAccountPageModule {}
