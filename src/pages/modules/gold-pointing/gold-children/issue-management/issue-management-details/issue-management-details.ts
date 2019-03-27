import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController} from 'ionic-angular';
import { GlobalVariable} from '../../../../../../globalVariable/globalVariable';
import $ from 'jquery'
/**
 * Generated class for the IssueManagementDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-issue-management-details',
  templateUrl: 'issue-management-details.html',
})
export class IssueManagementDetailsPage {
  loginName='';
  already = 1;//选中的class
  data;
  financingApply;
  receivableAccount;
  showTool:boolean=false;
  showHandler:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    this.data = navParams.get('data');
    this.loginName=localStorage.getItem("username");
    this.financingApply=this.data.financingApply;
    this.receivableAccount=this.data.receivableAccount
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueManagementDetailsPage');
    console.log(this.data);
    if(this.data.stauts=='运行中'){
      this.showTool=!this.showTool
    }
  }//页面加载初始化
  onPageTypeChange(type) {
    this.already = type;
  }//页面状态切换方法
  myShowHandler(){
    this.showTool=!this.showTool;
    this.showHandler=!this.showHandler;
  }//功能按钮显示隐藏方法
  myHandler(){
    let alert = this.alertCtrl.create({
      title: '审批意见',
      inputs: [
        {
          name: 'opinion',
          placeholder: '请填写审批意见'
        },
      ],
      buttons: [
        {
          text: '驳回',
          handler: data => {
            this.userHandler(0,data.opinion)
          }
        },
        {
          text: '通过',
          handler: data => {
            this.userHandler(1,data.opinion)
          }
        }
      ]
    });
    alert.present();
  }//点击审批弹框方法
  userHandler(status,opinion){
    let that = this;
    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    loading.present();
    $.ajax({
      url:GlobalVariable.dianjinHeader+'app/finance/handleTask?loginName='+this.loginName+'&pId='+this.data.pId+'&taskId='+this.data.taskId+'&isPass='+status+'&comment='+opinion,
      data: {},
      type: "get",
      success: function (res) {
        console.log(res);
        loading.dismiss();
        if(res.statusCode==200){
          that.navCtrl.push('IssueManagementPage')
        }
      },
      error: function () {
      }
    })
  }//用户审批操作方法
}
