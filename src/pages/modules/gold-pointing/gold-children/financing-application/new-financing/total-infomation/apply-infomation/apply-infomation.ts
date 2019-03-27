import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { GlobalVariable} from "../../../../../../../../globalVariable/globalVariable"
import $ from 'jquery'
/**
 * Generated class for the ApplyInfomationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-infomation',
  templateUrl: 'apply-infomation.html',
})
export class ApplyInfomationPage {
  sellerId='';
  realCost=0;
  myDateEnd;
  myDateStart;
  cost=0;
  applyCost:number=0;
  apply='';
  account='';
  countDays=0;
  financingNo='';
  typeData=[{'data':[1,2,3]}];
  accountData=[];
  applyData=['比例预付','约定金额'];
  selectOptionsOne;
  selectOptionsTwo;
  selectOptionsThree;
  showSelect:boolean=false;
  personList;
  person;
  comfirmName='';
  totalTickets=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }

  ionViewDidLoad() {
    this.getManageData();
    this.account=GlobalVariable.dianjinRongziData.gatherAccount;
    this.realCost= GlobalVariable.dianjinRongziData.loanTotal;

    this.applyCost=GlobalVariable.dianjinRongziData.possibleLoanTotal;
    this.myDateStart=GlobalVariable.dianjinRongziData.startDate;
    this.myDateEnd=GlobalVariable.dianjinRongziData.endDate;
    this.countDays=GlobalVariable.dianjinRongziData.deadline;
    this.apply=GlobalVariable.dianjinRongziData.financeType;
    this.comfirmName=GlobalVariable.dianjinRongziData.saleman;
    console.log(GlobalVariable.dianjinRongziData.financingNo);
    this.financingNo=GlobalVariable.dianjinRongziData.financingNo;
    this.accountData=this.navParams.get('accountList');
    this.totalTickets=GlobalVariable.dianjinRongziData.billNo;
    this.cost=GlobalVariable.dianjinRongziData.receiptsTotal;

    this.myDateEnd=GlobalVariable.dianjinRongziData.receivedDate;

    this.applyCost=parseFloat((GlobalVariable.dianjinRongziData.receiptsTotal*0.8).toFixed(2));
    console.log(this.accountData);
    this.person=[
      {
        name:'1级',
        child:[{name:'2级', child:[{name:'3级'}]},{name:'2级', child:[{name:'3级'}]},{name:'2级', child:[{name:'3级'}]}]
      },
      {
        name:'1.1级'
      },
      {
        name:'1.2级'
      },
      {
        name:'1.3级'
      },
      {
        name:'1.4级'
      },
      {
        name:'1.5级'
      },
      {
        name:'1.6级'
      },
      {
        name:'1.7级'
      }
    ];
    this.personList=[
      {
        name:'1级',
        child:[{name:'2级', child:[{name:'3级'}]},{name:'2级', child:[{name:'3级'}]},{name:'2级', child:[{name:'3级'}]}]
      },
      {
        name:'1.1级'
      },
      {
        name:'1.2级'
      },
      {
        name:'1.3级'
      },
      {
        name:'1.4级'
      },
      {
        name:'1.5级'
      },
      {
        name:'1.6级'
      },
      {
        name:'1.7级'
      }
    ];
    console.log('ionViewDidLoad ApplyInfomationPage');
    this.selectOptionsOne={
      title: '选择类型',
      mode: 'md'
    };
    this.selectOptionsTwo={
      title: '选择收款账户',
      mode: 'md'
    };
    this.selectOptionsThree={
      title: '选择保理融资方式',
      mode: 'md'
    };
  }
  mySelect(){
    this.personList=this.person;
    this.showSelect=!this.showSelect
  }
  closeSelect(){
    this.showSelect=!this.showSelect
  }
  changeList(name){
    for(var i = 0;i<this.personList.length;i++){
      if(this.personList[i].name==name && this.personList[i].child && this.personList[i].child.length!=0) {
        this.personList = this.personList[i].child
      }else if(this.personList[i].name==name && this.personList[i].child.length==0){
        this.sellerId=this.personList[i].id;
        this.comfirmName=name;
        this.comfirm()
      }
    }
  }
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
    if(this.myDateStart==''){
      return
    }else{
      this.countDays=this.datedifference(this.myDateStart,this.myDateEnd)
    }
  }
  comfirm(){
    console.log(this.comfirmName);
    this.showSelect=!this.showSelect
  }
  removePalce(){
    document.getElementById("firstIn").removeAttribute('placeholder');
  }
  addPalce(){
    var a =document.getElementById("firstIn");
    if(this.myDateStart==''){
      a.setAttribute('placeholder','  请选择申请日期')
    }
  }
  getManageData(){
    let that = this;
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/finance/getOfficeTreeData?type=3&parentIds=0,1&name=业务部',
      type: "get",
      data : {},
      success: function (res) {
        console.log(res);
        that.person=res;
        that.personList=res;
      },
      error: function () {
      }
    })
  }

  submitFinancing(){
     GlobalVariable.dianjinRongziData.loanTotal=this.realCost;
     GlobalVariable.dianjinRongziData.possibleLoanTotal=this.applyCost;
     GlobalVariable.dianjinRongziData.startDate=this.myDateStart;
     GlobalVariable.dianjinRongziData.endDate=GlobalVariable.dianjinRongziData.receivedDate;
     GlobalVariable.dianjinRongziData.deadline=this.countDays;
     GlobalVariable.dianjinRongziData.gatherAccount=this.account;
     GlobalVariable.dianjinRongziData.financeType=this.apply;
     GlobalVariable.dianjinRongziData.saleman=this.comfirmName;
     GlobalVariable.dianjinRongziData.salemanId=this.sellerId;
     this.navCtrl.pop()
    var data=[];
     if(this.comfirmName!=''){
       data.push(this.comfirmName)
     }
    if(this.apply!=''){
      data.push(this.apply)
    }
    if(this.account!=''){
      data.push(this.account)
    }
    if(this.myDateStart!=''){
      data.push(this.myDateStart)
    }
    if(this.realCost!=0){
      data.push(this.realCost)
    }
    this.events.publish('pop:data2',data, Date.now());
  }
}
