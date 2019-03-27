import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController} from 'ionic-angular';
import $ from 'jquery';
import { GlobalVariable} from '../../../../../../globalVariable/globalVariable';
/**
 * Generated class for the ContractSignatureDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contract-signature-details',
  templateUrl: 'contract-signature-details.html',
})
export class ContractSignatureDetailsPage {
  action:'';
  apiid:'';
  content:'';
  key:'';
  signed:'';
  loginName='';
  already = 1;//选中的class
  ifLoading:boolean=false;
  ifQianzhang:boolean=false;
  showTool:boolean=false;
  showHandler:boolean=false;
  data;
  myData;
  roleName;
  financingApply;
  receivableAccount;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    this.data = navParams.get('data');
    this.myData = navParams.get('myData');
    this.loginName=localStorage.getItem("username");
    this.roleName=localStorage.getItem("roleName");
    this.financingApply = this.data;
    this.receivableAccount = this.myData
  }
  ionViewDidLoad(){}
  onPageTypeChange(type) {
    this.already = type;
  }//点击切换状态方法
  mySign(){
    let that = this;
    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    loading.present();
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/contract/syncsigndoc?id='+this.data.id,
      data: {},
      type: "get",
      success: function (res) {
        console.log(res);
        loading.dismiss();
        if(res.statusCode==200){
          that.navCtrl.push('ContractSignaturePage')
        }
      },
      error: function () {
      }
    })
  }//缔约方法
  signature(){
    this.ifLoading=!this.ifLoading;
    this.ifQianzhang=true;
    var data;
    if(this.roleName=='Vendor'){
      data={
        financingNo:this.data.financingNo,
        party:'B',
        userType:'Vendor'
      }
    }else if(this.roleName=='BusinessManager'&& this.loginName=='fkjl'){
      data={
        financingNo:this.data.financingNo,
        party:'A'
      }
    }
    let that = this;
    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    loading.present();
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/contract/SignContract',
      data: data,
      type: "get",
      success: function (res) {
        console.log(res);
        that.action=res.dataInfo.singleData.action;
        that.apiid=res.dataInfo.singleData.apiid;
        that.content=res.dataInfo.singleData.content;
        that.signed=res.dataInfo.singleData.signed;
        that.key=res.dataInfo.singleData.key;
        console.log( that.apiid)
        setTimeout(function () {
          var a= document.forms['myProxyForm'];
          a.submit();
          loading.dismiss();
          that.ifLoading=!that.ifLoading
        },1000);

      },
      error: function () {
      }
    })
  }//签章方法
  seeSign(){
    this.ifQianzhang=true;
    let that = this;
    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    loading.present();
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/contract/viewContract?notaryid='+this.data.notaryid,
      data: {},
      type: "get",
      success: function (res) {
        console.log(res);
        that.action=res.dataInfo.singleData.action;
        that.apiid=res.dataInfo.singleData.apiid;
        that.content=res.dataInfo.singleData.content;
        that.signed=res.dataInfo.singleData.signed;
        that.key=res.dataInfo.singleData.key;
        setTimeout(function () {

          var b= document.forms['myProxyForm'];
          b.submit();
          loading.dismiss();
        },1000);
      },
      error: function () {
      }
    })
  }//查看合同方法
  closeQianzhang(){
    this.ifQianzhang=!this.ifQianzhang
  }//关闭iframe
}
