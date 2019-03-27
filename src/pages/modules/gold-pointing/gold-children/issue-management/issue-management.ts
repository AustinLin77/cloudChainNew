import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import {ViewChild } from '@angular/core';
import { GlobalVariable} from '../../../../../globalVariable/globalVariable';
import $ from 'jquery'
/**
 * Generated class for the IssueManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-issue-management',
  templateUrl: 'issue-management.html',
})
export class IssueManagementPage {
  @ViewChild(Navbar) navBar: Navbar;
  loginName='';
  roleName='';
  name='';
  statuId=1;
  pageSize=7;
  pageNo=1;
  already = 1;//选中的class
  closeScrol:boolean=false;
  showNoContent = false;//是否有数据
  conlist ; //展示的数据
  infiniteScroll;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  backButtonClick = (e: UIEvent) => {
    this.navCtrl.push('GoldMainPage');
  };//监听tab栏返回按钮方法
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    this.roleName=localStorage.getItem("roleName");
    this.loginName=localStorage.getItem("username");
    this.name=localStorage.getItem("name");
    this.getData()
  }//页面初始化调用方法
  getData(){
    let that = this;
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/finance/todoList',
      // '?roleName='+this.roleName+'&name='+this.name+'&pageSize='+this.pageSize+'$pageNo='+this.pageNo,
      data: {
        loginName:this.loginName,
        matType :this.statuId,
        pageSize:this.pageSize,
        pageNo:this.pageNo,
        taskType:2
      },
      type: "get",
      success: function (res) {
        console.log(res);
        that.getDataSuccess(res)
      },
      error: function () {
      }
    })
  }//获取数据方法
  getScrollDataSuccess(res){
    this.pageNo++;
    for(var i in res.dataInfo.listData){
      this.conlist.push(res.dataInfo.listData[i])
    }
    if(this.conlist.length>=res.dataInfo.pageInfo.totalRecord){
      this.closeScrol=true
    }
  }//获取下拉加载更多数据方法
  getDataSuccess(res){
    console.log(res);
    this.pageNo++;
    if(res.dataInfo.listData.length==0){
      this.showNoContent=true;
    }
    this.conlist=res.dataInfo.listData;
    if(this.conlist.length>=res.dataInfo.pageInfo.totalRecord){
      this.closeScrol=true
    }
  }//获取数据成功回调方法
  onPageTypeChange(type,infiniteScroll) {
    this.pageNo=1;
    this.closeScrol=false;
    this.showNoContent=false;
    console.log(infiniteScroll);
    if(infiniteScroll){
      infiniteScroll.enable(true);
      console.log(document.getElementsByClassName("content")[0]);
      document.getElementById("myCon").getElementsByTagName("div")[1].scrollTo(0,0)//回滚到顶部
    }
    console.log(type);
    this.already = type;
    this.statuId=type;
    this.getData();
  }//页面状态切换方法
  doInfinite(infiniteScroll) {
    let that=this;
    this.infiniteScroll = infiniteScroll;
    if (this.closeScrol) {
      infiniteScroll.enable(false);
    }else{
      $.ajax({
        url: GlobalVariable.dianjinHeader+'app/finance/todoList',
        data: {
          loginName:this.loginName,
          matType :this.statuId,
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          taskType:2
        },
        type: "get",
        success: function (res) {
          console.log(res);
          that.getScrollDataSuccess(res);
          infiniteScroll.complete();
        },
        error: function () {
        }
      })
    }
  }//下拉加载更多方法
  itemTapped($event, data) {
    this.navCtrl.push('IssueManagementDetailsPage', {'data': data});
  }//点击具体项方法
}
