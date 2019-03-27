import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewStatementOfAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-statement-of-account',
  templateUrl: 'new-statement-of-account.html',
})
export class NewStatementOfAccountPage {
  companyOfBuyer='';
  deptOfBuyer='';
  inStoreDate='';
  selectOptions;
  type='';
  myType=[1,2,3];
  orderNum='';
  deliverNum='';
  specifications='';
  goodsNum='';
  person='';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.selectOptions={
      title: '选择类型',
      mode: 'md'
    };
  }

}
