import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreTicketDetailsPage } from './pre-ticket-details';

@NgModule({
  declarations: [
    PreTicketDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PreTicketDetailsPage),
  ],
})
export class PreTicketDetailsPageModule {}
