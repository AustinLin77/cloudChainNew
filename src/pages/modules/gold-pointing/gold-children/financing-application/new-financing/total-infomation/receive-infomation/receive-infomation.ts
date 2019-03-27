import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalVariable} from "../../../../../../../../globalVariable/globalVariable"
/**
 * Generated class for the ReceiveInfomationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive-infomation',
  templateUrl: 'receive-infomation.html',
})
export class ReceiveInfomationPage {
  data={
    sendDate:'',
    receivableOrderNo:'',
    receivedDate:'',
    ownMonth:'',
    preTaxTotal:0
};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiveInfomationPage');
    this.data=this.navParams.get("data")[this.navParams.get("data").length-1];
    console.log(this.data);
    console.log(this.navParams.get("data"));

    this.data.preTaxTotal=GlobalVariable.dianjinRongziData.receiptsTotal;
  }
  submitFinancing(){
    GlobalVariable.dianjinRongziData.sendDate=this.data.sendDate;
    GlobalVariable.dianjinRongziData.receivableOrderNo=this.data.receivableOrderNo;
    GlobalVariable.dianjinRongziData.receivedDate=this.data.receivedDate;
    GlobalVariable.dianjinRongziData.ownMonth=this.data.ownMonth;
    this.navCtrl.pop()
  }
}
