import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import {GlobalVariable} from "../../../../../../../globalVariable/globalVariable"
/**
 * Generated class for the DetailsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-list',
  templateUrl: 'details-list.html',
})
export class DetailsListPage {
  myTotal=0;
  headData;
  pageSize=7;
  pageNo=1;
  showSearch='false';
  conlist = []; //展示的数据
  showNoContent:boolean = false;//是否有数据
  cancelOrSearch: number = 1;
  closeScrol:boolean=false;
  infiniteScroll;
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events){
    events.subscribe('pop:data', (data, time) => {
      console.log('StorageDocumentsPage pop data');
      console.log(data);
      this.removeDatas(data);
    });
  }
  ionViewDidLoad(){
    console.log(GlobalVariable.dianjinArrayData);
    if(JSON.stringify(GlobalVariable.dianjinHeadData) == "{}"){
      console.log("空对象")
    }else{
      this.headData=GlobalVariable.dianjinHeadData;
      console.log(GlobalVariable.dianjinHeadData)
    }
    console.log(GlobalVariable.dianjinArrayData)
    this.conlist = GlobalVariable.dianjinArrayData;
    if(this.conlist.length==0){
      this.showNoContent=!this.showNoContent
    }
  }
  itemTapped($event, data){
    this.navCtrl.push('DeleteAccountPage', {'data': data});
  }
  removeDatas(data){
    for (var i = 0; i < this.conlist.length; i++) {
      if(this.conlist[i].receivableOrderNo === data.receivableOrderNo) {
        this.conlist.splice(i, 1);
        break;
      }
    }
    for (var  b= 0; b < GlobalVariable.dianjinCodeData.length; b++) {
      if(GlobalVariable.dianjinCodeData[i] === data.receivableOrderNo) {
        GlobalVariable.dianjinCodeData.splice(i, 1);
        break;
      }
    }
    console.log(GlobalVariable.dianjinArrayData);
    if(GlobalVariable.dianjinArrayData.length!=0){
      for(var a=0;a<GlobalVariable.dianjinArrayData.length;a++){
        this.myTotal+=GlobalVariable.dianjinArrayData[i].preTaxTotal;
        console.log(GlobalVariable.dianjinArrayData[i].preTaxTotal)
      }
    }

    console.log(this.myTotal)
    GlobalVariable.dianjinHeadData.totalPrice=this.myTotal;
    console.log(GlobalVariable.dianjinHeadData)
    if(GlobalVariable.dianjinArrayData.length==0){
      this.showNoContent=!this.showNoContent;
      GlobalVariable.dianjinHeadData.totalPrice=0
    }
  }

}
