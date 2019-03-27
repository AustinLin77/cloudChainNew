import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar,AlertController } from 'ionic-angular';
import {ViewChild } from '@angular/core';
import { StatementOfAccountPage} from "./statement-of-account/statement-of-account"
/**
 * Generated class for the ReconciliationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reconciliation',
  templateUrl: 'reconciliation.html',
})
export class ReconciliationPage {
  @ViewChild(Navbar) navBar: Navbar;
  dataSource : Array<any> = [];
  showWhat;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }
  backButtonClick = (e: UIEvent) => {
    this.navCtrl.popToRoot()
  };
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    var role=localStorage.getItem("role");
    if(role=='0'){
      this.dataSource=[
        {'key': '对账单', 'index': '1'},
        {'key': '结算单', 'index': '2'},
        {'key': '预制发票', 'index': '3'},
        {'key': '销项发票', 'index': '4'},
        // {'key': '销项发票交接单', 'index': '5'},
      ]
    }else{
      this.dataSource=[
        {'key': '对账单', 'index': '1'},
        {'key': '结算单', 'index': '2'},
        {'key': '预制发票', 'index': '3'},
        {'key': '进项发票', 'index': '4'},
        // {'key': '销项发票交接单', 'index': '5'},
      ]
    }
    var show=localStorage.getItem("token");
    if(show){
      this.showWhat=1;
    }else {
      this.showWhat=0;
    }
  }
  loadingAlert(){
    let alert = this.alertCtrl.create({
      message: '请登录/注册后再操作',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '登录',
          handler: () => {
            this.navCtrl.push('LoginPage')

          }
        }
      ]
    });
    alert.present();
  }
  itemTapped(e, item) {
    if(this.showWhat==0){
      this.loadingAlert()
    }else {
      console.log(item);
      if (item.index === '1') {
        this.navCtrl.push('StatementOfAccountPage');
      } else if (item.index === '2') {
        this.navCtrl.push('SettlementPage');
      } else if (item.index === '3') {
        this.navCtrl.push('PreTicketPage');
      } else if (item.index === '4') {
        this.navCtrl.push('InvoicePage');
      } else if (item.index === '5') {
      }
    }
  }
}
