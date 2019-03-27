import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { HttpServicelocal } from '../../../service/HttpServicelocal';
import {ViewChild } from '@angular/core';
/**
 * Generated class for the SettlementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settlement',
  templateUrl: 'settlement.html',
})
export class SettlementPage {
  @ViewChild(Navbar) navBar: Navbar
  type='';
  closeScrol:boolean=false;
  data=[];
  key='';
  buyerCompany='';
  buyerDept='';
  address='';
  // addressList=[1,2,3];
  deptList=[];
  companyList=[];
  siftStartDate='';
  siftEndDate='';
  personStatus=0;//供应商或者采购商角色 供应商为0
  showTool:boolean=false;
  myShowSearch='false';
  showSearchLoaction='false';
  showSift:boolean=false;
  pageNum: number = 1;
  pageSize: number = 4;
  alreadyOne='true';
  alreadyTwo='false';
  alreadyThree='false';
  alreadyFourth='false';
  dataSource1: any = [1,2];
  paramType='';
  auditStatus=0;
  infiniteScroll:null;
  showNoContent:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServicelocal, ) {
  }
  backButtonClick = (e: UIEvent) => {
    this.navCtrl.push('ReconciliationPage');

  };
  myShowTool(){
    this.showTool=!this.showTool;
  }
  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    if (this.closeScrol) {
      infiniteScroll.enable(false);
    }else if(this.buyerCompany==''||this.siftStartDate==''||this.siftEndDate==''){
          this.httpService.getUser('api/purchase/app/settle/head/list',
            {
              pageSize: this.pageSize,
              pageNum: this.pageNum,
              state: this.type
            }
          ).then(res => {
            this.handleInfiniteSuccess(res);
            infiniteScroll.complete();
          });
    }else{
      this.httpService.postWithHeadersNew('api/purchase/app/settle/head/list-q?pageSize='+this.pageSize+'&pageNum='+this.pageNum+'&isCopy=1',
        {
          ouName:this.buyerDept,
          customerName:this.buyerCompany,
          settleCode:'',
          beginDate:this.siftStartDate,
          toDate:this.siftEndDate,
          state:this.auditStatus
        }
      ).then(res => this.handleSiftSuccess(res));
    }
  }
  handleUserInfoSuccess(res){
    this.showNoContent=false;
    console.log("bbbd")
    if(res.data.length==0){
      console.log("11112")
      this.showNoContent=true
    }
    this.data=res.data;
    console.log(this.data)
    this.pageNum++;
    if(this.data.length>=res.total){
      this.closeScrol=true
    }
    this.getCompanyList();
  }
  handleInfiniteSuccess(res){
    for(var item in res.data){
      this.data.push(res.data[item]);
    }
    this.pageNum++;
    if(this.data.length>=res.total){
      this.closeScrol=true
    }
  }
  closeSift(){
    this.showSift=!this.showSift;
  }
  cancel(){
    this.buyerCompany='';
    this.buyerDept='';
    this.siftStartDate='';
    this.siftEndDate='';
    // this.showSift=!this.showSift;
  }
  sift(infiniteScroll){
    if(infiniteScroll){
      infiniteScroll.enable(true);
      document.getElementById("myCon").getElementsByTagName("div")[1].scrollTo(0,0)//回滚到顶部
    }
    this.showSift=!this.showSift;
    console.log(this.showSift);
    this.showTool=!this.showTool
  }
  onPageTypeChange(type,infiniteScroll) {
    if(infiniteScroll){
      infiniteScroll.enable(true);
      document.getElementById("myCon").getElementsByTagName("div")[1].scrollTo(0,0)//回滚到顶部
    }
    this.pageNum=1;
    this.closeScrol=false;
    this.paramType=type;
    this.auditStatus=type;
    console.log(type);
    if(type=='1'){
      this.getData('0');
      this.alreadyOne='true';
      this.alreadyTwo='false';
      this.alreadyThree='false';
      this.alreadyFourth='false';
      this.auditStatus = 0;
    }else if(type=='0'){
      this.getData('1');
      this.alreadyOne='false';
      this.alreadyTwo='true';
      this.alreadyThree='false';
      this.alreadyFourth='false';
      this.auditStatus = 1;
    }else if(type=='4'){
      this.getData('8');
      this.alreadyOne='false';
      this.alreadyTwo='false';
      this.alreadyThree='true';
      this.alreadyFourth='false';
      this.auditStatus =8;
    } else if(type=='2'){
      this.getData('5');
      this.alreadyOne='false';
      this.alreadyTwo='false';
      this.alreadyThree='true';
      this.alreadyFourth='false';
      this.auditStatus = 5;
    }else if(type=='3'){
      this.getData('7');
      this.alreadyOne='false';
      this.alreadyTwo='false';
      this.alreadyThree='false';
      this.alreadyFourth='true';
      this.auditStatus = 7;
    }else if(type=='5'){
      this.getData('4');
      this.alreadyOne='true';
      this.alreadyTwo='false';
      this.alreadyThree='false';
      this.alreadyFourth='false';
      this.auditStatus = 4;
    }

    // this.obtainDatas();
  }
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    var role=localStorage.getItem("role");
    if(role=='0'){
      this.personStatus=0
    }else{
      this.personStatus=1
    }
    if(this.personStatus==0){
      this.getData('0');
      this.paramType='1'
    }else{
      this.getData('4');
      this.paramType='5'
    }
    console.log('ionViewDidLoad SettlementPage');

  }
  getCompanyList(){
    this.httpService.getUser('api/companys/app/get',
      {
        nopaging:'nopaging',
        auditStatus: 0
      }
    ).then(res => this.handleGetUserListSuccess(res)).catch(error =>{
      console.log("error")
    });
  }
  selectDept(){
    this.httpService.getUser('api/offices/app/name',
      {
        companyName:this.buyerCompany,
      }
    ).then(res => this.handleGetDeptListSuccess(res));
  }
  handleGetUserListSuccess(res){
    console.log(res);
    for(var i in res.data){
      this.companyList.push(res.data[i].name)
    }

  }
  handleGetDeptListSuccess(res){
    console.log(res);
    for(var i in res.data){
      this.deptList=res.data
    }

  }
  getData(type){
    this.type=type;
    var paramData;
    if(this.personStatus==0){
      paramData={
        pageSize:this.pageSize,
        pageNum:this.pageNum,
        state:type,
      }
    }else{
      paramData={



        pageSize:this.pageSize,
        pageNum:this.pageNum,
        state:type,
        isCopy:1
      }
    }
    this.httpService.getUser('api/purchase/app/settle/head/list',paramData).then(res => this.handleUserInfoSuccess(res)).catch(error =>{
      console.log("error")
    });
  }
  reset(){
    this.buyerCompany='';
    this.buyerDept='';
    this.siftStartDate='';
    this.siftEndDate='';
    this.showSift=!this.showSift;
  }
  handleSiftSuccess(res){
    this.showNoContent=false;
    this.data=[];
    if(res.data.length==0){
      this.showNoContent=true
    }
    for(var item in res.data){
      this.data.push(res.data[item]);
    }
    this.pageNum++;
    if(this.data.length>=res.total){
      this.closeScrol=true
    }
    this.reset()
  }
  confirm(){
    this.pageNum=1;
    this.httpService.postWithHeadersNew('api/purchase/app/settle/head/list-q?pageSize='+this.pageSize+'&pageNum='+this.pageNum+'&isCopy=1',
      {
        ouName:this.buyerDept,
        customerName:this.buyerCompany,
        settleCode:'',
        beginDate:this.siftStartDate,
        toDate:this.siftEndDate,
        state:this.auditStatus
      }
    ).then(res => this.handleSiftSuccess(res));
  }
  searchNum(){
    this.myShowSearch='true';
    this.showTool=!this.showTool

  }
  submitSearch(){
    this.httpService.postWithHeadersNew('api/purchase/app/settle/head/list-q',
      {
        ouName:'',
        customerName:'',
        settleCode:this.key,
        beginDate:'',
        toDate:'',
        state:''
      }
    ).then(res => this.handleSearchSuccess(res));
  }
  handleSearchSuccess(res){
     this.data=res.data;
     this.showSearchLoaction='true';
     console.log(document.getElementsByClassName("fixed-content")[0]);

     document.getElementById("myCon").getElementsByClassName("fixed-content")[0].setAttribute('style', 'margin-top: 51px !important');



     document.getElementById("myCon").getElementsByClassName("scroll-content")[0].setAttribute('style', 'margin-top: 51px !important');
     this.closeSearch()
  }
  closeSearch(){
    this.myShowSearch="false";
  }
  itemTapped($event, data) {
    console.log(this.paramType);
    this.showTool=false;
    this.navCtrl.push('SettlementDetailsPage', {'data': data.id,'personStatus':this.personStatus,'type':this.paramType});
  }
  //解决移动端input[type=date]时placeHolder不显示方法 需与css同时使用
  removePalce(){
     document.getElementById("firstIn").removeAttribute('placeholder');
  }
  removePalce1(){
    document.getElementById("secondIn").removeAttribute('placeholder');
  }
  addPalce(){
    var a =document.getElementById("firstIn");
    if(this.siftStartDate==''){
    a.setAttribute('placeholder','  开始区间')
    }
  }
  addPalce1(){
    var a =document.getElementById("secondIn");
    if(this.siftEndDate==''){
      a.setAttribute('placeholder','  结束区间')
    }
  }
}
