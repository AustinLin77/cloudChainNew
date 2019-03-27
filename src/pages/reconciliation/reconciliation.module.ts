import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReconciliationPage } from './reconciliation';

@NgModule({
  declarations: [
    ReconciliationPage,
  ],
  imports: [
    IonicPageModule.forChild(ReconciliationPage),
  ],
})
export class ReconciliationPageModule {}
