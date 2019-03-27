import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServicelocal } from '../../../../service/HttpServicelocal';
/**
 * Generated class for the InvoiceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoice-detail',
  templateUrl: 'invoice-detail.html',
})
export class InvoiceDetailPage {
  showNoContent:boolean=false;
  dataSource=[];
  name='';
  id;
  personStatus='';
  pageNum=1;
  pageSize=5;
  infiniteScroll;
  closeScrol:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServicelocal) {
    this.id = navParams.get('data');
    this.personStatus = navParams.get('personStatus');
    console.log(this.id)
  }
  ionViewDidLoad() {
    var role=localStorage.getItem("role");
    if(role=='0'){
      this.name='销项发票详情';
    }else{
      this.name='进项发票详情';
    }
    console.log(this.id);
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
    if(res.data.length==0){
      this.showNoContent=true
    }
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
}
