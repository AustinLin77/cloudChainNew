import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,Events,Navbar, AlertController } from 'ionic-angular';
import { GlobalVariable} from '../../../../../../globalVariable/globalVariable';
import $ from 'jquery'
import {ViewChild } from '@angular/core';
/**
 * Generated class for the AddAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-account',
  templateUrl: 'add-account.html',
})
export class AddAccountPage {
  @ViewChild(Navbar) navBar: Navbar;
  buyerId:'';
  totalData;
  tips='';
  totalPrice=0;
  preferMonth='';
  countDays='';
  myDateStart='';
  myDateEnd='';
  dept='';
  type='';
  sellerName='';
  buyerName='';
  selectOptionsOne;
  selectOptionsTwo;
  selectOptionsThree;
  myShowSearch='false';
  showTool:boolean=false;

  typeData=[{'name':'发票','value':'3'},{'name':'收货','value':'2'},{'name':'订单','value':'1'}];
  buyerList=[];
  deptList=[{'data':[1,2,3]}];
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public events: Events,private alertCtrl: AlertController) {
    events.subscribe('pop:data', (data, time) => {
     this.totalPrice+=parseInt(data);
     GlobalVariable.dianjinHeadData.totalPrice=this.totalPrice
    });
  }
  backButtonClick = (e: UIEvent) => {
    GlobalVariable.dianjinArrayData=[];
    GlobalVariable.dianjinCodeData=[];
    GlobalVariable.dianjinHeadData={
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
    this.navCtrl.push('AccountsReceivablePage');
  };
  ionViewDidLoad() {
    console.log(this.totalPrice)
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad AddAccountPage');
    this.sellerName=localStorage.getItem("name");
    this.selectOptionsOne={
      title: '选择类型',
      mode: 'md'
    };
    this.selectOptionsTwo={
      title: '选择买方',
      mode: 'md'
    };
    this.selectOptionsThree={
      title: '选择买方事业部',
      mode: 'md'
    };
    this.getBuyer()
  }
  myShowTool(){
    this.showTool=!this.showTool
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
    });
    toast.present();
  }
  addAccounts(){
    this.showTool=!this.showTool;
    for(var i=0;i<this.buyerList.length;i++){
      if(this.buyerName==this.buyerList[i].name){
        this.buyerId=this.buyerList[i].id;
        break;
      }
    }
    if(!this.type||!this.sellerName||!this.buyerName||!this.myDateStart||!this.myDateEnd||!this.preferMonth||!this.dept){
      this.presentToast("标红星项为必填项，请填写完整！")
    }else{
      this.totalData={
        'buyerId':this.buyerId,
        'totalPrice':this.totalPrice,
        'type':this.type,
        'sellerName':this.sellerName,
        'buyerName':this.buyerName,
        'myDateStart':this.myDateStart,
        "myDateEnd":this.myDateEnd,
        "preferMonth":this.preferMonth,
        "dept":this.dept,
        "countDays":this.countDays,
        "tips":this.tips
      };
      GlobalVariable.dianjinHeadData=this.totalData;
      this.navCtrl.push('AddDetailsPage',{"data":this.totalData});
    }


  }
  goDetailsList(){
    for(var i=0;i<this.buyerList.length;i++){
      if(this.buyerName==this.buyerList[i].name){
        this.buyerId=this.buyerList[i].id;
        break;
      }
    }
    this.showTool=!this.showTool;
    this.totalData={
      'buyerId':this.buyerId,
      'totalPrice':this.totalPrice,
      'type':this.type,
      'sellerName':this.sellerName,
      'buyerName':this.buyerName,
      'myDateStart':this.myDateStart,
      "myDateEnd":this.myDateEnd,
      "preferMonth":this.preferMonth,
      "dept":this.dept,
      "countDays":this.countDays,
      "tips":this.tips
    };
    GlobalVariable.dianjinHeadData=this.totalData;
    this.navCtrl.push('DetailsListPage');
  }
  getBuyer(){
    let that = this;
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/receive/getBuyer',
      data: {},
      type: "get",
      success: function (res) {
        console.log(res);
        that.buyerList=res.dataInfo.listData;
        that.deptList=res.dataInfo.singleData;
      },
      error: function () {
      }
    })
  }
  selectDept(){
    let that = this;
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/receive/getBuyer?buyerName='+this.buyerName,
      data: {},
      type: "get",
      success: function (res) {
        console.log(res);
        that.buyerList=res.dataInfo.listData;
        that.deptList=res.dataInfo.singleData;
      },
      error: function () {
      }
    })
  }
  //两个时间相差天数 兼容firefox chrome
  datedifference(sDate1, sDate2) {
    var dateSpan, tempDate, iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
  };
  count(){
    if(this.myDateEnd==''||this.myDateStart==''){
      return
    }else{
      this.countDays=this.datedifference(this.myDateStart,this.myDateEnd)
    }
  }
  removePalce(){
    document.getElementById("firstIn").removeAttribute('placeholder');
  }
  removePalce1(){
    document.getElementById("secondIn").removeAttribute('placeholder');
  }
  removePalce2(){
    document.getElementById("thirdIn").removeAttribute('placeholder');
  }
  addPalce(){
    var a =document.getElementById("firstIn");
    if(this.myDateStart==''){
      a.setAttribute('placeholder','  请选择申请日期')
    }
  }
  addPalce1(){
    var a =document.getElementById("secondIn");
    if(this.myDateEnd==''){
      a.setAttribute('placeholder','  请选择到期日期')
    }
  }
  addPalce2(){
    var a =document.getElementById("thirdIn");
    if(this.preferMonth==''){
      a.setAttribute('placeholder','  请选择月份')
    }
  }
  checkCodeList(){
    console.log(GlobalVariable.dianjinCodeData);
    let that = this;
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/receive/checkInvoice',
      type: "post",
      contentType: "application/json;charset=utf-8",
      data : JSON.stringify( GlobalVariable.dianjinCodeData),
      success: function (res) {
        console.log(res);
        if(res.result=='true'){
          that.realSubmit()
        }else{
          let alert = that.alertCtrl.create({
            title: '温馨提示',
            subTitle: '提交结果有已存在的发票号'+res.list+" , 请修改发票号后重新提交",
            buttons: ['确定']
          });
          alert.present();
        }
      },
      error: function () {
      }
    })
  }
  realSubmit(){
    var receivableAccount={
      "id":"",
      "expendStatus":"-1",
      "seller":localStorage.getItem("sellerId"),
      "sellerName":GlobalVariable.dianjinHeadData.sellerName,
      "type":GlobalVariable.dianjinHeadData.type, //3:发票，2：收获，1：订单
      "buyer":GlobalVariable.dianjinHeadData.buyerId,
      "preTaxTotal":GlobalVariable.dianjinHeadData.totalPrice,
      "sendDate":GlobalVariable.dianjinHeadData.myDateStart,
      "receivedDate":GlobalVariable.dianjinHeadData.myDateEnd,
      "expectedPayDate":GlobalVariable.dianjinHeadData.countDays,
      "ownMonth":GlobalVariable.dianjinHeadData.preferMonth,
      "orgDept":GlobalVariable.dianjinHeadData.dept,
      "remarks":GlobalVariable.dianjinHeadData.tips
    };
    console.log(receivableAccount);
    var list=GlobalVariable.dianjinArrayData;
    for(var i=0;i<GlobalVariable.dianjinArrayData.length;i++){
      list[i].check='';
      list[i].lineno=i+1;
      list[i].sellerName=GlobalVariable.dianjinHeadData.sellerName;
      list[i].type=GlobalVariable.dianjinHeadData.type;
      list[i].sendDate=GlobalVariable.dianjinHeadData.myDateStart;
      list[i].expectedPayDate=GlobalVariable.dianjinHeadData.countDays;
      list[i].buyerName=GlobalVariable.dianjinHeadData.buyerName;
      list[i].receivedDate=GlobalVariable.dianjinHeadData.myDateEnd;
      list[i].ownMonth=GlobalVariable.dianjinHeadData.preferMonth;
      list[i].orgDept=GlobalVariable.dianjinHeadData.dept;
      list[i].remarks='';

    }
    console.log(GlobalVariable.dianjinArrayData);
    var totalData={
      receivableAccount:receivableAccount,
      list:list
    };
    let that = this;
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/receive/save?userId='+localStorage.getItem("userId"),
      type: "post",
      contentType: "application/json;charset=utf-8",
      data : JSON.stringify( totalData),
      success: function (res) {
        console.log(res);
        if(res.message=='应收账款保存成功'){
          GlobalVariable.dianjinArrayData=[];
          GlobalVariable.dianjinCodeData=[];
          GlobalVariable.dianjinHeadData={
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
           that.navCtrl.push('AccountsReceivablePage')
        }else{
          let alert = this.alertCtrl.create({
            title: '温馨提示',
            subTitle: res.message,
            buttons: ['确定']

          });
          alert.present();
        }
      },
      error: function () {
      }
    })
  }

  submit() {
    if(GlobalVariable.dianjinArrayData.length==0){
      let alert = this.alertCtrl.create({
        title: '温馨提示',
        subTitle: '请添加明细行后再进行提交',
        buttons: ['确定']
      });
      alert.present();
    }else{
      this.checkCodeList();
    }
  }
}
