import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerateCountPage } from './generate-count';

@NgModule({
  declarations: [
    GenerateCountPage,
  ],
  imports: [
    IonicPageModule.forChild(GenerateCountPage),
  ],
})
export class GenerateCountPageModule {}
