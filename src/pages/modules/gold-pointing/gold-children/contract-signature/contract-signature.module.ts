import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContractSignaturePage } from './contract-signature';

@NgModule({
  declarations: [
    ContractSignaturePage,
  ],
  imports: [
    IonicPageModule.forChild(ContractSignaturePage),
  ],
})
export class ContractSignaturePageModule {}
