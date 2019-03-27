import {Component} from '@angular/core';
import { NavController, NavParams, Slides,Platform,PopoverController,Events, AlertController} from 'ionic-angular';
import { ViewChild} from '@angular/core';
import $ from 'jquery'
import { HttpService } from '../../service/HttpService';
import {ProductionPage} from "../production/production";
import { App } from 'ionic-angular';
import { GlobalVariable } from '../../globalVariable/globalVariable';
import { ApplyPage} from '../apply/apply';
import { PurchasePage} from '../purchase/purchase';
import {InvitePage} from "../invite/invite";
import { GoodsdetailsPage} from "../goodsdetails/goodsdetails";
import {ApplyDetailsPage} from "../apply-details/apply-details";
import {PurchaseDetailsPage} from "../purchase-details/purchase-details";
import {InviteDetailsPage} from "../invite-details/invite-details";
import { ModalController } from 'ionic-angular';
import { AllFunctionPage} from "../all-function/all-function"
import { GalleryModal } from 'ionic-gallery-modal';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('sliders')
  sliders: Slides;
  slides = [{imgPath: "assets/imgs/云链1.jpg"}, {imgPath: "assets/imgs/云链2.jpg"}, {imgPath: "assets/imgs/云链3.jpg"}];
  photos = [];
  options = [{name: "对账结算", src: 'assets/imgs/产品.png'},
    {name: "交期管理", src: 'assets/imgs/需求.png'},

    {name: "库存管理", src: 'assets/imgs/集采.png'},
    {name: "物流管理", src: 'assets/imgs/wuliu.png'},
    {name: "销项管理", src: 'assets/imgs/云平台.png'},
    {name: "MES监控", src: 'assets/imgs/mes.png'},
    {name: "点金保理", src: 'assets/imgs/点金.png'},
    {name: "更多功能", src: 'assets/imgs/更多.png'},
  ];
  searchKey: '';
  firstUrl = '/no/filter/app/goods/all/list';
  carListNum: number;
  url = '/app/shopping/car/list';
  products = [];
  applys = [{imgPathList: 'aa'}];
  showCancel = false;
  purchases = [];
  invites = [];
  item = [1, 2, 3, 4];
  showWhat;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpService,
              private app: App, private platform: Platform, public popoverCtrl: PopoverController, public modalCtrl: ModalController,
              public events: Events, public alertCtrl: AlertController) {
  }

  //初始化获得数据
  ngOnInit(): void {
    console.log(this.firstUrl);
    this.httpService.get(this.firstUrl, {}
    ).then(
      res => this.handleSuccess(res));
  }

  optionDetailS() {
    this.app.getRootNav().push('AllFunctionPage');
  }

  myShowCancel() {
    this.showCancel = true;
    var data = 0;
    this.events.publish('pop:showCancel', data, Date.now());
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }, false);
  }

  hiddenCan() {
    this.showCancel = false;
    this.searchKey = "";
    var data = 1;
    this.events.publish('pop:showCancel', data, Date.now());
    document.body.removeEventListener('touchmove', function (e) {
      e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }, false)
  }

  handleSuccess(result) {
    console.log(result);
    // this.slides=result.data.imgList;
    if (!result.data.imgList) {
      result.data.imgList = 'assets/imgs/f1.jpg';
    }
    this.products = result.data.productList;
    for (var i = 0; i < this.products.length; i++) {
      switch (result.data.productList[i].hot) {
        case 0:
          result.data.productList[i].hot = '低';
          break;
        case 1:
          result.data.productList[i].hot = '热';
          break;
      }
      if (!result.data.productList[i].imgPathList) {
        result.data.productList[i].imgPathList = 'assets/imgs/f1.jpg';
      } else if (result.data.productList[i].imgPathList.length > 1) {
        result.data.productList[i].imgPathList = result.data.productList[i].imgPathList[0];
      }
      console.log(result.data.productList[i].imgPathList);
      if (!result.data.productList[i].currency) {
        result.data.productList[i].currency = '￥';
      }
      switch (result.data.productList[i].currency) {
        case 'CNY':
          result.data.productList[i].currency = '￥';
          break;
        case 'USD':
          result.data.productList[i].currency = '$';
          break;
      }
    }
    this.applys = result.data.requireList;
    for (var b = 0; b < this.applys.length; b++) {
      if (!result.data.requireList[b].imgPathList) {
        result.data.requireList[b].imgPathList = 'assets/imgs/f1.jpg';
      } else if (result.data.requireList[b].imgPathList.length > 1) {
        result.data.requireList[b].imgPathList = result.data.requireList[b].imgPathList[0];
      }
    }
    this.purchases = result.data.gatherList;
    for (var a = 0; a < this.purchases.length; a++) {
      if (!result.data.gatherList[a].currency) {
        result.data.gatherList[a].currency = '￥';
      }
      switch (result.data.gatherList[a].gatherStatus) {
        case '0':
          result.data.gatherList[a].gatherStatus = '未开始';
          break;
        case '1':
          result.data.gatherList[a].gatherStatus = '进行中';
          break;
        case '2':
          result.data.gatherList[a].gatherStatus = '已结束';
          break;
        case '3':
          result.data.gatherList[a].gatherStatus = '未成团';
          break;
        case '4':
          result.data.gatherList[a].gatherStatus = '已成团';
          break;
      }
      if (!result.data.gatherList[a].imgPathList) {
        result.data.gatherList[a].imgPathList = '../../assets/imgs/f1.jpg';
      } else if (result.data.gatherList[a].imgPathList.length > 1) {
        result.data.gatherList[a].imgPathList = result.data.gatherList[a].imgPathList[0];
      }
      switch (result.data.gatherList[a].currency) {
        case 'CNY':
          result.data.gatherList[a].currency = '￥';
          break;
        case 'USD':
          result.data.gatherList[a].currency = '$';
          break;
      }
      console.log(result.data.gatherList[a].currency)
    }
    this.invites = result.data.biddingList.slice(0, 3);
  }

  ionViewWillEnter() {
    this.sliders.startAutoplay();
  }

  ionViewWillLeave() {
    this.sliders.stopAutoplay();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    //获取版本是安卓还是苹果，样式兼容
    if (this.platform.is('ios')) {
      localStorage.setItem('chain', '0')
    } else if (this.platform.is('android')) {
      localStorage.setItem('chain', '1')
    }
    console.log(localStorage.getItem('chain'));
    this.httpService.getOrganize(this.url, {}
    ).then(
      res => this.handleFirstSuccess(res));
    var show = localStorage.getItem("token");
    if (show) {
      this.showWhat = 1;
    } else {
      this.showWhat = 0;
    }
  }

  handleFirstSuccess(result) {
    console.log(result);
    this.carListNum = result.total;
    console.log(this.carListNum);
    GlobalVariable.shopCount = this.carListNum;
  }

  //   //跳转到分类界面
  //  test(){
  //   this.app.getRootNav().push( 'SortPage' );
  // }
  //判断跳转到那个模块
  optionDetails(opT) {
    switch (opT.name) {
      case '产品':
        this.app.getRootNav().push('ProductionPage', {whatSend: 0});
        break;
      case '需求':
        this.app.getRootNav().push('ApplyPage');
        break;
      case '集采':
        this.app.getRootNav().push('PurchasePage');
        break;
      case '招标':
        this.app.getRootNav().push('InvitePage');
        break;
      case '物流管理':

        console.log("yunpingtai");
        this.app.getRootNav().push('CloudPage');
        break;
      case '更多功能':
        // alert('金融中心还在完善中,敬请期待!');
        this.app.getRootNav().push('AllFunctionPage');
        break;
      case '金融中心':
        alert('金融中心还在完善中,敬请期待!');
        // this.app.getRootNav().push(  'AllFunctionPage' );
        break;
      case '对账结算':
        // if(this.showWhat==0){
        //   this.loadingAlert()
        // }else{
        this.app.getRootNav().push('ReconciliationPage');
        // }
        break;
      case '点金保理':
        this.dianjinLogin();

        break;
      case '物流中心':
        // this.app.getRootNav().push(  'ReconciliationPage' );
        break;
    }
  }

  dianjinLogin() {
   // this.app.getRootNav().push('GoldMainPage');
    if (localStorage.getItem("ifDianJinLogin") == 'true') {
      this.app.getRootNav().push('GoldMainPage');
    } else {
      let alert = this.alertCtrl.create({
        title: '点金保理平台登录',
        inputs: [
          {
            name: 'name',
            placeholder: '请输入点金保理账号'
          },
          {
            name: 'password',
            placeholder: '请输入密码',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: data => {

            }
          },
          {
            text: '登录',
            handler: data => {
              console.log(data.name);
              let that = this;
              $.ajax({
                url: 'http://mytest888.natapp1.cc/factor/app/login',
                data: {
                  mobileLogin: 'true',
                  username:data.name,
                  password:data.password


                  // username: 'qyxinry',
                  // password: 'qyxinry'


                  // username:'ywjl',
                  // password:'ywjl'
                  // username:'sunwoda',
                  // password:'123456'
                  // username:'zjl',
                  // password:'zjl'
                  // username:'fkjl',
                  // password:'fkjl'
                  // username:'zjl',
                  // password:'zjl'
                  // username:'cwzg',
                  // password:'123456'
                },
                type: "post",
                success: function (res) {
                  console.log(res);
                  if(res.message=='密码错误!'){
                    const alert = that.alertCtrl.create({
                      title: '温馨提示',
                      subTitle: '密码错误',
                      buttons: ['确定']
                    });
                    alert.present();
                  }else{
                    localStorage.setItem("ifDianJinLogin", "true");
                    localStorage.setItem("roleName", res.extData.companyType);
                    localStorage.setItem("name", res.extData.companyName);
                    localStorage.setItem("userId", res.extData.userId);
                    localStorage.setItem("username", res.extData.userName);
                    localStorage.setItem("sellerId", res.extData.companyId);
                    that.app.getRootNav().push('GoldMainPage');
                  }
                },
                error: function () {
                }
              })
            }
          }
        ]
      });
      alert.present();
    }

  }

  loadingAlert() {
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

  optionDetail() {
    // this.app.getRootNav().push(  'ReconciliationPage' );
    alert('物流中心还在完善中,敬请期待!')
  }

  //跳转到产品列表
  goProducts() {
    this.app.getRootNav().push('ProductionPage', {whatSend: 0});
  }

  //跳转到需求列表
  goApplys() {
    this.app.getRootNav().push('ApplyPage');
  }

  //跳转到集采列表
  goPurchases() {
    this.app.getRootNav().push('PurchasePage');
  }

  //跳转到招标列表
  goInvites() {
    this.app.getRootNav().push('InvitePage');
  }

  //携带参数跳转到商品详情界面
  productionDetails(a, b, c, d) {
    this.app.getRootNav().push('GoodsdetailsPage', {name: a, howhot: b, howmuch: c, id: d, what: 0});
  }

  //携带参数跳转到需求详情界面
  appliesDetails(a) {
    this.app.getRootNav().push('ApplyDetailsPage', {applyId: a});
  }

  //携带参数跳转到集采详情界面
  goToPurchaseDetails(n) {
    this.app.getRootNav().push('PurchaseDetailsPage', {"orderId": n})
  }

  //携带参数跳转到招标详情界面
  inviteDetails(id) {
    this.app.getRootNav().push('InviteDetailsPage', {id: id})
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({
      ev: myEvent
    });
  }

  goSearch() {
    window.localStorage.setItem("searchKey", this.searchKey);
    this.app.getRootNav().push('ProductionPage', {whatSend: 2});
    this.hiddenCan();
    this.hiddenCan()
    // this.searchKey='';
    // var data=1;
    // this.events.publish('pop:showCancel',data, Date.now());
  }

  openBigImg() {
    console.log(this.slides);
    var a = this.slides;
    for (var i = 0; i < a.length; i++) {
      let b = a[i].imgPath;
      let c = {url: b};
      this.photos.push(c)
    }
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos,
    });
  }

}
