//全局变量类管理购物车数量及点金保理接口头部
export class GlobalVariable {
public static shopCount:number=0;

public static dianjinHeader:string='http://mytest888.natapp1.cc/factor/';
public static dianjinHeadData = {
  totalPrice:0,
  type:"",
  sellerName:"",
  buyerName:"",
  myDateStart:"",
  myDateEnd:"",
  preferMonth:"",
  dept:"",
  countDays:"",
  tips:"",
  buyerId:'',
  remarks:''


};

public static dianjinArrayData:Array<any> = [];
public static dianjinCodeData:Array<any> = [];
public static dianjinTotalCost:number=0;
public static dianjinRongziData={
  id:"",
  sellerName:"中国能源建设集团庆元新能源有限公司",
  socialCreditCode:"33112600002201W",
  buyerName:"欣旺达电子股份有限公司",
  orgDept:"电池事业一部",
  applicant:"",
  applicantTell:"",
  accounting:"",
  sendDate:"2019-02-26",
  receivedDate:"2019-02-27",
  ownMonth:"2019-02",
  receivableOrderNo:"2019022601",
  receiptsTotal:0,

  companyId:"中国能源建设集团庆元新能源有限公司",
  financingNo:"DJ01161",
  billList:[],
  ratio:0.8,
  possibleLoanTotal:0,
  financingDate:null,
  rate:0.12,
  loanTotal:0,
  startDate:"",
  endDate:"",
  deadline:0,
  payway:"1",
  gatherAccount:"",
  financeType:"",
  salemanId:"",
  saleman:"",
  billNo:1
}
}
