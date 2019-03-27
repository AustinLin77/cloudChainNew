import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettlementDetailsPage } from './settlement-details';

@NgModule({
  declarations: [
    SettlementDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettlementDetailsPage),
  ],
})
export class SettlementDetailsPageModule {}
