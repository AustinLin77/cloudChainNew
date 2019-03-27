import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { HttpServicelocal } from '../../../../service/HttpServicelocal';
/**
 * Generated class for the PreTicketDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pre-ticket-details',
  templateUrl: 'pre-ticket-details.html',
})
export class PreTicketDetailsPage {
  dataSource=[];
  id;
  status;
  pageNum=1;
  pageSize=5;
  infiniteScroll;
  closeScrol:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServicelocal,private toastCtrl: ToastController) {
    this.id = navParams.get('data');
    this.status = navParams.get('type');//已开票 1
    console.log(this.id)
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad PreTicketDetailsPage');
    this.getData()
  }
  getData(){
    this.httpService.getUser('api/purchase/app/invoice/pre/detail/'+this.id,
      {
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }
    ).then(res => this.handleGetDataSuccess(res));
  }
  handleGetDataSuccess(res){
    console.log(res);
    this.dataSource=res.data;
    this.pageNum++;
    if(this.dataSource.length>=res.total){
      this.closeScrol=true
    }
  }
  handleInfiniteSuccess(res){
    console.log(res);
    for(var i=0;i<res.data.length;i++){
      this.dataSource.push(res.data[i])
    }
    this.pageNum++;
    if(this.dataSource.length>=res.total){
      this.closeScrol=true
    }
  }
  doInfinite(infiniteScroll){
    console.log(this.closeScrol);

    this.infiniteScroll = infiniteScroll;
    if (this.closeScrol) {
      infiniteScroll.enable(false);
    }else{
      this.httpService.getUser('api/purchase/app/invoice/pre/detail/'+this.id,
        {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      ).then(res => {
        this.handleInfiniteSuccess(res);
        infiniteScroll.complete();
      })
    }
  }
  myDelete(){
    this.httpService.getUser('api/purchase/app/invoice/pre/cancel/'+this.id, {}
    ).then(res => {
      console.log(res);
      if(res.statusCode==200){
        // this.navCtrl.pop()
        this.navCtrl.push('PreTicketPage')
      }else{
        let toast = this.toastCtrl.create({
          message:'作废失败,请重新操作',
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
  myRealDelete(){
    this.httpService.putWithHeadersServes('api/purchase/app/invoice//pre/batch/del',
      [this.id]
    ).then(res => {
      console.log(res);
      if(res.statusCode==200){
        this.navCtrl.push('PreTicketPage')
      }else if(res.statusCode==40048){
        let toast = this.toastCtrl.create({
          message: '存在已上传或已开票的数据,不能删除',
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
