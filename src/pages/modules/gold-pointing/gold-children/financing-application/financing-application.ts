import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import {ViewChild } from '@angular/core';
import { GlobalVariable} from '../../../../../globalVariable/globalVariable';
import $ from 'jquery'
/**
 * Generated class for the FinancingApplicationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-financing-application',
  templateUrl: 'financing-application.html',
})
export class FinancingApplicationPage {
  @ViewChild(Navbar) navBar: Navbar;
  roleName='';
  myInput='';
  name='';
  role2='';
  role3='';
  statuId=0;
  pageSize=7;
  pageNo=1;
  already = 0;//选中的class
  showSearch='false';
  conlist = []; //展示的数据
  showNoContent = false;//是否有数据
  cancelOrSearch: number = 1;
  closeScrol:boolean=false;
  showTool:boolean=false;
  infiniteScroll;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  myShowTool(){
    this.showTool=!this.showTool
  }
  backButtonClick = (e: UIEvent) => {
    this.navCtrl.push('GoldMainPage');
  };//监听tab栏返回键按钮
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    this.conlist = [{name:289187717,},{name:289187717,},{name:289187717,},{name:289187717,},{name:289187717,}];
    this.roleName=localStorage.getItem("roleName");
    this.name=localStorage.getItem("name");
    if(localStorage.getItem("roleName")=='Vendor'){
      this.role2='审批中';
      this.role3='已审批'
    }else{
      this.role2='待审核';
      this.role3='已审核'
    }
    this.getData()
  }//页面加载初始化方法
  onCancelOrSearch(type) {
    this.cancelOrSearch = type;
    if(type == 0) {
      this.showTool=!this.showTool
      this.showSearch='true';
    } else {
      this.myInput = '';
      this.showSearch='false';
    }
  }//搜索栏显示或隐藏方法
  getData(){
    let that = this;
    var data;
    if(localStorage.getItem("roleName")=='Vendor'){
     data={
        companyType:this.roleName,
        name:this.name,
        pageSize:this.pageSize,
        pageNo:this.pageNo,
        statuId:this.statuId
      }
    }else{
      data={
        companyType:this.roleName,
        pageSize:this.pageSize,
        pageNo:this.pageNo,
        statuId:this.statuId
      }
    }
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/finance/list',
      data: data,
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
    for(var i in res.extData.list){
      this.conlist.push(res.extData.list[i])
    }
    if(this.conlist.length>=res.extData.count){
      this.closeScrol=true
    }
  }//获取下拉加载更多数据后回调方法
  getDataSuccess(res){
    this.pageNo++;
    if(res.extData.list.length==0){
      this.showNoContent=true;
    }
    this.conlist=res.extData.list;
    if(this.conlist.length>=res.extData.count){
      this.closeScrol=true
    }
  }//获取数据成功后回调方法
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
    this.already = type;
    this.statuId=type;
    this.getData();
  }//页面状态切换方法
  doInfinite(infiniteScroll) {
    let that=this;
    var data;
    if(localStorage.getItem("roleName")=='Vendor'){
      data={
        companyType:this.roleName,
        name:this.name,
        pageSize:this.pageSize,
        pageNo:this.pageNo,
        statuId:this.statuId
      }
    }else{
      data={
        companyType:this.roleName,
        pageSize:this.pageSize,
        pageNo:this.pageNo,
        statuId:this.statuId
      }
    }
    this.infiniteScroll = infiniteScroll;
    if (this.closeScrol) {
      infiniteScroll.enable(false);
    }else{
      $.ajax({
        url: GlobalVariable.dianjinHeader+'app/finance/list',
        data: data,
        type: "get",
        success: function (res) {
          that.getScrollDataSuccess(res);
          infiniteScroll.complete();
        },
        error: function () {
        }
      })
    }
  }//下拉加载更多方法
  itemTapped($event, data) {
    this.navCtrl.push('FinancingApplicationDetailsPage', {'data': data});
  }//点击具体项方法
  myGoSearch(){
    let that = this;
    var data;
    if(localStorage.getItem("roleName")=='Vendor'){
      data={
        companyType:this.roleName,
        name:this.name,
        statuId:this.statuId,
        financingNo:this.myInput
      }
    }else{
      data={
        companyType:this.roleName,
        statuId:this.statuId,
        financingNo:this.myInput
      }
    }
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/finance/list',
      data: data,
      type: "get",
      success: function (res) {
        console.log(res);
        that.getDataSuccess(res)
      },
      error: function () {
      }
    })
  }//点击确定进行搜索方法
  addAccounts(){
    this.showTool=!this.showTool;
    this.navCtrl.push('NewFinancingPage');
  }//跳转到应收账款新增页面
}
