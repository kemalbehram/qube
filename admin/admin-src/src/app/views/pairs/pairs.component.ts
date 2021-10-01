import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from '../../common.service';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { NgbModal, ModalDismissReasons,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { environment } from '../../../environments/environment';

declare var require: any;
// const web3 = new Web3(window.ethereum);
 // window.ethereum.enable();

// import Web3 from 'web3';
declare let window;

let contract_details    = require('../../shared/files/contract.json');
let abi_details         = require('../../shared/files/master_abi.json');
let reward_abi          = require('../../shared/files/reward_abi.json');
let token_abi_details 	= require('../../shared/files/token_abi.json');

@Component({
  selector: 'app-pairs',
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.scss']
})
export class PairsComponent implements OnInit {
@ViewChild(DatatableComponent,{static: false}) usertable:DatatableComponent;
// symbol=[{1},{2}]
// symbol:any[]=[1,2];
   fcurrency = "";
  symbol=[
    {
       "values":1,
       "symbolval":"+(Plus)",
      
    },
    {
       "values":2,
       "symbolval":"-(Minus)"
    }
    ]
    userrows = [];
    userlist = [];
 	  usertemp = [];
     limits = [
      { key: '10', value: 10 },
      { key: '25', value: 25 },
      { key: '50', value: 50 },
      { key: '100', value: 100 }
    ];
    page = {
      size: this.limits[0].value,totalElements:0,totalPages:0,pageNumber:0
    }
      defsort: any = {dir: "desc", prop: "createddate"};
    defsearch = "";
     loading: boolean = false;
     rowLimits: Array<any> = this.limits;
    limit: number = this.limits[0].value;
    viewuserdt={};
    useremail:any;
   modalRef: NgbModalRef;
    banner_Status
    Datas:any={};
    currencyData:any=[];
    currencyObj
    serviceHost=environment.BackendHost;
    createpairlist:any={};
      dataLoader:Boolean=false;
      showbase_coin:boolean = false;
    showbase_token:boolean = false;
    FromSubmit:Boolean=false;
    web3;
    public submitdata: any    = {};

isNumberKey(event){
      // const charCode = (event.which) ? event.which : event.keyCode;
 const charCode = (event.which) ? event.which : event.keyCode

 if ((charCode > 34 && charCode < 41) || (charCode > 47 && charCode < 58) || (charCode == 46) || (charCode == 8) || (charCode == 9))
 {
  return true;
 }
  return false;
 
 
}

    constructor(private toastr: ToastrManager,private modalService: NgbModal, private CommonService: CommonService,private cookieService: CookieService,private http:Http) {
      //login check
        this.CommonService.sessioncheck();
        this.CommonService.ipcheck();
      //login check
      // this.web3 = Web3
      //
       this.enable_metamask();
      //
    }

    ngOnInit() {
      this.loadpairs();
      this.loadcurrency();
    }
    
    from_currency=[];

    loadcurrency(){
      this.CommonService.getData('currency/get_currency')
      .subscribe(async resData => {
        this.currencyData = resData.msg;
        await this.currencyData.map(item=>{
          if(item.currency_type==="token"){
            this.from_currency.push(item)
          }
        })
      });
    }
    // enable metamask
      enable_metamask(){
        console.clear();
        console.log("enable ---> metamask ");
        if (typeof window.web3 !== 'undefined') {
          this.web3 = window.web3.currentProvider;
        } else {
          this.web3 = new window.Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ace26df5eee341b3ab52f89fd7f56d49');
        }
          window.web3 = new window.Web3(window.ethereum);
          // window.ethereum.enable();
          window.ethereum;
      }

    // enable metamask

    loadpairs(){
      this.dataLoader = true;
      var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
      this.loading = true;
      this.CommonService.requestData('admin/pairslist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.pairscount;
        this.page.totalPages = this.page.totalElements / this.page.size;
        this.userlist = resData.data;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
        this.dataLoader = false;
      });
    }
    loaduserlist(page,sort,search){
      this.loading = true;
      var lstinput = {"page":page,"sorting":sort,"search":search};
      this.CommonService.requestData('admin/pairslist',lstinput)
      .subscribe(resData => {
        this.userlist = resData.data;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
      });
    }

    bannermodel(content,values) {
      this.Datas=values;
      this.modalRef = this.modalService.open(content,{size:'lg'});
      
    }
 

    //drop down of number
    changeRowLimits(event) {
      this.userlist = [];
      this.usertemp = this.userlist;
      this.userrows = this.userlist;
      this.page.size = +event.target.value;
      this.page.pageNumber = 0;
      this.usertable.limit = event.target.value;
      this.loaduserlist(this.page,this.defsort,this.defsearch);
    }


    //refresh 

    resetuserlist(){
      this.limits = [
        { key: '10', value: 10 },
        { key: '25', value: 25 },
        { key: '50', value: 50 },
        { key: '100', value: 100 }
      ];

      this.limit = this.limits[0].value;
      this.rowLimits = this.limits;

      this.page = {
        size: this.limits[0].value,totalElements:0,totalPages:0,pageNumber:0
      }
      this.defsort = {dir: "desc", prop: "createddate"};
      this.defsearch = "";

      var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
      this.loading = true;
      this.CommonService.requestData('admin/pairslist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.pairscount;
        this.page.totalPages = this.page.totalElements / this.page.size;
        this.userlist = resData.data;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
      });

    }

    //filter of search
    updateFilter() {
        this.loading = true;
        var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
        this.CommonService.requestData('admin/pairslist',lstinput)
        .subscribe(resData => {
          this.page.totalElements = resData.pairscount;
          this.page.totalPages = this.page.totalElements / this.page.size;
          this.userlist = resData.data;
          this.usertemp = this.userlist;
          this.userrows = this.userlist;
          this.loading = false;
        });
    }
    
    //page limit in table
    setPage(pageInfo){
      this.userlist=[];
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
      this.page.pageNumber = pageInfo.offset;
      this.loaduserlist(this.page,this.defsort,this.defsearch);
    }

    onSort(event) {
      this.page.pageNumber = 0;
      this.defsort = event.sorts[0];
      this.loaduserlist(this.page,this.defsort,this.defsearch);
    }
    edithostlist = {"total_amt":"","_id": "","pair":"","buylimit":"","buylimitvalue":"","buyrate":"","selllimit":"","selllimitvalue":"","sellrate":"","marketPrice":"","max_amt":"","fee":"","fee_type":"","min_amt":""};

      // editIndex = -1;
    openeditmodel(content,bannerrow) {
      // this.editIndex = bannerrow.$index;
      var pair_details = bannerrow.pair.split('/');
      this.fcurrency   = pair_details[0];
      this.edithostlist = {"total_amt":bannerrow.total_amt,"_id": bannerrow._id,"pair": bannerrow.pair,"buylimit": bannerrow.buylimit,"buylimitvalue": bannerrow.buylimitvalue,"buyrate":bannerrow.buyrate,"selllimit":bannerrow.selllimit,"selllimitvalue":bannerrow.selllimitvalue,"sellrate":bannerrow.sellrate,"marketPrice":bannerrow.marketPrice,"max_amt":bannerrow.max_amt,"fee":bannerrow.fee,"fee_type":bannerrow.fee_type,"min_amt":bannerrow.min_amt,};
      this.modalRef = this.modalService.open(content,{size:'lg'});
      
    }
    reformdata(){
      this.createpairlist={}
      this.showbase_coin = false;
      this.showbase_token = false;
    }
    checkradioChange(event)
    {
      if(event == 'Base Currency Coin')
      {
         this.showbase_coin = true;
         this.showbase_token = false;
      }
      else{
        this.showbase_token = true;
        this.showbase_coin = false;

      }
    }

    async setdecimal(){
        let contractDetails = this.createpairlist.fromCurrency_address;
        let abiArray        = token_abi_details;
        let contract        = new window.web3.eth.Contract(abiArray, contractDetails);
        let decimals        = await contract.methods.decimals().call();
        this.createpairlist.fromCurrency_decimal = decimals;

    }

    async opencreatepairmodel(content) {
      this.modalRef = this.modalService.open(content,{size:'lg'});
      var lstinput = {"msg":1};
    }

    change_symbol(event)
    {
      this.createpairlist.pairvalue = event.target.value + '-' + 'ETH';
    }
    async onSubmitData(data){
      if(this.createpairlist.fromCurrency==this.createpairlist.toCurrency){
        return this.toastr.errorToastr("Please select different From and To currencies","Oops");
      }
      await this.CommonService.requestData('admin/createpair',this.createpairlist)
      .subscribe(resData => {
          if(resData.status){
             this.toastr.successToastr(resData.msg, 'Success!');
          }else{
             this.toastr.errorToastr(resData.msg,"Oops");
          }
          this.createpairlist={}
          this.loadpairs();
          this.modalRef.close();
      });
    }


    // onSubmitData(data)
    // {
    //   this.createpairlist.fromCurrency = this.createpairlist.fromCurrency.toUpperCase();
    //    this.createpairlist.fromCurrency_address = this.createpairlist.fromCurrency_address.toLowerCase();
    //    this.CommonService.requestData('admin/createpair',this.createpairlist)
    //   .subscribe(resData => {
    //       this.toastr.successToastr(resData.msg, 'Success!');
    //        this.modalRef.close();
    //   });
    //   this.loadpairs();
    // }

    async addContractmodel(items){
      let self = this;
      if(!items.contract_add_status){
        //add contract code here
        let contractDetails = contract_details.sammaster_contract;
        let abiArray   = abi_details;
        let contract 	 =  new window.web3.eth.Contract(abiArray, contractDetails);
        // let contract 	 =  new web3.eth.Contract(abiArray, contractDetails)
        const address = await contract.methods.owner().call();
        let pairAddress = items.pair_address;
        contract.methods.add(100,pairAddress,true).send({from:address}).then(async function(result){
          if(result.status){
            //checking pool length
            const poolLength = await contract.methods.poolLength().call();
            if(poolLength){
              //update status in pairs table
              self.CommonService.requestData('farming/updateAddContractStatus',{id:items._id,poolId:poolLength-1}).subscribe((res)=>{
                if(result.status){
                  self.loadpairs();
                }
              })
            }
          }
          self.toastr.successToastr('Your requset has been send successfully', 'Success!');
        });
      }else{
        this.toastr.errorToastr('Already Contract was added for this pair');
      }
    }

    buycalculation(edithostlist){
      var percentvalue=(edithostlist.marketPrice*edithostlist.buylimitvalue)/100
      if(edithostlist.buylimit=="plus"){
        var fa=edithostlist.marketPrice+percentvalue
        // edithostlist.buyrate=this.decimalrounds(fa,4)
        edithostlist.buyrate=fa
      }
      else if(edithostlist.buylimit=="minus"){
        var fb=(edithostlist.marketPrice)-(percentvalue)
        // edithostlist.buyrate=this.decimalrounds(fb,4)
        edithostlist.buyrate=fb
      }
    }

    sellcalculation(edithostlist){
      var pervalue=(edithostlist.marketPrice*edithostlist.selllimitvalue)/100
        if(edithostlist.selllimit=="plus"){
          var sb= edithostlist.marketPrice+pervalue
          // edithostlist.sellrate=this.decimalrounds(sb,4)
          edithostlist.sellrate=sb
      }
      else if(edithostlist.selllimit=="minus"){
        var sc=(edithostlist.marketPrice)-(pervalue)
        // edithostlist.sellrate=this.decimalrounds(sc,4)
        edithostlist.sellrate=sc
      }
    }
    buyratecalculation(edithostlist){
      var ratevalue=(edithostlist.marketPrice*edithostlist.buylimitvalue)/100
      if(edithostlist.buylimit=="plus"){
        var b= edithostlist.marketPrice+ratevalue
        edithostlist.buyrate=b
      }
      else if(edithostlist.buylimit=="minus"){
        var c=(edithostlist.marketPrice)-(ratevalue)
        // edithostlist.buyrate=this.decimalrounds(c,4)
        edithostlist.buyrate=c
      }
    }
    sellratecalculation(edithostlist){
      var sellratevalue=(edithostlist.marketPrice*edithostlist.selllimitvalue)/100
      if(edithostlist.selllimit=="plus"){
        var cb= edithostlist.marketPrice+sellratevalue
        // edithostlist.sellrate=this.decimalrounds(cb,4)
        edithostlist.sellrate=cb
      }else if(edithostlist.selllimit=="minus"){
        var cc=(edithostlist.marketPrice)-(sellratevalue)
        // edithostlist.sellrate=this.decimalrounds(cc,4)
        edithostlist.sellrate=cc
      }
    }

    submitted:boolean=false;

    editpairs(pairsform){
      this.submitted = true;
      this.CommonService.requestData('admin/pairsupdate',this.edithostlist).subscribe(resData=>{
        if(resData.status==true){
        this.toastr.successToastr('Pairs field updated','Success');
        this.modalRef.close();
        this.loadpairs();
        }
        else{
        this.toastr.errorToastr('While updating','Error');
        }
      });
    }

    bannersvalue = {};
    banner = "";
    changehost(content, bannerrow){
      this.bannersvalue = bannerrow;
      // this.bannerindx = bannerrow.$$index;
      this.modalRef = this.modalService.open(content,{size:'sm'});
        //   this.modalRef.result.then((result) => {
        //      this.closeResult = `Closed with: ${result}`;
        //   }, (reason) => {
        //      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // });
    }
      changebannerStatus(bannersvalue) {
      if(bannersvalue.status == "Active"){
        this.bannersvalue = "Deactive";
      }else{
        this.bannersvalue = "Active";
      }
      this.currencyObj = {"_id":bannersvalue._id,"status": this.bannersvalue};
      this.CommonService.requestData('admin/pairsstatus', this.currencyObj).subscribe(resData => {
        if(resData){
          this.toastr.successToastr('Pair status changed Successfully!', 'Success');
          if(this.cookieService.get('role') == 'admin'){
            this. loadpairs();
          }else{
              this. loadpairs();
          }
        }else{
            this. loadpairs();
        }
      })
    }

    decimalrounds(value, length) {
      return this.CommonService.testrounds(+value, length);
    };



    // stack contract function
      reward_token_contract = '';
      total_supply_amount:any;
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      pair_check_stake  = false;
      ok_check_stake    = false;


      async check_stake(pair){
        let obj = {
                    pair : pair
                  }
        await this.CommonService.requestData('admin/check_cherry',obj).subscribe(resData=>{
          this.pair_check_stake  = true;
          if(resData.status==true) {
            this.ok_check_stake    = true ;
          } else {
            this.ok_check_stake    = false ;
          }
        });
      }

      async willadd(){
          this.submitdata.pair                  = this.Datas.pair;
          this.submitdata.pair_address          = this.Datas.pair_address;
          this.submitdata.fromCurrency          = this.Datas.fromCurrency;
          this.submitdata.toCurrency            = this.Datas.toCurrency;
          this.submitdata.fromCurrency_address  = this.Datas.fromCurrency_address;
          this.submitdata.toCurrency_address    = this.Datas.toCurrency_address;
          this.submitdata.fromCurrency_type     = this.Datas.fromCurrency_type;
          this.submitdata.toCurrency_type       = this.Datas.toCurrency_type;
        
          let accounts        = await window.web3.eth.getAccounts();
          let cur_address     = accounts[0];
          console.clear();

          this.check_stake(this.Datas.pair); 
          await this.sleep(2000);

          if(typeof(cur_address) == "undefined") {
            this.toastr.errorToastr('Kindly login metamask !!!', 'OOPS!');
          } else {  
            if(this.pair_check_stake) {
              if(this.ok_check_stake){
                  cur_address         = cur_address.toLowerCase();
                  let contract        = new window.web3.eth.Contract(reward_abi, contract_details.reward_contract);

                  let owneraddress    = await contract.methods.owner().call();
                  owneraddress        = owneraddress.toLowerCase();
                  
                  if(owneraddress == cur_address) {
                    let pair_address = this.Datas.pair_address;

                        // let amount        = 100000;
                        // let amount        = 100;
                        let amount        = this.Datas.rewards;
                        let reawardamount = await window.web3.utils.toWei(amount.toString(), 'ether');

                        this.submitdata.amount        = amount;
                        this.submitdata.total_value   = amount;
                        this.total_supply_amount      = amount;
                        this.submitdata.pair_address  = pair_address;
                        this.submitdata.type          = "pair";

                        // return;

                        // very new 
                          await contract.methods.add(100,pair_address,false).send({from:cur_address}).on('transactionHash', (hash) => {
                          }).on('receipt',async (getRewardresult) => {
                            if(getRewardresult) {
                              await this.sleep(1000);
                              contract.methods.poolLength().call(async(err,length) =>{
                                if(err) {
                                  this.toastr.errorToastr('Something went to wrong. Please try again later');
                                } else {
                                  this.submitdata.rewardedaddresss        = contract_details.reward_contract;
                                  this.reward_token_contract              = contract_details.reward_contract;
                                  this.submitdata.reward_token_contract   = contract_details.token_contract;
                                  this.submitdata.poolId                  = length-1;
                                  
                                  this.submitdata.txhash                  = getRewardresult.transactionHash;
                                  await this.CommonService.requestData('admin/insert_cherry',this.submitdata).subscribe(resData=>{
                                    if(resData.status==true) {
                                      this.toastr.successToastr('Requset has been completed','Success');
                                    } else {
                                      this.toastr.errorToastr('Something went to wrong! Please try again later.','Error');
                                    }
                                  });
                                }
                              });
                            } else {
                              // console.log("err ---->",err);
                              this.toastr.errorToastr('Something went to wrong!', 'Error');
                            }
                          }).on('confirmation', (confirmationNumber, getRewardresult) => {

                          }).on('error', (error) =>{
                            if(error.message = "MetaMask Tx Signature: User denied transaction signature") {
                              this.toastr.errorToastr('Transaction Rejected!!!', 'OOPS!');
                            } else {
                              this.toastr.errorToastr('Something went wrong try after Sometime !!!', 'OOPS!');
                            }

                            this.dataLoader = false; 
                            // setTimeout(()=>{
                            //   location.reload();
                            // }, 3000);
                          });
                        // very new 

                        // new 
                          // await contract.methods.deploy(pair_address,reawardamount).send({from:cur_address}).on('transactionHash', (hash) => {
                          //   console.log("a ------>",hash);
                          // }).on('receipt',async (getRewardresult) => {
                          //   if(getRewardresult) {
                          //     await this.sleep(3000);
                          //     await contract.methods.stakingRewardsInfoByStakingToken(this.submitdata.pair_address).call({from:cur_address},(err,StakingTokenresult) =>{
                          //       this.submitdata.rewardedaddresss        = StakingTokenresult[0];
                          //     });
                              
                          //     await contract.methods.rewardsToken().call({from:cur_address},(err,rewardTokensresult) =>{
                          //       this.reward_token_contract              = rewardTokensresult;
                          //       this.submitdata.reward_token_contract   = rewardTokensresult;
                          //     });

                          //     this.submitdata.txhash        = getRewardresult.transactionHash;
                          //     await this.CommonService.requestData('admin/insert_cherry',this.submitdata).subscribe(resData=>{
                          //       if(resData.status==true) {
                          //         this.toastr.successToastr('Requset has been completed','Success');
                          //         this.publish_approve();
                          //       } else {
                          //         this.toastr.errorToastr('Something went to wrong! Please try again later.','Error');
                          //       }
                          //     });
                          //   } else {
                          //     // console.log("err ---->",err);
                          //     this.toastr.errorToastr('Something went to wrong!', 'Error');
                          //   }
                          // }).on('confirmation', (confirmationNumber, getRewardresult) => {
                          //   console.log("c1 ------->",confirmationNumber);
                          //   console.log("c2 ------->",getRewardresult);
                          // }).on('error', (error) =>{
                          //   //  console.log( error );
                          //   if(error.message = "MetaMask Tx Signature: User denied transaction signature") {
                          //     this.toastr.errorToastr('Transaction Rejected!!!', 'OOPS!');
                          //   } else {
                          //     this.toastr.errorToastr('Something went wrong try after Sometime !!!', 'OOPS!');
                          //   }

                          //   this.dataLoader = false; 
                          //   // setTimeout(()=>{
                          //   //   location.reload();
                          //   // }, 3000);
                          // });
                        // new 
                  } else {
                    this.toastr.errorToastr('Kindly use authorized account !!!', 'OOPS!');
                  }
              }else{
                this.toastr.errorToastr('Already staked', 'OOPS!');
              }
            } else {
              this.check_stake(this.Datas.pair);
            }
          }
      }

      async willadd1234(){
          this.submitdata.pair                  = this.Datas.pair;
          this.submitdata.pair_address          = this.Datas.pair_address;
          this.submitdata.fromCurrency          = this.Datas.fromCurrency;
          this.submitdata.toCurrency            = this.Datas.toCurrency;
          this.submitdata.fromCurrency_address  = this.Datas.fromCurrency_address;
          this.submitdata.toCurrency_address    = this.Datas.toCurrency_address;
          this.submitdata.fromCurrency_type     = this.Datas.fromCurrency_type;
          this.submitdata.toCurrency_type       = this.Datas.toCurrency_type;
        
          let accounts        = await window.web3.eth.getAccounts();
          let cur_address     = accounts[0];
          console.clear();

          // this.check_stake(this.Datas.pair); 
          await this.sleep(2000);

          if(typeof(cur_address) == "undefined") {
            this.toastr.errorToastr('Kindly login metamask !!!', 'OOPS!');
          } else {  
            console.log( " for this.pair_check_stake ---->", this.pair_check_stake );
            cur_address         = cur_address.toLowerCase();
            console.log( " for cur_address ---->", cur_address );
            // console.log( " for contract_details.reward_contract ---->", contract_details.reward_contract );

            let contract        = new window.web3.eth.Contract(reward_abi, contract_details.reward_contract);

            let owneraddress    = await contract.methods.owner().call();
            owneraddress        = owneraddress.toLowerCase();
            
            // console.log(" for owneraddress ---->", owneraddress);
            if(owneraddress == cur_address) {
              let pair_address = this.Datas.pair_address;
              // console.log(" for pair_address ---->", pair_address);

                  // let amount        = 100000;
                  // let amount        = 100;
                  let amount        = this.Datas.rewards;
                  let reawardamount = await window.web3.utils.toWei(amount.toString(), 'ether');

                  this.submitdata.amount        = amount;
                  this.submitdata.total_value   = amount;
                  this.total_supply_amount      = amount;
                  this.submitdata.pair_address  = pair_address;
                  this.submitdata.type          = "pair";

                  // console.log("contract.methods ----->",contract.methods);
                  // return;

                  // very new 
                    contract.methods.poolLength().call(async(err,length) =>{
                      if(err) {
                        this.toastr.errorToastr('Something went to wrong. Please try again later');
                      } else {
                        this.submitdata.rewardedaddresss        = contract_details.reward_contract;
                        this.reward_token_contract              = contract_details.reward_contract;
                        this.submitdata.reward_token_contract   = contract_details.token_contract;
                        this.submitdata.poolId                  = length-1;
                        
                        this.submitdata.txhash                  = "0x39ef2167deda2f431ce00a7db38efa29b846e5b13cbc5eb507bd3ed0689fdb30";
                        console.log( " this.submitdata 777 ----> ", this.submitdata );
                        await this.CommonService.requestData('admin/insert_cherry',this.submitdata).subscribe(resData=>{
                          if(resData.status==true) {
                            this.toastr.successToastr('Requset has been completed','Success');
                          } else {
                            this.toastr.errorToastr('Something went to wrong! Please try again later.','Error');
                          }
                        });
                      }
                    });
                    // await contract.methods.add(100,pair_address,false).send({from:cur_address}).on('transactionHash', (hash) => {
                    // }).on('receipt',async (getRewardresult) => {
                    //   if(getRewardresult) {
                    //     await this.sleep(1000);
                    //     contract.methods.poolLength().call(async(err,length) =>{
                    //       if(err) {
                    //         this.toastr.errorToastr('Something went to wrong. Please try again later');
                    //       } else {
                    //         this.submitdata.rewardedaddresss        = contract_details.reward_contract;
                    //         this.reward_token_contract              = contract_details.reward_contract;
                    //         this.submitdata.reward_token_contract   = contract_details.token_contract;
                    //         this.submitdata.poolId                  = length-1;
                            
                    //         this.submitdata.txhash                  = getRewardresult.transactionHash;
                    //         await this.CommonService.requestData('admin/insert_cherry',this.submitdata).subscribe(resData=>{
                    //           if(resData.status==true) {
                    //             this.toastr.successToastr('Requset has been completed','Success');
                    //           } else {
                    //             this.toastr.errorToastr('Something went to wrong! Please try again later.','Error');
                    //           }
                    //         });
                    //       }
                    //     });
                    //   } else {
                    //     // console.log("err ---->",err);
                    //     this.toastr.errorToastr('Something went to wrong!', 'Error');
                    //   }
                    // }).on('confirmation', (confirmationNumber, getRewardresult) => {
                    //   console.log("c1 ------->",confirmationNumber);
                    //   console.log("c2 ------->",getRewardresult);
                    // }).on('error', (error) =>{
                    //   if(error.message = "MetaMask Tx Signature: User denied transaction signature") {
                    //     this.toastr.errorToastr('Transaction Rejected!!!', 'OOPS!');
                    //   } else {
                    //     this.toastr.errorToastr('Something went wrong try after Sometime !!!', 'OOPS!');
                    //   }

                    //   this.dataLoader = false; 
                    //   // setTimeout(()=>{
                    //   //   location.reload();
                    //   // }, 3000);
                    // });
                  // very new 

                  // new 
                    // await contract.methods.deploy(pair_address,reawardamount).send({from:cur_address}).on('transactionHash', (hash) => {
                    //   console.log("a ------>",hash);
                    // }).on('receipt',async (getRewardresult) => {
                    //   if(getRewardresult) {
                    //     await this.sleep(3000);
                    //     await contract.methods.stakingRewardsInfoByStakingToken(this.submitdata.pair_address).call({from:cur_address},(err,StakingTokenresult) =>{
                    //       this.submitdata.rewardedaddresss        = StakingTokenresult[0];
                    //     });
                        
                    //     await contract.methods.rewardsToken().call({from:cur_address},(err,rewardTokensresult) =>{
                    //       this.reward_token_contract              = rewardTokensresult;
                    //       this.submitdata.reward_token_contract   = rewardTokensresult;
                    //     });

                    //     this.submitdata.txhash        = getRewardresult.transactionHash;
                    //     await this.CommonService.requestData('admin/insert_cherry',this.submitdata).subscribe(resData=>{
                    //       if(resData.status==true) {
                    //         this.toastr.successToastr('Requset has been completed','Success');
                    //         this.publish_approve();
                    //       } else {
                    //         this.toastr.errorToastr('Something went to wrong! Please try again later.','Error');
                    //       }
                    //     });
                    //   } else {
                    //     // console.log("err ---->",err);
                    //     this.toastr.errorToastr('Something went to wrong!', 'Error');
                    //   }
                    // }).on('confirmation', (confirmationNumber, getRewardresult) => {
                    //   console.log("c1 ------->",confirmationNumber);
                    //   console.log("c2 ------->",getRewardresult);
                    // }).on('error', (error) =>{
                    //   //  console.log( error );
                    //   if(error.message = "MetaMask Tx Signature: User denied transaction signature") {
                    //     this.toastr.errorToastr('Transaction Rejected!!!', 'OOPS!');
                    //   } else {
                    //     this.toastr.errorToastr('Something went wrong try after Sometime !!!', 'OOPS!');
                    //   }

                    //   this.dataLoader = false; 
                    //   // setTimeout(()=>{
                    //   //   location.reload();
                    //   // }, 3000);
                    // });
                  // new 
            } else {
              this.toastr.errorToastr('Kindly use authorized account !!!', 'OOPS!');
            }
              
            
          }
      }
    // stack contract function
}
