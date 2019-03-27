import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoldMainPage } from './gold-main';

@NgModule({
  declarations: [
    GoldMainPage,
  ],
  imports: [
    IonicPageModule.forChild(GoldMainPage),
  ],
})
export class GoldMainPageModule {}
