import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountsReceivablePage } from './accounts-receivable';

@NgModule({
  declarations: [
    AccountsReceivablePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountsReceivablePage),
  ],
})
export class AccountsReceivablePageModule {}
