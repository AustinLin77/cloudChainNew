import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServicelocal } from '../../../../service/HttpServicelocal';
/**
 * Generated class for the StatementAccountDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statement-account-details',
  templateUrl: 'statement-account-details.html',
})
export class StatementAccountDetailsPage {
  data:any;
  type:'';
  dataSource=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServicelocal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatementAccountDetailsPage');
    this.data=this.navParams.data.data;
    this.type=this.navParams.data.type;
    console.log(this.data);
    console.log(this.type);
    // this.getData()
  }
  generateCount(){
    this.navCtrl.push('GenerateCountPage')
  }
  // getData(){
  //   this.httpService.postWithHeadersNew('api/purchase/app/precast/list?pageSize='+this.pageSize+'&pageNum='+this.pageNum, {
  //     ouName:'',
  //       corporateBody:'',
  //       currencyCode:'',
  //       address:'',
  //       deliveryNum:'',
  //       poCode:'',
  //       itemCode:'',
  //       itemDesc:'',
  //       buyer:'',
  //       poDateFrom:'',
  //       poDateTo:'',
  //       sumQty:'',
  //       sumMoney:'',
  //     }
  //   ).then(res => this.handleUserInfoSuccess(res));
  // }
}
