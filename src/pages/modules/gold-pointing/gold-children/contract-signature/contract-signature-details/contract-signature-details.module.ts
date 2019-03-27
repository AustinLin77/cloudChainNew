import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContractSignatureDetailsPage } from './contract-signature-details';

@NgModule({
  declarations: [
    ContractSignatureDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContractSignatureDetailsPage),
  ],
})
export class ContractSignatureDetailsPageModule {}
