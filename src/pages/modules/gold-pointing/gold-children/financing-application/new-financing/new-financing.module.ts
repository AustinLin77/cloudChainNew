import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewFinancingPage } from './new-financing';

@NgModule({
  declarations: [
    NewFinancingPage,
  ],
  imports: [
    IonicPageModule.forChild(NewFinancingPage),
  ],
})
export class NewFinancingPageModule {}
