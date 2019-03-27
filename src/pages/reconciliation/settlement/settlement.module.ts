import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettlementPage } from './settlement';

@NgModule({
  declarations: [
    SettlementPage,
  ],
  imports: [
    IonicPageModule.forChild(SettlementPage),
  ],
})
export class SettlementPageModule {}
