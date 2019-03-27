import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import {GlobalVariable} from "../../../../../../../globalVariable/globalVariable"
/**
 * Generated class for the AddDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-details',
  templateUrl: 'add-details.html',
})
export class AddDetailsPage {
  sellerName='';
  buyerName='';
  myDateEnd='';
  preferMonth='';
  dept='';
  receivableOrderNo='';
  preTaxTotal:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {
  }

  ionViewDidLoad() {
    console.log(GlobalVariable.dianjinHeadData);
    console.log('ionViewDidLoad AddDetailsPage');
    this.sellerName=this.navParams.get('data').sellerName;
    this.buyerName=this.navParams.get('data').buyerName;
    this.myDateEnd=this.navParams.get('data').myDateEnd;
    this.preferMonth=this.navParams.get('data').preferMonth;
    this.dept=this.navParams.get('data').dept;
  }
  save(){
    this.events.publish('pop:data',this.preTaxTotal, Date.now());

    var item={"receivableOrderNo":this.receivableOrderNo,"preTaxTotal":this.preTaxTotal};
    GlobalVariable.dianjinArrayData.push(item);
    console.log(GlobalVariable.dianjinArrayData);
    GlobalVariable.dianjinCodeData.push(this.receivableOrderNo);
    console.log(GlobalVariable.dianjinCodeData);
    this.navCtrl.pop()
  }
  cancel(){
    this.receivableOrderNo='';
    this.preTaxTotal=0;
  }
}
