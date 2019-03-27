import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceDetailPage } from './invoice-detail';

@NgModule({
  declarations: [
    InvoiceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceDetailPage),
  ],
})
export class InvoiceDetailPageModule {}
