import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinancingApplicationDetailsPage } from './financing-application-details';

@NgModule({
  declarations: [
    FinancingApplicationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FinancingApplicationDetailsPage),
  ],
})
export class FinancingApplicationDetailsPageModule {}
