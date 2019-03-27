import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsListPage } from './details-list';

@NgModule({
  declarations: [
    DetailsListPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsListPage),
  ],
})
export class DetailsListPageModule {}
