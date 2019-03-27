import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,Navbar,AlertController } from 'ionic-angular';
import { GlobalVariable} from "../../../../../../../globalVariable/globalVariable"
import $ from 'jquery'
import {ViewChild } from '@angular/core';
import {THIS_EXPR} from "@angular/compiler/src/output/output_ast";
/**
 * Generated class for the TotalInfomationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-total-infomation',
  templateUrl: 'total-infomation.html',
})
export class TotalInfomationPage {
  @ViewChild(Navbar) navBar: Navbar;
  data;
  status1='0%';
  status2='0%';
  preTaxTotal=0;
  receivableOrderNo='';
  buyerParentId='';
  accountList;
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,public alertController:AlertController) {
    events.subscribe('pop:data', (data, time) => {
      this.changeStatus1()
    });
    events.subscribe('pop:data2', (data, time) => {
      console.log(data)
      if(data.length==0){
        this.status2='0%'
      }else if(data.length==1){
        this.status2='20%'
      }else if(data.length==2){
        this.status2='40%'
      }else if(data.length==3){
        this.status2='60%'
      }else if(data.length==4){
        this.status2='80%'
      }else if(data.length==5){
        this.status2='100%'
      }
    });
  }
  backButtonClick = (e: UIEvent) => {
    GlobalVariable.dianjinRongziData={
      id:"",
      sellerName:"中国能源建设集团庆元新能源有限公司",
      socialCreditCode:"33112600002201W",
      buyerName:"欣旺达电子股份有限公司",
      orgDept:"电池事业一部",
      applicant:"",
      applicantTell:"",
      accounting:"",
      sendDate:"2019-02-26",
      receivedDate:"2019-02-27",
      ownMonth:"2019-02",
      receivableOrderNo:"2019022601",
      receiptsTotal:0,
      companyId:"中国能源建设集团庆元新能源有限公司",
      financingNo:"DJ01161",
      billList:[],
      ratio:0.8,
      possibleLoanTotal:0,
      financingDate:null,
      rate:0.12,
      loanTotal:0,
      startDate:"",
      endDate:"",
      deadline:0,
      payway:"1",
      gatherAccount:"",
      financeType:"",
      salemanId:"",
      saleman:"",
      billNo:1
    }
    this.navCtrl.push('NewFinancingPage');
  };
  changeStatus1(){
    if(GlobalVariable.dianjinRongziData.applicantTell==''&&GlobalVariable.dianjinRongziData.applicant==''&&GlobalVariable.dianjinRongziData.accounting==''){
      this.status1='0%'
    }else if(GlobalVariable.dianjinRongziData.applicantTell!=''&&GlobalVariable.dianjinRongziData.applicant!=''&&GlobalVariable.dianjinRongziData.accounting!=''){
      this.status1='100%'
    }else if((GlobalVariable.dianjinRongziData.applicantTell==''&&GlobalVariable.dianjinRongziData.applicant==''&&GlobalVariable.dianjinRongziData.accounting!='')||
      (GlobalVariable.dianjinRongziData.applicantTell==''&&GlobalVariable.dianjinRongziData.applicant!=''&&GlobalVariable.dianjinRongziData.accounting=='')||
      (GlobalVariable.dianjinRongziData.applicantTell!=''&&GlobalVariable.dianjinRongziData.applicant==''&&GlobalVariable.dianjinRongziData.accounting=='')){
      this.status1='33%'
    }else if((GlobalVariable.dianjinRongziData.applicantTell==''&&GlobalVariable.dianjinRongziData.applicant!=''&&GlobalVariable.dianjinRongziData.accounting!='')||
      (GlobalVariable.dianjinRongziData.applicantTell!=''&&GlobalVariable.dianjinRongziData.applicant!=''&&GlobalVariable.dianjinRongziData.accounting=='')||
      (GlobalVariable.dianjinRongziData.applicantTell!=''&&GlobalVariable.dianjinRongziData.applicant==''&&GlobalVariable.dianjinRongziData.accounting!='')){
      this.status1='66%'
    }
  }
  // changeStatus2(){
  //   if(GlobalVariable.dianjinRongziData.loanTotal==''&&GlobalVariable.dianjinRongziData.saleman==''&&GlobalVariable.dianjinRongziData.startDate==''&&GlobalVariable.dianjinRongziData.gatherAccount==''&&GlobalVariable.dianjinRongziData.financeType==''){
  //     this.status2='0%'
  //   }else if(GlobalVariable.dianjinRongziData.loanTotal!=''&&GlobalVariable.dianjinRongziData.saleman!=''&&GlobalVariable.dianjinRongziData.startDate!=''&&GlobalVariable.dianjinRongziData.gatherAccount!=''&&GlobalVariable.dianjinRongziData.financeType!=''){
  //     this.status2='100%'
  //   }else if((GlobalVariable.dianjinRongziData.loanTotal!=''&&GlobalVariable.dianjinRongziData.saleman==''&&GlobalVariable.dianjinRongziData.startDate==''&&GlobalVariable.dianjinRongziData.gatherAccount==''&&GlobalVariable.dianjinRongziData.financeType=='')||
  //   (GlobalVariable.dianjinRongziData.loanTotal==''&&GlobalVariable.dianjinRongziData.saleman!=''&&GlobalVariable.dianjinRongziData.startDate==''&&GlobalVariable.dianjinRongziData.gatherAccount==''&&GlobalVariable.dianjinRongziData.financeType=='')||
  //     (GlobalVariable.dianjinRongziData.loanTotal==''&&GlobalVariable.dianjinRongziData.saleman==''&&GlobalVariable.dianjinRongziData.startDate!=''&&GlobalVariable.dianjinRongziData.gatherAccount==''&&GlobalVariable.dianjinRongziData.financeType=='')||
  //     (GlobalVariable.dianjinRongziData.loanTotal==''&&GlobalVariable.dianjinRongziData.saleman==''&&GlobalVariable.dianjinRongziData.startDate==''&&GlobalVariable.dianjinRongziData.gatherAccount!=''&&GlobalVariable.dianjinRongziData.financeType=='')||
  //     (GlobalVariable.dianjinRongziData.loanTotal==''&&GlobalVariable.dianjinRongziData.saleman!=''&&GlobalVariable.dianjinRongziData.startDate==''&&GlobalVariable.dianjinRongziData.gatherAccount==''&&GlobalVariable.dianjinRongziData.financeType!='')){
  //     this.status2='20%'
  //   }else if((GlobalVariable.dianjinRongziData.loanTotal!=''&&GlobalVariable.dianjinRongziData.saleman==''&&GlobalVariable.dianjinRongziData.startDate==''&&GlobalVariable.dianjinRongziData.gatherAccount==''&&GlobalVariable.dianjinRongziData.financeType=='')||
  //     (GlobalVariable.dianjinRongziData.loanTotal==''&&GlobalVariable.dianjinRongziData.saleman!=''&&GlobalVariable.dianjinRongziData.startDate==''&&GlobalVariable.dianjinRongziData.gatherAccount==''&&GlobalVariable.dianjinRongziData.financeType=='')||
  //     (GlobalVariable.dianjinRongziData.loanTotal==''&&GlobalVariable.dianjinRongziData.saleman==''&&GlobalVariable.dianjinRongziData.startDate!=''&&GlobalVariable.dianjinRongziData.gatherAccount==''&&GlobalVariable.dianjinRongziData.financeType=='')||
  //     (GlobalVariable.dianjinRongziData.loanTotal==''&&GlobalVariable.dianjinRongziData.saleman==''&&GlobalVariable.dianjinRongziData.startDate==''&&GlobalVariable.dianjinRongziData.gatherAccount!=''&&GlobalVariable.dianjinRongziData.financeType=='')||
  //     (GlobalVariable.dianjinRongziData.loanTotal==''&&GlobalVariable.dianjinRongziData.saleman!=''&&GlobalVariable.dianjinRongziData.startDate==''&&GlobalVariable.dianjinRongziData.gatherAccount==''&&GlobalVariable.dianjinRongziData.financeType!='')){
  //     this.status2='20%'
  //   }
  // }
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    this.getSubmitData();
    console.log('ionViewDidLoad TotalInfomationPage');
    this.data=this.navParams.get("data");
    console.log(this.data);
    for(var i=0;i<this.data.length;i++){
      this.preTaxTotal+=this.data[i].preTaxTotal;
      this.receivableOrderNo=this.receivableOrderNo+this.data[i].receivableOrderNo+',';

      GlobalVariable.dianjinRongziData.billList.push(this.data[i].id);
    }
    GlobalVariable.dianjinRongziData.billNo= this.data.length;
    GlobalVariable.dianjinRongziData.receiptsTotal= this.preTaxTotal;
    GlobalVariable.dianjinRongziData.companyId=localStorage.getItem("name");
    GlobalVariable.dianjinRongziData.sendDate=this.data[0].sendDate;
    GlobalVariable.dianjinRongziData.receivableOrderNo=this.receivableOrderNo;


    GlobalVariable.dianjinRongziData.receivableOrderNo = GlobalVariable.dianjinRongziData.receivableOrderNo.substr(0,GlobalVariable.dianjinRongziData.receivableOrderNo.length-1);
    GlobalVariable.dianjinRongziData.receivedDate=this.data[0].receivedDate;

    GlobalVariable.dianjinRongziData.ownMonth=this.data[0].ownMonth;
    console.log(GlobalVariable.dianjinRongziData.receivableOrderNo)
  }
  goMergeInfomation(){
    this.navCtrl.push('MergeInfomationPage',{data:this.data})
  }
  goBasicInfomation(){
    this.navCtrl.push('BasicInfomationPage',{data:this.data,buyerParentId:this.buyerParentId})
  }
  goReceiveInfomation(){
    this.navCtrl.push('ReceiveInfomationPage',{data:this.data})
  }
  goApplyInfomation(){
    this.navCtrl.push('ApplyInfomationPage',{data:this.data,accountList:this.accountList})
  }
  getSubmitData(){
    let that = this;

    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/finance/toAdd?userId='+localStorage.getItem("userId"),
      type: "get",
      data : {},
      success: function (res) {
        console.log(res);
        that.buyerParentId=res.extData.buyerParentId;
        that.accountList=res.extData.loanAccounts;
        GlobalVariable.dianjinRongziData.financingNo=res.extData.financingNo;
        GlobalVariable.dianjinRongziData.socialCreditCode=res.extData.financingApply.socialCreditCode;

        console.log(GlobalVariable.dianjinRongziData.socialCreditCode)
      },
      error: function () {
      }
    })
  }
  submitFinancing(){
    if(this.status1!='100%'||this.status2!='100%'){
      let alert = this.alertController.create({
        title: '温馨提示',
        subTitle: '请您填写完整信息再进行提交 , 谢谢配合 !',
        buttons: ['确定']
      });
      alert.present();
      return

    }else{
      let that = this;
      $.ajax({
        url: GlobalVariable.dianjinHeader+'app/finance/save?billFlag=fill&loginName='+localStorage.getItem("username"),
        type: "post",
        contentType: "application/json;charset=utf-8",
        data : JSON.stringify( GlobalVariable.dianjinRongziData),
        success: function (res) {
          console.log(res);
          if(res.message=='保存融资申请成功'){
            that.navCtrl.push('NewFinancingPage');
            GlobalVariable.dianjinRongziData={
              id:"",
              sellerName:"中国能源建设集团庆元新能源有限公司",
              socialCreditCode:"33112600002201W",
              buyerName:"欣旺达电子股份有限公司",
              orgDept:"电池事业一部",
              applicant:"",
              applicantTell:"",
              accounting:"",
              sendDate:"2019-02-26",
              receivedDate:"2019-02-27",
              ownMonth:"2019-02",
              receivableOrderNo:"2019022601",
              receiptsTotal:0,
              companyId:"中国能源建设集团庆元新能源有限公司",
              financingNo:"DJ01161",
              billList:[],
              ratio:0.8,
              possibleLoanTotal:0,
              financingDate:null,
              rate:0.12,
              loanTotal:0,
              startDate:"",
              endDate:"",
              deadline:0,
              payway:"1",
              gatherAccount:"",
              financeType:"",
              salemanId:"",
              saleman:"",
              billNo:1
            }
          }
        },
        error: function () {
        }
      })
    }

  }
}
