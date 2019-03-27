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
    selector: 'page-accounts-receivable',
    templateUrl: 'accounts-receivable.html',
  })
  export class AccountsReceivablePage {
    @ViewChild(Navbar) navBar: Navbar;
    roleName='';
    myInput='';
    name='';
    pageSize=7;
    pageNo=1;
    conlist = []; //展示的数据
    already = 99;//选中的class
    showSearch='false';
    showNoContent = false;//是否有数据
    cancelOrSearch: number = 1;
    statuId:any=0;
    closeScrol:boolean=false;
    showTool:boolean=false;
    infiniteScroll;
    backStatus;
    sendP;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.backStatus = navParams.get('backStatus');
      if(this.backStatus){
        this.already=this.backStatus
      }
      this.roleName=localStorage.getItem("roleName");
      this.name=localStorage.getItem("name");
      console.log(this.roleName);
      console.log(this.name);
      if(this.roleName=='BusinessManager'){
        this.sendP='';
        this.already=-1
      }else if(this.roleName=='Vendor'){
        this.sendP='sellerName';
        this.already=99
      }else{
        this.sendP='buyerName';
        this.already=99
      }
      this.getData()
    }
    myShowTool(){
      this.showTool=!this.showTool
    }
    backButtonClick = (e: UIEvent) => {
      this.navCtrl.push('GoldMainPage');
    };//监听tab栏返回按钮
    ionViewDidLoad() {
      this.navBar.backButtonClick = this.backButtonClick;
      this.conlist = [{name:289187717,},{name:289187717,},{name:289187717,},{name:289187717,},{name:289187717,}];
    }
    getData(){
      let that = this;
      if(this.already==99){
        this.statuId=''
      }else{
        this.statuId=this.already
      }
      $.ajax({
        url: GlobalVariable.dianjinHeader+'app/receive/list',
        data: {
          companyType: this.roleName,
          name:that.name,
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          expendStatus: this.statuId
        },
        type: "get",
        success: function (res) {
          console.log(res);
          that.getDataSuccess(res)
        },
        error: function () {
        }
      })
    }//页面加载获取数据方法
    getData2(){
      if(this.statuId==99){
        this.statuId=''
      }
      console.log(this.statuId);
      let that = this;
      $.ajax({
        url: GlobalVariable.dianjinHeader+'app/receive/list',
        data: {
          companyType: this.roleName,
          name:that.name,
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          expendStatus:this.statuId
        },
        type: "get",
        success: function (res) {
          console.log(res);
          that.getDataSuccess(res)
        },
        error: function () {
        }
      })
    }//状态切换获取更多数据方法
    getScrollDataSuccess(res){
      this.pageNo++;
      for(let i in res.extData.list){
        this.conlist.push(res.extData.list[i])
      }
      if(this.conlist.length>=res.extData.count){
        this.closeScrol=true
      }
      for(let i in this.conlist){
        switch(this.conlist[i].expendStatus){
          case '-1':
            this.conlist[i].expendStatus='新建';
            break;
          case '0':
            this.conlist[i].expendStatus='待审核';
            break;
          case '1':
            this.conlist[i].expendStatus='审核通过';
            break;
          case '2':
            this.conlist[i].expendStatus='已使用';
            break;
          case '10':
            this.conlist[i].expendStatus='未通过';
            break;
        }
      }
    }//获取下拉加载更多数据后回调方法
    onCancelOrSearch(type) {
      this.cancelOrSearch = type;
      if(type == 0) {
        this.showTool=!this.showTool;
        this.showSearch='true';
      } else {
        this.myInput = '';
        this.showSearch='false';
      }
    }//搜索栏显示隐藏方法
    getDataSuccess(res){
      console.log(res);
      this.pageNo++;
      if(res.extData.list.length==0){
        this.showNoContent=true;
      }
      this.conlist=res.extData.list;
      if(this.conlist.length>=res.extData.count){
        this.closeScrol=true
      }
      for(var i in this.conlist){
        switch(this.conlist[i].expendStatus){
          case '-1':
          this.conlist[i].expendStatus='新建';
          break;
          case '0':
            this.conlist[i].expendStatus='待审核';
            break;
          case '1':
            this.conlist[i].expendStatus='审核通过';
            break;
          case '2':
            this.conlist[i].expendStatus='已使用';
            break;
          case '10':
            this.conlist[i].expendStatus='未通过';
            break;
        }
      }
      console.log(this.conlist)
    }//获取数据成功回调方法
    onPageTypeChange(type,infiniteScroll) {
      this.pageNo=1;
      this.closeScrol=false;
      this.showNoContent=false;
      if(infiniteScroll){
        infiniteScroll.enable(true);
        console.log(document.getElementsByClassName("content")[0]);
        document.getElementById("myCon").getElementsByTagName("div")[1].scrollTo(0,0)//回滚到顶部
      }
      console.log(type);
      this.already = type;
      this.statuId=type;
      this.getData2();
    }//状态切换调用方法
    doInfinite(infiniteScroll) {
      var param;
      if(this.statuId==99){
      param={
          companyType: this.roleName,
          name:this.name,
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          expendStatus:''
        }
      }else{
        param={
          companyType: this.roleName,
          name:this.name,
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          expendStatus:this.statuId
        }
      }
      let that=this;
      this.infiniteScroll = infiniteScroll;
      if (this.closeScrol) {
        infiniteScroll.enable(false);
      }else{
        $.ajax({
          url: GlobalVariable.dianjinHeader+'app/receive/list',
          data: param,
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
    }//下拉获取更多数据方法
    itemTapped($event, data) {
      this.navCtrl.push('AccountsReceivableDetailsPage', {'data': data});
    }//点击具体项跳转方法
    myGoSearch(){
      let that = this;
      if(this.already==99){
        this.statuId=''
      }else{
        this.statuId=this.already
      }
      $.ajax({
        url: GlobalVariable.dianjinHeader+'app/receive/list',
        data: {
          companyType: this.roleName,
          name:that.name,
          expendStatus: this.statuId,
          receivableOrderNo:this.myInput
        },
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
      this.navCtrl.push('AddAccountPage');
    }//跳转到应收账款新增页面
  }
