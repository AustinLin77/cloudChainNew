import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import $ from 'jquery';
import { GlobalVariable} from '../../../../../../globalVariable/globalVariable';
/**
 * Generated class for the AccountsReceivableDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accounts-receivable-details',
  templateUrl: 'accounts-receivable-details.html',
})
export class AccountsReceivableDetailsPage {
  data;
  flagName;
  myDateStart='1';
  myDateEnd='1';
  preTaxTotal='1';
  status='1';
  roleName='1';
  userId='1';
  userName='1';
  ifEdit:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    this.roleName=localStorage.getItem("roleName");
    this.userName=localStorage.getItem("username");
    this.userId=localStorage.getItem("userId");
    this.data = navParams.get('data');
    this.myDateStart= this.data.sendDate;
    this.myDateEnd= this.data.receivedDate;
    this.preTaxTotal= this.data.preTaxTotal;
    this.status= this.data.expendStatus;
    switch (this.status){
      case '0':
        this.status='待审核';
        break;
      case '-1':
        this.status='新建';
        break;
      case '1':
        this.status='审核通过';
        break;
      case '2':
        this.status='已使用';
        break;
      case '10':
        this.status='未通过';
        break;
    }
    console.log(this.status)
  }
  ionViewDidLoad(){}
  edit(){
    this.ifEdit=!this.ifEdit;
    this.flagName=this.roleName;
    this.roleName=''
  }//点击修改操作
  cancel(){
    this.ifEdit=!this.ifEdit;
    this.roleName=this.flagName;
    this.flagName=''
  }//取消修改操作
  save(){
    let that = this;
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/receive/update?id='+this.data.id+'&sendDate='+this.myDateStart+'&receivedDate='+this.myDateEnd,
      data: {},
      type: "get",
      success: function (res) {
        console.log(res);
        if(res.statusCode==200){
          that.navCtrl.push('AccountsReceivablePage')
        }
      },
      error: function () {
      }
    })
  }//保存修改操作
  opinion(){
    let that = this;
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/receive/confirm?id='+this.data.id+'&expendStatus=0',
      data: {},
      type: "get",
      success: function (res) {
        console.log(res);
        if(res.statusCode==200){
          that.navCtrl.push('AccountsReceivablePage',{'backStatus':0 })
        }else {
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
  }//点击确认操作
  comfirma(){
    let alert = this.alertCtrl.create({
      title: '应收账款审核选择操作',
      buttons: [
        {
          text: '驳回',
          handler: () => {
            this.userSelect(10)
          }
        },
        {
          text: '通过',
          handler: () => {
            this.userSelect(1)
          }
        }
      ]
    });
    alert.present();
  }//点击审核弹框
  userSelect(status){
    let that = this;
    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    loading.present();
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/receive/audit?id='+this.data.id+'&expendStatus='+status+'&userId='+this.userId,
      data: {},
      type: "get",
      success: function (res) {
        console.log(res);
        loading.dismiss();
        if(res.statusCode==200){
          that.navCtrl.push('AccountsReceivablePage')
        }
      },
      error: function () {
      }
    })
  }//用户审核操作
}
