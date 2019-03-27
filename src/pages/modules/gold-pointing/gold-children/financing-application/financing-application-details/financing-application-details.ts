import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import $ from 'jquery'
/**
 * Generated class for the FinancingApplicationDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-financing-application-details',
  templateUrl: 'financing-application-details.html',
})
export class FinancingApplicationDetailsPage {
  data={};
  showTool:boolean=false;
  loginName='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.loginName=localStorage.getItem("username");
    this.data=navParams.get("data");
    console.log(this.data)
  }
  ionViewDidLoad() {}
}
