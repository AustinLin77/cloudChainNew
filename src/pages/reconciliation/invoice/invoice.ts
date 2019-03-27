import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar,AlertController } from 'ionic-angular';
import {ViewChild } from '@angular/core';
import { HttpServicelocal } from '../../../service/HttpServicelocal';
/**
 * Generated class for the InvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {
  @ViewChild(Navbar) navBar: Navbar;
  myPosition='';
  name= '';
  siftStartDate='';
  siftEndDate='';
  showNoContent:boolean=false;
  showTool:boolean=false;
  showSift:boolean=false;
  closeScrol:boolean=false;
  ifLoading:boolean=false;
  infiniteScroll;
  pageNum=1;
  pageSize=7;
  itemType;
  dataSource1=[];
  startX=0;   //触摸位置
  endX=0;     //结束位置
  moveX=0;  //滑动时的位置
  disX=0;   //移动距离
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServicelocal,public alertCtrl: AlertController) {
  }
  backButtonClick = (e: UIEvent) => {
    this.dataSource1=[];
    this.navCtrl.push('ReconciliationPage');
  };
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;


  }
  ngOnInit():void {
    var role=localStorage.getItem("role");
    if(role=='0'){
      this.name='销项发票';
      this.itemType=1
    }else{
      this.name='进项发票';
      this.itemType=0
    }
    this.getData()
  }
  myShowTool(){
    this.showTool=!this.showTool
  }
  touchStart(ev,i){
    console.log("start");
    ev= ev || event;
    this.myPosition='';
    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
    if(ev.touches.length == 1){
      // 记录开始位置
      this.startX = ev.touches[0].clientX;
    }
  }
  touchMove(ev,i){
    console.log("move");
    // i=i-1;
    ev = ev || event;
    //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
    let wd=document.getElementById("remove").offsetWidth;
    if(ev.touches.length == 1) {
      // 滑动时距离浏览器左侧实时距离
      this.moveX = ev.touches[0].clientX;
      //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
      this.disX = this.startX - this.moveX;
      // 如果是向右滑动
      if(this.disX < 0 ) {
        this.myPosition='right';
        document.getElementById(i).style.cssText= "transform:translateX(0px);padding:10px;padding-left:16px;position: absolute;left: 0;right: 0;top: 0;bottom: 0;background-color: white;z-index: 100;transition: 0.5s;padding: 10px;padding-left: 16px;";
        // 大于0，表示左滑了，此时滑块开始滑动
      }else if (this.disX > 0) {
        this.myPosition='left';
        //具体滑动距离我取的是 手指偏移距离*5。
        console.log("left");
        document.getElementById(i).style.cssText="transform:translateX( -" + this.disX*2 + "px);padding:10px;padding-left:16px;position: absolute;\n" +
          "    left: 0;\n" +
          "    right: 0;\n" +
          "    top: 0;\n" +
          "    bottom: 0;\n" +
          "    background-color: white;\n" +
          "    z-index: 100;\n" +
          "    transition: 0.5s;\n" +
          "    padding: 10px;\n" +
          "    padding-left: 16px;";
        // 最大也只能等于删除按钮宽度
        if (this.disX*5 >=wd) {
          window.document.getElementById(i).style.cssText="transform:translateX( -80px);padding:10px;padding-left:16px;position: absolute;\n" +
            "    left: 0;\n" +
            "    right: 0;\n" +
            "    top: 0;\n" +
            "    bottom: 0;\n" +
            "    background-color: white;\n" +
            "    z-index: 100;\n" +
            "    transition: 0.5s;\n" +
            "    padding: 10px;\n" +
            "    padding-left: 16px;";
        }
      }
    }
  }
  typeIn(){
    this.navCtrl.push('HandInputPage');
    this.showTool=!this.showTool
  }
  sift(infiniteScroll){
    if(infiniteScroll){
      infiniteScroll.enable(true);
      document.getElementById("myCon").getElementsByTagName("div")[1].scrollTo(0,0)//回滚到顶部
    }
    this.showSift=!this.showSift;
    this.showTool=!this.showTool

  }
  reset(){
    this.siftStartDate='';
    this.siftEndDate='';
    this.showSift=!this.showSift;
  }
  getData(){
    this.ifLoading=!this.ifLoading;
    this.httpService.getUser('api/purchase/app/invoice/list',
      {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        itemType:this.itemType
      }
    ).then(res => this.handleGetDataSuccess(res))
      .catch(error =>{
      console.log("error")
    });
  }
  handleGetDataSuccess(res){
    console.log(res);
    this.ifLoading=!this.ifLoading;
    this.dataSource1=res.data;
    this.pageNum++;
    if(this.dataSource1.length>=res.total){
      this.closeScrol=true
    }

  }
  handleInfiniteSuccess(res){
    for(var item in res.data){
      this.dataSource1.push(res.data[item]);
    }
    this.pageNum++;
    if(this.dataSource1.length>=res.total){
      this.closeScrol=true
    }
  }
  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    if (this.closeScrol) {
      infiniteScroll.enable(false);
    }else{
      this.httpService.getUser('api/purchase/app/invoice/list',
        {
          itemType:this.itemType,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      ).then(res => {
        this.handleInfiniteSuccess(res);
        infiniteScroll.complete();
      })
    }
  }
  itemTapped($event, data) {
    this.showTool=false;
    this.navCtrl.push('InvoiceDetailPage', {'data': data.id});
  }
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
  cancel(){
    this.siftStartDate='';
    this.siftEndDate='';
  }
  confirm(){
    this.pageNum=1;
    this.httpService.getUser('api/purchase/app/invoice/list',
      {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        itemType:this.itemType,
        startTime:this.siftStartDate,
        endTime:this.siftEndDate
      }
    ).then(res => this.handleSiftSuccess(res));
  }
  handleSiftSuccess(res){
    this.showNoContent=false;
    this.dataSource1=[];
    if(res.data.length==0){
      this.showNoContent=true
    }
    for(var item in res.data){
      this.dataSource1.push(res.data[item]);
    }
    this.pageNum++;
    if(this.dataSource1.length>=res.total){
      this.closeScrol=true
    }
    this.reset()
  }
  foresee(data){
    if(data.status=='已验真'){
      this.httpService.getUser('api/purchase/app/invoice/preview/' + data.id,
        {}
      ).then(res => {
        console.log(res);
        var downLoadUrl = res.data;
        window.location.href = downLoadUrl
      });
    }else{
        let alert = this.alertCtrl.create({
          title: '温馨提示',
          subTitle: '该发票不处于已验真状态,暂时无法预览。',
          buttons: ['确定']
        });
        alert.present();
      }


    }
    // console.log(data);
    // if(data.status=='已验真'){
    //   var id=data.id;
    //   var authorization = 'Bearer ' + localStorage.getItem("token");
    //   var teamId = localStorage.getItem("teamId");
    //   var userName= localStorage.getItem("userName");
    //   var url = 'http://172.30.128.43:7878/api/purchase/app/invoice/preview/'+id;
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('GET', url, true);
    //   xhr.responseType = "blob";
    //   xhr.setRequestHeader("Accept", "application/json");
    //   xhr.setRequestHeader("Content-Type", 'application/json;charset=utf8');
    //   xhr.setRequestHeader("Authorization", authorization);
    //   xhr.setRequestHeader("X-TenantId", teamId);
    //   xhr.setRequestHeader("Prefer-Lang", "zh-CN");
    //   xhr.setRequestHeader("Accept-Language", "zh-CN");
    //   xhr.setRequestHeader("X-Logined-Sign", userName);
    //   xhr.setRequestHeader("X-UserId", localStorage.getItem('userId'));
    //   xhr.onload = function() {
    //     if (this.status == 200) {
    //       console.log( this.response)
    //       let res =  this.response;
    //       var blob = new Blob([res], { type: 'application/pdf'});
    //       var objectUrl = URL.createObjectURL(blob);
    //       console.log("objectUrl: " + objectUrl);
    //       window.location.href=objectUrl
    //     }
    //   };
    //
    //   xhr.send();
    // }else{
    //   let alert = this.alertCtrl.create({
    //     title: '温馨提示',
    //     subTitle: '该发票不处于已验真状态,暂时无法预览。',
    //     buttons: ['确定']
    //   });
    //   alert.present();
    // }


}
