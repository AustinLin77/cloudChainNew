
import { IonicPage, NavController, NavParams, AlertController, Events,LoadingController } from 'ionic-angular';
import { HttpServicelocal } from '../../../service/HttpServicelocal';
import { Component,ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { NewStatementOfAccountPage} from "./new-statement-of-account/new-statement-of-account"
/**
 * Generated class for the StatementOfAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statement-of-account',
  templateUrl: 'statement-of-account.html',
})
export class StatementOfAccountPage {
  @ViewChild(Navbar) navBar: Navbar;
  closeScrol:boolean=false;
  count=1;
  key='';
  buyerCompany='';
  buyerDept='';
  address='';
  addressList=[];
  deptList=[];
  companyList=[];
  siftStartDate='';
  siftEndDate='';
  preferMonth='';
  myShowSearch='false';
  showSift:boolean=false;
  showTool:boolean=false;
  unread:number=0;
  headerParameters: any;
  auditStatus: string = '1';
  pageNum: number = 1;
  pageSize: number = 7;
  nextPage: number = 1;
  pages: number;
  dataSource: any = [];
  dataSource1: any = [];
  already:string='true';
  unready:string='false';
  dataSource2: any = [];
  showSearch:string='false';
  flag:number=0;
  showNoContent:boolean=false;
  showInfinite:boolean=true;
  myInput: string = '';
  currentYear=0;
  currentMonth=0;
  showSearchLoaction="false";
  searchLoactionData:any=["东莞李威","小米科技有限公司","石龙仔市场"];
  cancelOrSearch: number = 1;
  ifLoading:boolean=false;
  constructor(private httpService: HttpServicelocal, public navCtrl: NavController,
              public navParams: NavParams, public alertCtrl: AlertController,
             public events: Events,public loadingCtrl: LoadingController) {
    // events.subscribe('pop:myUnread', (number)=>{
    //   console.log(number);
    //   this.unread = number;
    //   if(this.unread==0){
    //     this.showNoContent=true
    //   }
    // })
    // events.subscribe('pop:data:pml', (data, time) => {
    //   console.log('OutboundManagementListPage pop data');
    //   console.log(data);
    //   // this.obtainDatas();
    //   console.log(this.dataSource1.length);
    //   this.removeDatas(data);
    // });

  }
  removeDatas(data) {
    for (var i = 0; i < this.dataSource1.length; i++) {
      if(this.dataSource1[i].id === data.id) {
        this.dataSource1.splice(i, 1);
        break;
      }
    }
  }
  submitSearch(){
    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    loading.present();
    this.httpService.postWithHeadersNew('api/purchase/app/precast/list',
      {
        ouName:'',
        corporateBody:'',
        currencyCode:'',
        address:'',
        deliveryNum:'',
        poCode:this.key,
        itemCode:'',
        itemDesc:'',
        buyer:'',
        poDateFrom:'',
        poDateTo:'',
        sumQty:'',
        sumMoney:'',
      }
    ).then(res => this.handleSearchSuccess(res,loading));
  }
  handleSearchSuccess(res,loading){
    loading.dismiss();
    if(res.data.length==0){
      this.showNoContent=true
    }
    this.dataSource1=res.data;
    console.log(res)
  }
  closeSearch(){
    this.myShowSearch="false";
  }
  reset(){
    this.showSift=!this.showSift;
    this.buyerCompany='';
    this.buyerDept='';
    this.address='';
    this.siftStartDate='';
    this.siftEndDate='';
    this.preferMonth='';
  }
  cancel(){
    this.preferMonth='';
    this.buyerCompany='';
    this.buyerDept='';
    this.address='';
    this.siftStartDate='';
    this.siftEndDate='';
    // this.showSift=!this.showSift;
  }
  confirm(){
    this.pageNum=1;
    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    loading.present();
    this.httpService.postWithHeadersNew('api/purchase/app/precast/list?pageSize='+this.pageSize+'&pageNum='+this.pageNum,
      {ouName:this.buyerDept,
        corporateBody:this.buyerCompany,
        currencyCode:'',
        address:this.address,
        deliveryNum:'',
        poCode:'',
        itemCode:'',
        itemDesc:'',
        buyer:'',
        monthDate:this.preferMonth,
        poDateFrom:this.siftStartDate,
        poDateTo:this.siftEndDate,
        sumQty:'',
        sumMoney:'',
      }
    ).then(res => this.handleSiftSuccess(res,loading));
  }
  searchNum(){
    this.myShowSearch="true";
    this.showTool=!this.showTool
  }
  sift(){
    this.showSift=!this.showSift;
    this.showTool=!this.showTool;
    this.getCompanyList();
  }
  newItem(){
    this.navCtrl.push('NewStatementOfAccountPage');
    this.showTool=!this.showTool
  }
  myShowTool(){
    this.showTool=!this.showTool
  }
  getItems() {
    if(this.myInput !== '') {
      this.showSearchLoaction = 'false';
    }
    console.log(this.myInput);
    // this.obtainDatas();
  }
  onCancelOrSearch(type) {
    this.cancelOrSearch = type;
    console.log(type);

    if(type == 0) {
      this.showSearchLoaction="true";
      this.showSearch='true';
    } else {
      this.myInput = '';
      this.showSearchLoaction="false";
      this.showSearch='false';
      // this.obtainDatas();
    }
  }
  itemTapped($event, data) {
    console.log(data);
    this.navCtrl.push('StatementAccountDetailsPage', {'data': data, 'type': this.auditStatus});
  }
  handleSiftSuccess(res,loading){
    loading.dismiss();
    this.showNoContent=false;
    this.dataSource1=[];
    if(res.data.length==0){
      this.showNoContent=true
    }
    for(var item in res.data){
      if(res.data[item].currency=='CNY'){
        res.data[item].danwei='元'
      }
      this.dataSource1.push(res.data[item]);
    }
    this.pageNum++;
    if(this.dataSource1.length>=res.total){
      this.closeScrol=true;
      this.showInfinite=false;
    }
    this.reset()
  }
  handleUserInfoSuccess(res){
    console.log(res);
    if(res.data.length==0){
      this.showNoContent=true
    }
    for(var item in res.data){
      if(res.data[item].currency=='CNY'){
        res.data[item].danwei='元'
      }
      this.dataSource1.push(res.data[item]);
    }
    this.pageNum++;
    console.log(this.dataSource1.length)
    if(this.dataSource1.length>=res.total){
      this.closeScrol=true;
      this.showInfinite=false;
    }
  }
  doInfinite(infiniteScroll){
    console.log(this.buyerDept)
    if(this.closeScrol) {
      console.log("ccc")
      infiniteScroll.enable(false);
    } else{
      setTimeout(() => {
        this.httpService.postWithHeadersNew('api/purchase/app/precast/list?pageSize='+this.pageSize+'&pageNum='+this.pageNum,
          {ouName:this.buyerDept,
            corporateBody:this.buyerCompany,
            currencyCode:'',
            address:this.address,
            deliveryNum:'',
            poCode:'',
            itemCode:'',
            itemDesc:'',
            buyer:'',
            poDateFrom:this.siftStartDate,
            poDateTo:this.siftEndDate,

            sumQty:'',
            sumMoney:'',
          }
        ).then(res => this.handleUserInfoSuccess(res));
        infiniteScroll.complete();
      }, 2000);
    }
  }
  onPageTypeChange(type) {
    console.log(type);
    if(type=='1'){
      this.already='true';
      this.unready='false';
    }else{
      this.already='false';
      this.unready='true';
    }
    this.auditStatus = type;
    // this.obtainDatas();
  }
  backButtonClick = (e: UIEvent) => {
    this.navCtrl.pop();
  };
  removePalce(){
    document.getElementById("firstIn").removeAttribute('placeholder');
  }
  removePalce1(){
    document.getElementById("secondIn").removeAttribute('placeholder');
  }
  removePalce2(){
    document.getElementById("thirdIn").removeAttribute('placeholder');
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
  addPalce2(){
    var a =document.getElementById("thirdIn");
    if(this.preferMonth==''){
      a.setAttribute('placeholder','  月份')
    }
  }
  ionViewDidLoad() {
    this.dateHandler();
    console.log(this.myShowSearch);
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad CustomerManagePage');
    this.unread = this.navParams.data.unread;
    this.ifLoading=true;
    this.httpService.postWithHeadersNew('api/purchase/app/precast/list?pageSize='+this.pageSize+'&pageNum='+this.pageNum,
      {ouName:'',
        corporateBody:'',
        currencyCode:'',
        address:'',
        deliveryNum:'',
        poCode:'',
        itemCode:'',
        itemDesc:'',
        buyer:'',
        // poDateFrom:this.currentYear+'-'+this.currentYear+'-01',
        // poDateTo:this.currentYear+'-'+this.currentYear+'-31',
        poDateFrom:'2018-06-01',
        poDateTo:'2018-06-30',
        sumQty:'',
        sumMoney:'',
      }
    ).then(res => {
      this.handleUserInfoSuccess(res);
      this.ifLoading=false;
    }).catch(error =>{
      console.log("error")
    });
    // $(".ready button").on('click',function (e) {
    //   console.log(e);
    //   $(".ready button").attr("style","");
    //   e.target.setAttribute("style","border-bottom: solid 3px #007aff;")
    // })
  }
  dateHandler(){
    var currentDate=new Date();
    // this.currentYear=currentDate.getFullYear();
    // this.currentMonth=currentDate.getMonth()+1;
    // if (this.currentMonth >= 1 && this.currentMonth <= 9) {
    //   this.currentMonth = "0" + this.currentMonth;
    // }

  }
  selectDept(){
    this.httpService.getUser('api/offices/app/name',
      {
        companyName:this.buyerCompany,
      }
    ).then(res => this.handleGetDeptListSuccess(res));
    this.httpService.getUser('api/purchase/app/precast/address',
      {
        companyName:this.buyerCompany,
      }
    ).then(res => this.handleGetAddressListSuccess(res));
  }
  getCompanyList(){
    this.httpService.getUser('api/companys/app/get',
      {
        nopaging:'nopaging',
        auditStatus: 0
      }
    ).then(res => this.handleGetUserListSuccess(res));
  }
  showSe(e){
    console.log(e);
    this.flag++;
    if(this.flag%2==1){
      this.showSearch='true';
      this.showSearchLoaction="true";
      e.target.parentNode.innerHTML="取消"
    }
    else {
      this.showSearchLoaction="false";
      this.showSearch='false';
      e.target.innerHTML='<img src="assets/ic_search.png"/>';
      this.myInput = '';
      this.httpService.postWithHeadersNew('http://172.30.128.43:7878/api/purchase/app/precast/list?pageSize='+this.pageSize+'&pageNum='+this.pageNum,
        {ouName:'',
          corporateBody:'',
          currencyCode:'',
          address:'',
          deliveryNum:'',
          poCode:'',
          itemCode:'',
          itemDesc:'',
          buyer:'',
          poDateFrom:'',
          poDateTo:'',
          sumQty:'',
          sumMoney:'',
        }
      ).then(res => this.handleUserInfoSuccess(res));
    }
  }
  onCancel(){
    console.log("aaa");
    this.showSearchLoaction="true";
  }
  setSearch(data){
    this.myInput=data;
    this.getItems();
    this.showSearchLoaction="false"
  }
  removeSearch (index){
    console.log(index);
    this.searchLoactionData.splice(index,1)
  }
  handleGetUserListSuccess(res){
    console.log(res);
    for(var i in res.data){
      this.companyList.push(res.data[i].name)
    }

  }
  handleGetDeptListSuccess(res){
    console.log(res);
    this.deptList=res.data
  }
  handleGetAddressListSuccess(res){
    console.log(res);
    this.addressList=res.data
  }
}
