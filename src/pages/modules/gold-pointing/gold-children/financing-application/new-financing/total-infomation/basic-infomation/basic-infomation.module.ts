import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BasicInfomationPage } from './basic-infomation';

@NgModule({
  declarations: [
    BasicInfomationPage,
  ],
  imports: [
    IonicPageModule.forChild(BasicInfomationPage),
  ],
})
export class BasicInfomationPageModule {}
