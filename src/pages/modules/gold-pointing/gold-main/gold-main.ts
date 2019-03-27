import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams,Navbar,Slides} from 'ionic-angular';
import {HttpService} from "../../../../service/HttpService";
import {ViewChild } from '@angular/core';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the GoldMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gold-main',
  templateUrl: 'gold-main.html',
})
export class GoldMainPage {
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('sliders')
  sliders: Slides;
  slides = [{imgPath: "assets/imgs/dianjin1.png"}, {imgPath: "assets/imgs/dianjin2.png"}, {imgPath: "assets/imgs/dianjin3.png"}];
  roleName='';
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpService,
              private app : App,private alertCtrl: AlertController) {
  }
  backButtonClick = (e: UIEvent) => {
    this.navCtrl.popToRoot()
  };//监听tab栏返回键按钮
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad GoldMainPage');
    this.roleName=localStorage.getItem("roleName")
    // this.dianjinLogin()
  }//页面初始化调用方法
  goitem(path){
    this.app.getRootNav().push(  path );
  }//点击具体项调用方法

  dianjinExit(){
    localStorage.removeItem('sellerId');
    localStorage.removeItem('ifDianJinLogin');
    localStorage.removeItem('roleName');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.navCtrl.popToRoot()
  }

  goDianJinIntroduce(){
    this.navCtrl.push('DianjinIntroducePage')
  }
}
