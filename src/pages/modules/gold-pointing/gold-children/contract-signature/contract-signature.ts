import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import {ViewChild } from '@angular/core';
import $ from 'jquery'
import { GlobalVariable} from '../../../../../globalVariable/globalVariable';
/**
 * Generated class for the ContractSignaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contract-signature',
  templateUrl: 'contract-signature.html',
})
export class ContractSignaturePage {
  @ViewChild(Navbar) navBar: Navbar;
  roleName='';
  name='';
  userId='';
  statuId=0;
  pageSize=7;
  pageNo=1;
  already = 0;//选中的class
  closeScrol:boolean=false;
  showNoContent = false;//是否有数据
  conlist = []; //展示的数据
  paramData;
  infiniteScroll;
  loginName;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  backButtonClick = (e: UIEvent) => {
    this.navCtrl.push('GoldMainPage');
  };//监听tab栏返回按钮
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    this.conlist = [{name:289187717,},{name:289187717,},{name:289187717,},{name:289187717,},{name:289187717,}];
    this.roleName=localStorage.getItem("roleName");
    this.loginName=localStorage.getItem("username");
    this.name=localStorage.getItem("name");
    this.userId=localStorage.getItem("userId");
    console.log(this.name);
    this.getData()
  }//页面加载获取路由数据
  getData(){
    let that = this;
    var data;
    if(this.roleName=='Vendor'){
      data={
        companyType:this.roleName,
        companyName:this.name,
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        type:this.already
      }
    }else if(this.roleName=='BusinessManager'&& this.loginName=='ywjl'){
      data={
        companyType:this.roleName,
        userId:this.userId,
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        type:this.already
      }
    }else{
      data={
        companyType:this.roleName,
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        type:this.already
      }
    }
    this.paramData=data;
    $.ajax({
      url: GlobalVariable.dianjinHeader+'app/contract/list',
      data:data,
      type: "get",
      success: function (res) {
        console.log(res);
        that.getDataSuccess(res)
      },
      error: function () {
      }
    })
  }//页面加载获取数据
  getScrollDataSuccess(res){
    this.pageNo++;
    for(let i in res.extData.list){
      this.conlist.push(res.extData.list[i])
    }
    for(var i in this.conlist){
      if(this.conlist[i].notaryid!=null){
        this.conlist[i].myStatus='已生效'
      }else if(this.conlist[i].signStatus==3){
        this.conlist[i].myStatus='甲方已签'
      }else if(this.conlist[i].signStatus==1){
        this.conlist[i].myStatus='已缔约'
      }else if(this.conlist[i].signStatus==5){
        this.conlist[i].myStatus='乙方已签'
      }else if(this.conlist[i].signStatus!=5&&this.conlist[i].signStatus!=3&&this.conlist[i].signType=='2'&&this.conlist[i].signStatus!=1){
        this.conlist[i].myStatus='已修改'
      }else if(this.conlist[i].signStatus!=5&&this.conlist[i].signStatus!=3&&this.conlist[i].signType=='3'&&this.conlist[i].signStatus!=1){
        this.conlist[i].myStatus='已废除'
      }else{
        this.conlist[i].myStatus='未缔约'
      }
    }//判断合同所处状态
    if(this.conlist.length>=res.extData.count){
      this.closeScrol=true
    }
  }//获取下拉加载数据后回调方法
  getDataSuccess(res){
    this.pageNo++;
    console.log(this.pageNo)
    if(res.extData.list.length==0){
      this.showNoContent=true;
    }
    this.conlist=res.extData.list;
    for(var i in this.conlist){
      if(this.conlist[i].notaryid!=null){
        this.conlist[i].myStatus='已生效'
      }else if(this.conlist[i].signStatus==3){
        this.conlist[i].myStatus='甲方已签'
      }else if(this.conlist[i].signStatus==1){
        this.conlist[i].myStatus='已缔约'
      }else if(this.conlist[i].signStatus==5){
        this.conlist[i].myStatus='乙方已签'
      }else if(this.conlist[i].signStatus!=5&&this.conlist[i].signStatus!=3&&this.conlist[i].signType=='2'&&this.conlist[i].signStatus!=1){
        this.conlist[i].myStatus='已修改'
      }else if(this.conlist[i].signStatus!=5&&this.conlist[i].signStatus!=3&&this.conlist[i].signType=='3'&&this.conlist[i].signStatus!=1){
        this.conlist[i].myStatus='已废除'
      }else{
        this.conlist[i].myStatus='未缔约'
      }
    }//判断合同所处状态
    if(this.conlist.length>=res.extData.count){
      this.closeScrol=true
    }
  }//成功获取数据回调方法
  onPageTypeChange(type,infiniteScroll) {
    this.pageNo=1;
    this.closeScrol=false;
    this.showNoContent=false;
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
    var data;
    if(this.roleName=='Vendor'){
      data={
        companyType:this.roleName,
        companyName:this.name,
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        type:this.already
      }
    }else if(this.roleName=='BusinessManager'&& this.loginName=='ywjl'){
      data={
        companyType:this.roleName,
        userId:this.userId,
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        type:this.already
      }
    }else{
      data={
        companyType:this.roleName,
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        type:this.already
      }
    }
    console.log(data);
    let that=this;
    this.infiniteScroll = infiniteScroll;
    if (this.closeScrol) {
      infiniteScroll.enable(false);
    }else{
      $.ajax({
        url: GlobalVariable.dianjinHeader+'app/contract/list',
        data:data,
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
    let that = this;
    var myData;
      $.ajax({
        url: GlobalVariable.dianjinHeader+'app/finance/detail?id='+data.id+'&processInstanceId='+data.processInstanceId,
        data: {},
        type: "get",
        success: function (res) {
          console.log(res);
          myData=res.dataInfo.singleData;
          console.log(myData);
          that.navCtrl.push('ContractSignatureDetailsPage', {'data': data,'myData':myData});},
        error: function () {
        }
      });
  }//点击具体项方法
}
