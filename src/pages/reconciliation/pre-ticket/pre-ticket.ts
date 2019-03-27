import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import {ViewChild } from '@angular/core';
import { HttpServicelocal } from '../../../service/HttpServicelocal';
import $ from 'jquery'
import {Http, Response, Headers, RequestOptions} from '@angular/http';

/**
 * Generated class for the PreTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pre-ticket',
  templateUrl: 'pre-ticket.html',
})
export class PreTicketPage {
  @ViewChild(Navbar) navBar: Navbar;
  siftStartDate='';
  siftEndDate='';
  ifLoading:boolean=false;
  showNoContent:boolean=false;
  showyulan:boolean=false;
  yulan='';
  auditStatus='';
  myPosition='';
  myFadeDiv='false';
  status=1;
  pageNum=1;
  pageSize=7;
  already:string='true';
  unready:string='false';
  showTool:boolean=false;
  closeScrol:boolean=false;
  showSift:boolean=false;
  infiniteScroll:null;
  dataSource1=[];
  startX=0;   //触摸位置
  endX=0;     //结束位置
  moveX=0;  //滑动时的位置
  disX=0;   //移动距离
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServicelocal,private http: Http,) {
  }
  backButtonClick = (e: UIEvent) => {
    this.dataSource1=[];
    this.navCtrl.push('ReconciliationPage');
    console.log(this.dataSource1)
  };
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    this.ifLoading=true;
    this.getData()
  }
  onPageTypeChange(type,infiniteScroll) {
    this.pageNum=1;
    this.closeScrol=false;
    this.showNoContent=false;
    this.ifLoading=true;
    this.myFadeDiv='false';
    // document.getElementById('myScrollComtent').style.cssText="background-color: #eeeeee;opacity: 0.2;";
    this.dataSource1=[];
    if(infiniteScroll){
      infiniteScroll.enable(true);
      document.getElementById("secondCon").getElementsByTagName("div")[1].scrollTo(0,0)//回滚到顶部
      // document.getElementById("myScrollComtent").scrollTo(0,0)//回滚到顶部
    }
    if(type=='-1'){
      this.already='true';
      this.unready='false';
      this.status=1;
      // this.getData()
    }else{
      this.already='false';
      this.unready='true';
      this.status=0;
      // this.getData()
    }
    this.getData()
    // this.obtainDatas();
  }
  touchStart(ev,i){
    ev= ev || event;
    this.myPosition='';
    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
    if(ev.touches.length == 1){
      // 记录开始位置
      this.startX = ev.touches[0].clientX;
    }
  }
  touchMove(ev,i){
    // i=i-1;
    ev = ev || event;
    //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
    let wd=document.getElementById("remove").offsetWidth;
    if(ev.touches.length == 1) {
      // 滑动时距离浏览器左侧实时距离
      this.moveX = ev.touches[0].clientX;
      //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
      this.disX = this.startX - this.moveX;
      // 如果是向右滑动或者不滑动，不改变滑块的位置
      if(this.disX < 0 || this.disX == 0) {
        this.myPosition='right';
        console.log(this.disX);
        document.getElementById(i).style.cssText= "transform:translateX(0px);padding:10px;padding-left:16px;position: absolute;\n" +
          "    left: 0;\n" +
          "    right: 0;\n" +
          "    top: 0;\n" +
          "    bottom: 0;\n" +
          "    background-color: white;\n" +
          "    z-index: 100;\n" +
          "    transition: 0.5s;\n" +
          "    padding: 10px;\n" +
          "    padding-left: 16px;";
        // 大于0，表示左滑了，此时滑块开始滑动
      }else if (this.disX > 0) {
        this.myPosition='left';
        //具体滑动距离我取的是 手指偏移距离*5。
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
          document.getElementById(i).style.cssText="transform:translateX( -80px);padding:10px;padding-left:16px;position: absolute;\n" +
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
  // touchEnd(ev,i) {
  //   i = i - 1;
  //   ev = ev || event;
  //   let wd = document.getElementById("remove").offsetWidth
  //   if (ev.changedTouches.length == 1) {
  //     let endX = ev.changedTouches[0].clientX;
  //     this.disX = this.startX - endX;
  //     //如果距离小于删除按钮一半,强行回到起点
  //     if ((this.disX * 5) < (wd / 2)) {
  //       document.getElementById(i).style.cssText = "transform:translateX(0px)";
  //     } else {
  //
  //       //大于一半 滑动到最大值
  //       document.getElementById(i).style.cssText = "transform:translateX(-" + wd + "px)";
  //     }
  //   }
  // }
  // touchEnd(ev,i){
  //   // i=i-1;
  //   ev = ev || event;
  //   if(this.myPosition='right'){
  //     console.log("ttttttttttt")
  //     document.getElementById(i).style.cssText= "transform:translateX(0px);padding:10px;padding-left:16px;    position: absolute;\n" +
  //       "    left: 0;\n" +
  //       "    right: 0;\n" +
  //       "    top: 0;\n" +
  //       "    bottom: 0;\n" +
  //       "    background-color: white;\n" +
  //       "    z-index: 100;\n" +
  //       "    padding: 10px;\n" +
  //       "    padding-left: 16px;";
  //   }else{
  //     console.log("sssssssss")
  //     let wd=document.getElementById("remove").offsetWidth;
  //     if (ev.changedTouches.length == 1) {
  //       let endX = ev.changedTouches[0].clientX;
  //       this.disX = this.startX - endX;
  //       //如果距离小于删除按钮一半,强行回到起点
  //       if ((this.disX*5) < (wd/2)) {
  //         document.getElementById(i).style.cssText= "transform:translateX(0px);padding:10px;padding-left:16px";
  //       }else{
  //         //大于一半 滑动到最大值
  //         document.getElementById(i).style.cssText= "transform:translateX(-"+wd+ "px);padding:10px;padding-left:16px";
  //       }
  //     }
  //   }
  //
  // }
  foresee(data) {
    this.httpService.getUser('api/purchase/app/invoice/preview/' + data.id,
      {}
    ).then(res => {
      console.log(res);
      var downLoadUrl = res.data;
      window.location.href = downLoadUrl

    });
  }
    // console.log(data);
    // var id=data.id;
    // var authorization = 'Bearer ' + localStorage.getItem("token");
    // var teamId = localStorage.getItem("teamId");
    // var userName= localStorage.getItem("userName");
    // let headers = new Headers(
    //   {'Content-Type': 'application/json',
    //     'Authorization': authorization, 'X-TenantId':teamId, "Prefer-Lang":"zh-CN","Accept": "application/json", "X-Logined-Sign": userName,"X-UserId":localStorage.getItem('userId'),});
    // var url = 'http://172.30.128.43:7878/api/purchase/app/invoice/preview/'+id;
    // let that=this;
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', url, true);
    // xhr.responseType = "blob";
    // xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader("Content-Type", 'application/json;charset=utf8');
    // xhr.setRequestHeader("Authorization", authorization);
    // xhr.setRequestHeader("X-TenantId", teamId);
    // xhr.setRequestHeader("Prefer-Lang", "zh-CN");
    // xhr.setRequestHeader("Accept-Language", "zh-CN");
    // xhr.setRequestHeader("X-Logined-Sign", userName);
    // xhr.setRequestHeader("X-UserId", localStorage.getItem('userId'));
    // xhr.onload = function() {
    //   if (this.status == 200) {
    //     console.log( this.response);
    //     let res =  this.response;
    //     var blob = new Blob([res], { type: 'application/pdf'});
    //     var objectUrl = URL.createObjectURL(blob);
    //     console.log("objectUrl: " + objectUrl);
    //     alert(objectUrl);
    //     window.open(objectUrl)
    //
    //     // window.location.href=objectUrl
    //   }
    // };
    // xhr.send();
    // // this.http()
    // // this.httpService.getUser1('api/purchase/app/invoice/preview/'+id, {}
    // // ).then(res => {
    // //   console.log(res)
    // //   var blob = new Blob([res._body], { type: 'application/pdf' });
    // //   var objectUrl = URL.createObjectURL(blob);
    // //   console.log(objectUrl)
    // //   window.open(objectUrl);
    // // });

  sift(infiniteScroll){
    if(infiniteScroll){
      infiniteScroll.enable(true);
      document.getElementById("myCon").getElementsByTagName("div")[1].scrollTo(0,0)//回滚到顶部
    }
    this.showSift=!this.showSift;
    console.log(this.showSift);
    this.showTool=!this.showTool
  }
  getData(){
    this.httpService.getUser('api/purchase/app/invoice/pre/list',
      {
        paging:'paging',
        status:this.status,
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }
    ).then(res => {
      this.handleGetDataSuccess(res);
      this.ifLoading=false;
    }).catch(error =>{
      console.log("error")
    });
  }
  handleGetDataSuccess(res){
    console.log("333");
    console.log(res);
    this.dataSource1=res.data;
    this.ifLoading=false;
    this.myFadeDiv='true';
    // console.log(document.getElementById('myScrollComtent'))
    // document.getElementById('myScrollComtent').style="background-color: #eeeeee;opacity:1;transition: all 0.6s linear"
    this.pageNum++;
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
    this.httpService.getUser('api/purchase/app/invoice/pre/list',
      {
        paging: 'paging',
        status: this.status,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
    ).then(res => {
      this.handleInfiniteSuccess(res);
      infiniteScroll.complete();
    })
   }
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
  reset(){
    this.siftStartDate='';
    this.siftEndDate='';
    this.showSift=!this.showSift;
  }
  myShowTool(){
    this.showTool=!this.showTool;
  }
  closeSift(){
    this.showSift=!this.showSift;
  }
  itemTapped($event, data) {
    this.showTool=false;
    this.navCtrl.push('PreTicketDetailsPage', {'data': data.id,'type':this.status});
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
    this.ifLoading=true;
    this.pageNum=1;
    this.httpService.getUser('api/purchase/app/invoice/pre/list',
      {
        paging:'paging',
        status:this.status,
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        invoiceBeginDate:this.siftStartDate,
        invoiceToDate:this.siftEndDate
      }
    ).then(res => {
      this.handleSiftSuccess(res);
      this.ifLoading=false;
    });
  }
}
