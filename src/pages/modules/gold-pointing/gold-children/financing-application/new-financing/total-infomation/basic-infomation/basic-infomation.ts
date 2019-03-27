import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Events } from 'ionic-angular';
import { GlobalVariable} from "../../../../../../../../globalVariable/globalVariable"
import $ from 'jquery'
/**
 * Generated class for the BasicInfomationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basic-infomation',
  templateUrl: 'basic-infomation.html',
})
export class BasicInfomationPage {
  showSelect:boolean=false;
  personList;
  person;
  applicantName='';
  telephone='';
  comfirmName='';
  buyerParentId='';
  data={
    socialCreditCode:'',
    sellerName:'',
    buyerName:'',
    orgDept:'',
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertController:AlertController, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicInfomationPage');
    this.data=this.navParams.get("data")[0];
    console.log(this.data);

    this.comfirmName=GlobalVariable.dianjinRongziData.accounting;
    this.applicantName=GlobalVariable.dianjinRongziData.applicant;
    this.telephone=GlobalVariable.dianjinRongziData.applicantTell;
    this.buyerParentId=this.navParams.get("buyerParentId");
    this.data.socialCreditCode=GlobalVariable.dianjinRongziData.socialCreditCode
    console.log(this.buyerParentId);
    this.getKuaiji();
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
  }
  mySelect(){
    this.personList=this.person;
    this.showSelect=!this.showSelect
  }
  closeSelect(){
    this.showSelect=!this.showSelect
  }
  changeList(list){
    this.personList = list.child;
    console.log(this.personList);
    if(!list.child || list.child.length == 0){
      this.comfirm();
      if(list.type == 0){
        let alert = this.alertController.create({
          title: '温馨提示',
          subTitle: '该选项不是应付会计名,不可选中',
          buttons: ['确定']
        });
        alert.present();
        this.comfirmName="";
        return
      }
      this.comfirmName=list.name;
    }
  }
  comfirm(){
    console.log(this.comfirmName);
    this.showSelect=!this.showSelect
  }
  getKuaiji(){
    let that = this;
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/finance/getOfficeTreeData?type=3&parentIds='+this.buyerParentId,
      type: "get",
      data : {},
      success: function (res) {
        console.log(res);
        that.person=res;
        that.personList=res;
        console.log(that.person)
      },
      error: function () {
      }
    })
  }
  submitFinancing(){
    // GlobalVariable.dianjinRongziData.socialCreditCode=this.data.socialCreditCode;
    GlobalVariable.dianjinRongziData.applicant=this.applicantName;
    GlobalVariable.dianjinRongziData.applicantTell=this.telephone;
    GlobalVariable.dianjinRongziData.accounting=this.comfirmName;
    this.navCtrl.pop()
    this.events.publish('pop:data',this.data, Date.now());
  }
  checkTel(){
    if(this.telephone==''){
      let alert = this.alertController.create({
        title: '温馨提示',
        subTitle: '联系人电话不能为空',
        buttons: ['确定']
      });
      alert.present();
      return
    }else if(!(/^1[34578]\d{9}$/.test(this.telephone))){
      this.telephone=''
      let alert = this.alertController.create({
        title: '温馨提示',
        subTitle: '手机号有误,请重新填写',
        buttons: ['确定']
      });
      alert.present();
      return ;
    }
  }
}
