import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVariable} from "../../../../../../../../globalVariable/globalVariable"
/**
 * Generated class for the MergeInfomationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-merge-infomation',
  templateUrl: 'merge-infomation.html',
})
export class MergeInfomationPage {
  data;
  number=0;
  total=0;
  taxTotal=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MergeInfomationPage');
    this.data=this.navParams.get("data");
    console.log(this.data);
    this.number=this.data.length;
    for(var i =0;i<this.data.length;i++){
      this.total+=this.data[i].preTaxTotal;
    }
    this.taxTotal=parseFloat((this.total*0.8).toFixed(2));
  }
  submitFinancing(){
    GlobalVariable.dianjinRongziData.billNo=this.number;
    GlobalVariable.dianjinRongziData.sellerName=this.data[0].sellerName;
    GlobalVariable.dianjinRongziData.buyerName=this.data[0].buyerName;
    GlobalVariable.dianjinRongziData.orgDept=this.data[0].orgDept;
    this.navCtrl.pop()
  }
}
