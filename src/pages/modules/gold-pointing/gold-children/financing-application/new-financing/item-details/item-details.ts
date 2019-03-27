import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  data={
    receivableOrderNo:'',
    sellerName:'',
    buyerName:'',
    orgDept:'',
    sendDate:'',
    receivedDate:'',
    expectedPayDate:'',
    preTaxTotal:'',
    ownMonth:'',
    createDate:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
    this.data=this.navParams.get("data");
    console.log(this.data)
  }

}
