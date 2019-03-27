import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';
/**
 * Generated class for the AllFunctionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-function',
  templateUrl: 'all-function.html',
})
export class AllFunctionPage {
  firstOptions=[
    {name:"对账结算",src:'assets/imgs/产品.png'},
    {name:"交期管理",src:'assets/imgs/需求.png'},
    {name:"库存管理",src:'assets/imgs/集采.png'},
    {name:"物流管理",src:'assets/imgs/招标.png'},
    {name:"销项管理",src:'assets/imgs/云平台.png'},
    {name:"MES监控",src:'assets/imgs/金融.png'},
    {name:"设备管理",src:'assets/imgs/集采.png'},
    {name:"产能管理",src:'assets/imgs/招标.png'},
    {name:"品质管理",src:'assets/imgs/集采.png'},
    {name:"智能仓库",src:'assets/imgs/招标.png'},
  ];
  secondOptions=[
    {name:"智能开票",src:'assets/imgs/产品.png'},
    {name:"智能税务",src:'assets/imgs/需求.png'},
    {name:"资金管理",src:'assets/imgs/集采.png'},
    {name:"大数据",src:'assets/imgs/招标.png'},
    {name:"信用管理",src:'assets/imgs/云平台.png'},
    {name:"智能合约",src:'assets/imgs/金融.png'},
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, private app : App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllFunctionPage');
  }
  goReconciliationPage(option){
    if(option.name=='对账结算'){
      this.app.getRootNav().push(  'ReconciliationPage' )
    }
  }
}
