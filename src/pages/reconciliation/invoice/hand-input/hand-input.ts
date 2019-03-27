import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { HttpServicelocal } from '../../../../service/HttpServicelocal';
/**
 * Generated class for the HandInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hand-input',
  templateUrl: 'hand-input.html',
})
export class HandInputPage {
  ticketNum='';
  ticketCost='';
  ticketDate='';
  ticketCode='';
  siftStartDate;

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServicelocal,private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HandInputPage');
  }
  mySend(){
    this.httpService.postWithHeadersNew('api/purchase/app/invoice/add',{
      itemType: "1",
      busiEntity: "",
      type: "",
      invoiceNo: this.ticketNum,
      settlementPeriod: "",
      ebsInvoiceNo: "",
      totalPrice: this.ticketCost,
      invoiceCode: this.ticketCode,
      makeInvoiceTime: this.ticketDate
    }).then(res => this.handleSuccess(res))
  }
  comfirm(){
    this.handInHandler()
  }
  handInHandler(){
    if(this.ticketCode==''||this.ticketCost==''||this.ticketDate==''||this.ticketNum==''){
      let toast = this.toastCtrl.create({
        message: '标红星的为必填项,请填写完整，谢谢配合!',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
      return
    }
    var reg1= new RegExp(/^[0-9]{8}$/);
    if(!reg1.test(this.ticketNum)){
      let toast = this.toastCtrl.create({
        message: '发票号必须为八位数字',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
      return
    }
    var reg2=new RegExp(/^\S{10}(\S{2})?$/)
    if(!reg2.test(this.ticketCode)){
      let toast = this.toastCtrl.create({
        message: '发票代码必须为十位或者十二位',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
      return
    }
    this.mySend()
  }
  handleSuccess(res){
    console.log(res);
    if(res.statusCode==200){
      this.navCtrl.push('InvoicePage')
    }else{
      let toast = this.toastCtrl.create({
        message: '录入失败,请重新录入',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
      return
    }
  }
}
