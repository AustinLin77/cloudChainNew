import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GenerateCountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generate-count',
  templateUrl: 'generate-count.html',
})
export class GenerateCountPage {
  showTool:boolean=false;
  dataSource=[1,2];
  loopNum:number;
  showHelp:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerateCountPage');
    this.loopNum=2
  }
  myShowTool(){
    this.showTool=!this.showTool;
  }
  myUpload(){
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
}
