import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinancingApplicationPage } from './financing-application';

@NgModule({
  declarations: [
    FinancingApplicationPage,
  ],
  imports: [
    IonicPageModule.forChild(FinancingApplicationPage),
  ],
})
export class FinancingApplicationPageModule {}
