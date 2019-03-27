import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Navbar } from 'ionic-angular';
import { GlobalVariable} from "../../../../../../globalVariable/globalVariable"
import $ from 'jquery'
import {ViewChild } from '@angular/core';
/**
 * Generated class for the NewFinancingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-financing',
  templateUrl: 'new-financing.html',
})
export class NewFinancingPage {
  @ViewChild(Navbar) navBar: Navbar;
  totalSelect:number=0;
  pageSize=7;
  pageNo=1;
  conlist = []; //展示的数据
  showSearch='false';
  allSelect:boolean=false;
  showNoContent = false;//是否有数据
  cancelOrSearch: number = 1;
  closeScrol:boolean=false;
  showTool:boolean=false;
  infiniteScroll;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
  }
  backButtonClick = (e: UIEvent) => {
    this.navCtrl.push('FinancingApplicationPage');
  };
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad NewFinancingPage');
    this.getTicketList();
    this.conlist = [];
  }
  // submit(){
  //   this.navCtrl.push('TotalInfomationPage')
  // }

  getTicketList(){
    let that=this;
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/finance/receiveAccountList?type=3&sellerName='+localStorage.getItem("name"),
      data: {},
      type: "get",
      success: function (res) {
        console.log(res);
        for(var i=0;i<res.extData.length;i++){
          res.extData[i].singleSelect=false;
        }
        that.conlist=res.extData;
        if(that.conlist.length==0){
          that.showNoContent=!that.showNoContent
        }
        console.log(that.conlist)
      },
      error: function () {
      }
    })
  }

  mySingleSelect(item){
    this.totalSelect=0;
    for(var i=0;i<this.conlist.length;i++){
      if(this.conlist[i].singleSelect){
        this.totalSelect++
      }
    }
    if(this.totalSelect!=this.conlist.length){
      this.allSelect=false;
    }else{
      this.allSelect=true;
    }
    console.log(item.singleSelect)
  }
  myAllSelect(){
    this.totalSelect=0;
    if(this.allSelect){
      this.totalSelect=this.conlist.length;
      for(var i =0;i<this.conlist.length;i++){
        this.conlist[i].singleSelect=true;
      }
    }else{
      for(var a =0;a<this.conlist.length;a++){
        this.conlist[a].singleSelect=false;
      }
    }
  }
  submit(){
    var selectData=[];
    for(var i in this.conlist){
      if(this.conlist[i].singleSelect){
        selectData.push(this.conlist[i])
      }
    }
    if(selectData.length==1){
      this.navCtrl.push('TotalInfomationPage',{data:selectData});
      console.log("长度为1")
    }else{
      for(var a in selectData){
        for(var b in selectData){
          if(selectData[a].orgDept!=selectData[b].orgDept||selectData[a].sendDate!=selectData[b].sendDate||selectData[a].receivedDate!=selectData[b].receivedDate){
            let alert = this.alertCtrl.create({
              title: '温馨提示',
              subTitle: '所选发票应满足事业部和日期一致的条件，请重新勾选！',
              buttons: ['确定']
            });
            alert.present();
            return
          }else{
            this.navCtrl.push('TotalInfomationPage',{data:selectData})
            return
          }
        }
      }
    }
  }
  itemTapped($event, item){
    this.navCtrl.push('ItemDetailsPage',{data:item})
  }
}
