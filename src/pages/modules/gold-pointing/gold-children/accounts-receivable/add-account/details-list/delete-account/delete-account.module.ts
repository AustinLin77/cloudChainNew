import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteAccountPage } from './delete-account';

@NgModule({
  declarations: [
    DeleteAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteAccountPage),
  ],
})
export class DeleteAccountPageModule {}
