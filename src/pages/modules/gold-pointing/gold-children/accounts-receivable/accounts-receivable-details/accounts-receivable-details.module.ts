import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountsReceivableDetailsPage } from './accounts-receivable-details';

@NgModule({
  declarations: [
    AccountsReceivableDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountsReceivableDetailsPage),
  ],
})
export class AccountsReceivableDetailsPageModule {}
