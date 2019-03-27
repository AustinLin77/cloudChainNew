import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events} from 'ionic-angular';
import { GlobalVariable} from "../../../../../../../../globalVariable/globalVariable"
/**
 * Generated class for the DeleteAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delete-account',
  templateUrl: 'delete-account.html',
})
export class DeleteAccountPage {
  tips='这是备注信息';
  data={};
  headData={
    totalPrice:0,
    type:"",
    sellerName:"",
    buyerName:"",
    myDateStart:"",
    myDateEnd:"",
    preferMonth:"",
    dept:"",
    countDays:"",
    tips:"",
    buyerId:'',
    remarks:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteAccountPage');
    this.data=this.navParams.get('data');
    this.headData=GlobalVariable.dianjinHeadData;
    console.log(this.headData)
  }
  deleteAcount(){
    this.events.publish('pop:data',this.data, Date.now());
    this.navCtrl.pop();
  }
}
