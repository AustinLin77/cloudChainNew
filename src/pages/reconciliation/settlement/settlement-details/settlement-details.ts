import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController, LoadingController } from 'ionic-angular';
import { HttpServicelocal } from '../../../../service/HttpServicelocal';
/**
 * Generated class for the SettlementDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settlement-details',
  templateUrl: 'settlement-details.html',
})
export class SettlementDetailsPage {
    id;
    personStatus;
    type;
    pageSize=4;
    pageNum=1;
    dataSource=[1,2];
    showTool:boolean=false;
    loopNum:number;
    showHelp:boolean=false;
    headData=[];
    moneyData=[];
    scrollData=[];
    closeScrol=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController,
              private httpService: HttpServicelocal,private alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    this.id = navParams.get('data');
    this.personStatus = navParams.get('personStatus');
    this.type = navParams.get('type');
    console.log(this.type);
    console.log(this.personStatus)
  }

  ionViewDidLoad() {
    console.log(this.id);
    this.loopNum=2;
    this.getDetails();
  }
  getDetails(){
    var url='api/purchase/app/settle/head/detail/'+this.id;
    this.httpService.getUser(url,{
      pageSize:this.pageSize,
      pageNum:this.pageNum
    }).then(res => this.handleUserInfoSuccess(res));
  }
  doInfinite(infiniteScroll) {
    if (this.closeScrol) {
      infiniteScroll.enable(false);
    }else{
      var url='api/purchase/app/settle/head/detail/'+this.id;
      this.httpService.getUser(url,{
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }).then(res => {
        this.handleScrollSuccess(res);
        infiniteScroll.complete();
      });
    }
  }
  myShowTool(){
    this.showTool=!this.showTool;
  }
  handInput(){
    this.navCtrl.push('HandInputPage');
    this.showTool=!this.showTool;
  }
  changePrice(){
    this.showHelp=!this.showHelp;
    this.showTool=!this.showTool;
  }
  goChangePrice(){
    this.navCtrl.push('ChangePricePage');
    this.showHelp=!this.showHelp;
  }
  handleScrollSuccess(res){
    console.log(res);
    this.scrollData=this.scrollData.concat(res.data.lineList);
    if(this.scrollData.length>=res.total){
      this.closeScrol=true
    }
    this.pageNum++;
  }
  handleUserInfoSuccess(res){
    console.log(res);
    this.headData=res.data.headData;
    this.moneyData=res.data.moneyData;
    this.scrollData=res.data.lineList;
    if(this.scrollData.length>=res.total){
      this.closeScrol=true
    }
    this.pageNum++;
  }
  sendConfirm(){
    let alert = this.alertCtrl.create({
      title: '发送至采购商确认',
      inputs: [
        {
          name: 'email',
          placeholder: '请输入邮箱',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '发送',
          handler: data => {
            if (data.email!='') {
              this.mySend(data.email)
            } else {
              let toast = this.toastCtrl.create({
                message: '请输入邮箱',
                duration: 3000,
                position: 'top'
              });
              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });
              toast.present();
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
  mySend(email){
    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    this.httpService.putWithHeadersServes('api/purchase/app/settle/customer/confirm?buyerEmail='+email,
      [this.id]
    ).then(res => {
      console.log(res);
      if(res.statusCode==200){
        loading.dismiss();
        this.navCtrl.push('SettlementPage')
      }else{
        let toast = this.toastCtrl.create({
          message: '发送失败,请重新发送',
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
      }
    });
  }
  userCancel(){
    console.log(this.id);
    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    this.httpService.putWithHeadersServes('api/purchase/app/settle/cancel',
      [this.id]
    ).then(res => {
      console.log(res);
      if(res.statusCode==200){
        loading.dismiss();
        this.navCtrl.push('SettlementPage')
      }else{
        let toast = this.toastCtrl.create({
          message: '取消失败,请重新取消',
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
      }
    });
  }
  generalPreTicket(){

    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    this.httpService.getUser('api/purchase/app/settle/gen/pre/invoice',
      {
        ids:this.id
      }
    ).then(res => {
      console.log(res);
      if(res.statusCode==200){
        loading.dismiss();
        this.navCtrl.push('PreTicketPage')
      }else{
        let toast = this.toastCtrl.create({
          message: '生成预制发票失败,请重新生成预制发票',
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
      }
    });


  }
  userAction(action){
    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    console.log(this.id);
    this.httpService.putWithHeadersServes('api/purchase/app/settle/customer/reply/'+action,
      [this.id]
    ).then(res => {
      console.log(res);
      if(res.statusCode==200){
        loading.dismiss();
        this.navCtrl.push('SettlementPage')
      }else{
        var message='';
        if(action==1){
          message='确认失败,请重新操作';
        }else{
          message='驳回失败,请重新操作';
        }
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
      }
    });
  }
  cancelConfirm(){
    let loading = this.loadingCtrl.create({
      content: '操作中...'
    });
    console.log(this.id);
    this.httpService.putWithHeadersServes('api/purchase/app/settle/cancel/buy',
      [this.id]
    ).then(res => {
      console.log(res);
      if(res.statusCode==200){
        loading.dismiss();
        this.navCtrl.push('SettlementPage')
      }else{
        let toast = this.toastCtrl.create({
          message:'取消失败,请重新操作',
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
      }
    });
  }
}
