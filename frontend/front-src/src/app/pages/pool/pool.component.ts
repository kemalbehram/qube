import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/common/services/common/common.service';
import { DataService } from 'src/app/common/services/api/data.service';

import { AuthmetamaskService } from 'src/app/common/services/metamask/auth/authmetamask.service';
import { CommonMetamaskService } from 'src/app/common/services/metamask/common/common-metamask.service';
import { LiqudityService } from 'src/app/common/services/metamask/liqudity/liqudity.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';

// contract details
	import { ContractDetails } from "src/assets/files/contract";
	import { RouterAbi } from "src/assets/files/router_abi";
	import { TokenAbi } from "src/assets/files/token_abi";
	import { PairAbi } from "src/assets/files/pair_abi";
// contract details

declare let window: any;
let min_percentage      = 0.5;

import * as _ from 'lodash'; 


@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {
	@ViewChild('staticModal_adf') staticModal_adf;
	@ViewChild('staticModal_ads') staticModal_ads;

	liquditylistShow 			= true;
	AddLiqudityShow 			= false;
	RemoveLiqudityShow 			= false;
	importpoolshow 				= false;

	public addlq_first_currency 			= '';
	public addlq_first_currency_show 		= false;
	public addlq_sec_currency: any 			= [];
	public addlq_sec_currency_temp;
	public addlq_first_currency_logo        = '';

	public addlq_second_currency 			= '';
	public addlq_second_currency_show 		= false;
	public addlq_first_currency_balance 	= 0;
	public addlq_second_currency_balance 	= 0;
	public addlq_second_currency_logo       = '';

	public addlq_fullpair_data: any 		= {};
	public addlq_from_currency: any 		= [];
	public addlq_from_currency_temp			= [];
	addpoolformdata: any 					= {};

	// buttons
    public addlq_approveshow 				= true;
    public addlq_approvesubmitted 			= false;
    public addlq_submitted 					= false;
    public addlq_submittedshow 				= false;

    addlq_textcalculation 					= false;
    pair_from_amount 						= 0;
    pair_to_amount 							= 0;
    calculatedValue;
    
    pairamount_cal 							= false;
    examount_cal   							= false;
    balanceok 								= true;

    // pool history
    	public poolhistory: any 			= [];
		showPairDetails 					= [];
		selectedPairDetails;
		poolDetails:any 					= {};
		selectedCurrencyId;
		toCurrency;


	constructor(private commonservice:CommonService,private dataservice:DataService,private commonmetamaskservice:CommonMetamaskService,private authmetamaskservice:AuthmetamaskService,private liqudityservice:LiqudityService,public router: Router,private uichange:UichangeService) { }

	async ngOnInit() {
		await this.sleep(1000);
		let address_value = localStorage.getItem("account");
		if(address_value){
			this.commonservice.metaDetails.isLogin = true;
		}else{
			this.commonservice.metaDetails.isLogin = false;
		}
		setTimeout(()=>{
			if ( this.commonservice.metaDetails.account == null ) {
				this.commonservice.metaDetails.isLogin = false;
			} else {
				this.commonservice.metaDetails.isLogin = true;
			}
			this.get_pooldetails();
		}, 3000);
	}

	// login wallet
		loginmetamask(){
			this.commonservice.showWalletList.emit(true);
      		return;
		}
	// login wallet

	async checkChainId(){
		this.authmetamaskservice.checkChainId().then(async(result)=>{
		  	if(result.status) {
		  		
		  	} else {
		  		// this.toastr.errorToastr(result.message, 'OOPS!');
		  		this.commonservice.alertmessage("error",result.message);
		  		this.router.navigate(['']);
		  	}
		}).catch((error)=>{
			this.commonservice.alertmessage("error",error);
			// this.toastr.errorToastr(error, 'OOPS!');
		});
	}

	// show liqudity history
		async get_pooldetails(){
			this.checkChainId();
			let address_value = localStorage.getItem("account");
	        if(address_value){
		        this.uichange.changebackground(); 
		    }
			var obj1={
			  "address":this.commonservice.metaDetails.account.toLowerCase()
			}
			await this.dataservice.postUrl('pool/get_pooldetails',obj1).subscribe((resData:any) => {
			  if(resData.status == true) {
			    let resPoolData 	= resData.data;
			    this.poolhistory 	=  _.uniqBy(resPoolData, 'pair');
			  } else {
			  }
			  this.uichange.clearbackground();
			});
		}

		async managePairs(pairDetails, index){
			console.clear();
			this.uichange.changebackground();
			this.showPairDetails[index] = !this.showPairDetails[index];
	        if(this.showPairDetails[index]){
	          for(let i=0; i<this.showPairDetails.length; i++){
	            if(i != index){
	              this.showPairDetails[i] = false;
	            }
	          }
	        }
	        this.selectedPairDetails = pairDetails;
	        let tokenBal;
	        // new 
	        	this.commonmetamaskservice.GetTokenbalance(pairDetails.pair_address,PairAbi,this.commonservice.metaDetails.account).then(async(result)=>{
				  	if(result.status) {
				  		tokenBal 						= await window.web3.utils.fromWei(result.rawbalance.toString(), 'ether');
				        // this.poolDetails.userBalance 	= (result.rawbalance/1000000000000000000).toFixed(8);
				        this.poolDetails.userBalance 	= result.balance;
				  		// get reserves value
				        	this.liqudityservice.GetReserves(pairDetails.pair_address,PairAbi,this.commonservice.metaDetails.account,pairDetails).then(async(result)=>{
				  				if(result.status) {
									let from_amount 			= result.from_amount;
									let to_amount 				= result.to_amount;
									if(pairDetails.fromCurrency_decimal == "18"){
										this.poolDetails.fromCurrency   =  window.web3.utils.fromWei(from_amount.toString(), 'ether');
									} else {
										let decimal             = Math.pow(10, pairDetails.fromCurrency_decimal);
										this.poolDetails.fromCurrency  = from_amount / decimal;
									}
									if(pairDetails.toCurrency_decimal == "18"){
										this.poolDetails.toCurrency    =  window.web3.utils.fromWei(to_amount.toString(), 'ether');
									} else {
										let decimal             = Math.pow(10, pairDetails.toCurrency_decimal);
										this.poolDetails.toCurrency     = to_amount / decimal;
									}

									this.commonmetamaskservice.GetTotalSupply(pairDetails.pair_address,PairAbi).then(async(result)=>{
										if(result.status){
											if(this.poolDetails.userBalance){
									            this.poolDetails.totalShare = (tokenBal/result.totalsupply) * 100;
									        }else{
									            this.poolDetails.totalShare = 0;
									        }

									        // new testing bug fixing
										        this.poolDetails.myfromCurrency  	= ( (+this.poolDetails.fromCurrency) / 100) * (+this.poolDetails.totalShare);
										        this.poolDetails.mytoCurrency  		= ( (+this.poolDetails.toCurrency) / 100) * (+this.poolDetails.totalShare);
									        // new testing bug fixing

										} else {
											// this.toastr.errorToastr(result.message, 'OOPS!');
											this.commonservice.alertmessage("error",result.message);
										}
									}).catch((error)=>{
										// this.toastr.errorToastr(error, 'OOPS!');
										this.commonservice.alertmessage("error",error);
									});
									this.toCurrency           = pairDetails.toCurrency;
				        			this.selectedCurrencyId   = pairDetails._id;
									this.uichange.clearbackground();
				        		} else {
				        			// this.toastr.errorToastr(result.message, 'OOPS!');
				        			this.commonservice.alertmessage("error",result.message);
									this.uichange.clearbackground();
								}
							}).catch((error)=>{
							  	// this.toastr.errorToastr(error, 'OOPS!');
							  	this.commonservice.alertmessage("error",error);
								this.uichange.clearbackground();
							});
						// get reserves value
					} else {
				  		// this.toastr.errorToastr(result.message, 'OOPS!');
				  		this.commonservice.alertmessage("error",result.message);
						this.uichange.clearbackground();
				  	}
				}).catch((error)=>{
				  	// this.toastr.errorToastr(error, 'OOPS!');
				  	this.commonservice.alertmessage("error",error);
					this.uichange.clearbackground();
				});
	        // new
	    }

	    async showaddliqudity(pairdetails=null){
	    	this.show_addliqudity();
	    	// first currency values
			    pairdetails.currency_type 		= pairdetails.fromCurrency_type;
			    pairdetails.contract_address 	= pairdetails.fromCurrency_address;
			    pairdetails.decimal 			= pairdetails.fromCurrency_decimal;
	    		this.addlq_first_currency  		= pairdetails.fromCurrency;
			    this.addlq_first_currency_show 	= true;
			    var obj = {
						    "basecurrency":this.addlq_first_currency
						  }
			    await this.dataservice.postUrl('pool/getpairdetails',obj)
			    .subscribe((resData:any) => {
			    	if(resData.status == true) {
				        this.addlq_sec_currency 		= resData.data;
				        this.addlq_sec_currency_temp 	= resData.data;
				    }
			    });
			    await this.getuserbalance(pairdetails,'addliqudity',"first");
	    	// first currency values
	    	await this.sleep(1000);
	    	// second currency values
	    		this.addlq_second_currency  = pairdetails.toCurrency;
	    		this.addlq_second_currency_logo  = pairdetails.toCurrency_i;
	            this.addlq_second_currency_show = true;
	            this.addpoolformdata.from_amount = '';
	            this.addpoolformdata.to_amount = '';
	            await this.getuserbalance(pairdetails,'addliqudity',"second");
	            await this.getpairaddvalue(pairdetails);
	            this.addlq_fullpair_data = pairdetails;
	    	// second currency values
	    }
	// show liqudity history
	
	show_addliqudity(){
		this.liquditylistShow 		= false;
		this.AddLiqudityShow 		= true;
		this.RemoveLiqudityShow 	= false;
		this.importpoolshow 		= false;
	}

	show_liquditylist(){
		this.liquditylistShow 		= true;
		this.AddLiqudityShow 		= false;
		this.RemoveLiqudityShow 	= false;
		this.importpoolshow 		= false;
	}

	get_from_currency(method){
		if(method=="addliqudity") {
			let url = 'pool/getbasecurrency';
			this.dataservice.getUrl(url).subscribe((resData:any) => {
				this.addlq_from_currency 	= resData.data;
				this.addlq_from_currency_temp 	= resData.data;
				// console.log("this.addlq_from_currency ---->",this.addlq_from_currency);
			})
		}
	}

	async addlq_set_currency(value,method,type){
		if(method=='addliqudity') {
			if(type=="first") {
			    this.addlq_first_currency  		= value._id;
			    this.addlq_first_currency_logo  = value.currency_image;
			    this.addlq_first_currency_show 	= true;
			    var obj = {
						    "basecurrency":this.addlq_first_currency
						  }
			    await this.dataservice.postUrl('pool/getpairdetails',obj)
			    .subscribe((resData:any) => {
			    	// console.log("resData ----->",resData);
			    	if(resData.status == true) {
				        this.addlq_sec_currency 		= resData.data;
				        this.addlq_sec_currency_temp 	= resData.data;
			    		// console.log("this.addlq_sec_currency ----->",this.addlq_sec_currency);
				    }
			    });
			    if(this.commonservice.metaDetails.isLogin){
			    	await this.getuserbalance(value,method,type);
			    }
			    this.staticModal_adf.hide();
			} else if(type=="second") {
			    this.addlq_second_currency  = value.toCurrency;
			    this.addlq_second_currency_logo  = value.toCurrency_i;
	            this.addlq_second_currency_show = true;
	            this.addpoolformdata.from_amount = '';
	            this.addpoolformdata.to_amount = '';
	            if(this.commonservice.metaDetails.isLogin){
		            await this.getuserbalance(value,method,type);
		            await this.getpairaddvalue(value);
	            }
	            this.addlq_fullpair_data = value;
			    this.staticModal_ads.hide();
			}
		}
	}

	async getuserbalance(value,method,type){
		// console.log("value ---->",value);
		// console.log("method ---->",method);
		// console.log("type ---->",type);
    	if(method=='addliqudity') {
		    console.log("first into method ----->",method);
        	if(type=='first') {
		    	console.log("first into type ----->",type);
		    	if(value.currency_type=="token") {
		    		console.log("first into value.currency_type ----->",value.currency_type);
		    		this.commonmetamaskservice.GetTokenbalance(value.contract_address,TokenAbi,this.commonservice.metaDetails.account).then(async(result)=>{
		    			console.log("first result ----->",result);
		    			if(result.status) {
					  		if(value.decimal == 18) {
					  			this.addlq_first_currency_balance = await window.web3.utils.fromWei(result.rawbalance.toString(), 'ether');
					  		} else {
					  			let decimal                       = Math.pow(10, (+value.decimal));
                  				this.addlq_first_currency_balance =  result.rawbalance / decimal;
					  		}
					  	} else {
					  		this.commonservice.alertmessage("error",result.message);
					  		this.addlq_first_currency_balance = 0.0000;
					  	}
					}).catch((error)=>{
					  	this.commonservice.alertmessage("error",error);
					});
		    	} else if(value.currency_type=="coin") {
		    		this.addlq_first_currency_balance = this.commonservice.metaDetails.balance.toString();
		    	}
        	} else if(type=='second') {
        		if( value.toCurrency_type == "token" ) {
		    		this.commonmetamaskservice.GetTokenbalance(value.toCurrency_address,TokenAbi,this.commonservice.metaDetails.account).then(async(result)=>{
					  	if(result.status) {
					  		if(value.toCurrency_decimal == 18) {
		    					this.addlq_second_currency_balance 	= await window.web3.utils.fromWei(result.rawbalance.toString(), 'ether');
					  		} else {
		    					let decimal                       	= Math.pow(10, (+value.toCurrency_decimal));
                  				this.addlq_second_currency_balance 	=  result.rawbalance / decimal;
					  		}
					  	} else {
					  		this.commonservice.alertmessage("error",result.message);
					  		this.addlq_second_currency_balance = 0.0000;
					  	}
					}).catch((error)=>{
					  	this.commonservice.alertmessage("error",error);
					});
		    	} else if( value.toCurrency_type == "coin" ) {
		    		this.addlq_second_currency_balance 	= this.commonservice.metaDetails.balance.toString();
		    	}
		    }
        } else if(method = "removeliqudity"){
   			this.commonmetamaskservice.GetTokenbalance(value,TokenAbi,this.commonservice.metaDetails.account).then(async(result)=>{
  			 	if(result.status) {
			  		this.rawremove_lptoken_balance 	= result.rawbalance;
			  		this.remove_lptoken_balance 	= result.balance;
			  	} else {
			  		this.commonservice.alertmessage("error",result.message);
			  		this.remove_lptoken_balance = 0.0000;
			  	}
			}).catch((error)=>{
			  	this.commonservice.alertmessage("error",error);
			});
        }
    }

    async getpairaddvalue(pairvalue){
    	console.log("pairvalue.pair_address ---->",pairvalue.pair_address);
    	if(pairvalue.pair_address){
    		this.addlq_textcalculation = true;
			this.liqudityservice.GetReserves(pairvalue.pair_address,PairAbi,this.commonservice.metaDetails.account,pairvalue).then(async(result)=>{
				if(result.status) {
					this.pairamount_cal       	= true;
					let from_amount 			= result.from_amount;
					let to_amount 				= result.to_amount;
					if(pairvalue.fromCurrency_decimal == "18") {
						this.pair_from_amount   = window.web3.utils.fromWei(from_amount.toString(), 'ether');
					} else {
						let decimal             = Math.pow(10, pairvalue.fromCurrency_decimal);
						this.pair_from_amount   = from_amount / decimal;
					}
					if(pairvalue.toCurrency_decimal == "18") {
						this.pair_to_amount     = window.web3.utils.fromWei(to_amount.toString(), 'ether');
					} else {
						let decimal             = Math.pow(10, pairvalue.toCurrency_decimal);
						this.pair_to_amount     = to_amount / decimal;
					}
					this.calculatedValue      	=  this.pair_from_amount / this.pair_to_amount;
				} else {
					this.commonservice.alertmessage("error",result.message);
				}
			}).catch((error)=>{
			  	this.commonservice.alertmessage("error",error);
			});
		}else{
			this.addlq_textcalculation 	= false;
			this.pairamount_cal       	= false;
		}
    }

    // price calculation
	    async pricecal(method,type) {
	    	await this.checkpoolbalance();
	    	if((this.pairamount_cal == true || this.examount_cal ==  true)&&(this.addlq_textcalculation==true)) {
				if(method=="addliqudity") {
					if(type=="first") {
						this.addpoolformdata.to_amount 		= (this.addpoolformdata.from_amount / this.calculatedValue).toFixed(4); 
	                	this.addpoolformdata.to_calAmount 	= (this.addpoolformdata.from_amount / this.calculatedValue);
	                	await this.checkpoolbalance();
					} else if(type=="second") {
						this.addpoolformdata.from_amount 	= (this.addpoolformdata.to_amount * this.calculatedValue).toFixed(4);
	                	this.addpoolformdata.from_calAmount = (this.addpoolformdata.to_amount * this.calculatedValue).toFixed(4);
	                	await this.checkpoolbalance();
					}
				} else {
				}
			}		
	    }

	    checkpoolbalance(){
	    	if((+this.addpoolformdata.to_amount > +this.addlq_second_currency_balance)||(+this.addpoolformdata.from_amount > +this.addlq_first_currency_balance)) {
				this.balanceok = true;
			} else {
				if(+this.addpoolformdata.to_amount == 0 || +this.addpoolformdata.from_amount == 0) {
					this.balanceok = true;
				} else {
					this.balanceok = false;
				}
			}
	    }

	// remove liqudity show section
		// remove liqudity
    		public rmvlq_fullpair_data: any = {};
    	// remove liqudity
    	progressValue 					= '100';
    	// RemoveLiqudityShow 				= false;
    	remove_liq_pair_from_amount    	= 0;
    	remove_liq_pair_to_amount    	= 0;
    	remove_lptoken_balance    		= 0;
    	rawremove_lptoken_balance    	= 0;

    	removeapprovesubmitted 			= false;
    	removepoolsubmitted 			= false;
    	removeapproveshow 				= true;
    	removesupplyshow               	= false;

    	notEligibleForRemove            = false;
    	rl_progressbarul_show 			= false;

    	async showremoveliqudity(pairdetails=null){
			this.liquditylistShow 			= false;
			this.AddLiqudityShow 			= false;
			this.RemoveLiqudityShow 		= true;
			this.rmvlq_fullpair_data      	= pairdetails;
			// console.log("this.rmvlq_fullpair_data ----->",this.rmvlq_fullpair_data);
			this.removegetpairaddvalue();
			await this.getuserbalance(this.rmvlq_fullpair_data.pair_address,"removeliqudity","");
		}

		public removepair_response: any = {};
		removepoolformdata: any 		= {};
        async removegetpairaddvalue(){
          if(this.rmvlq_fullpair_data.pair_address){
          	// get reserves
          		this.liqudityservice.GetReserves(this.rmvlq_fullpair_data.pair_address,PairAbi,this.commonservice.metaDetails.account,this.rmvlq_fullpair_data).then(async(result)=>{
          			// console.log("result 123456----->",result);
          			if(result.status) {
						// let from_amount 			= result.from_amount;
						// let to_amount 				= result.to_amount;
						let from_amount 					= (+result.from_amount) * (this.poolDetails.totalShare) / 100 ;
						let to_amount 						= (+result.to_amount) * (this.poolDetails.totalShare) / 100 ;
						from_amount 						= Math.trunc(from_amount);
						to_amount 							= Math.trunc(to_amount);
						// this.poolDetails.myshare_balance 	= (+this.poolDetails.userBalance) * (this.poolDetails.totalShare) / 100 ;
          				this.removepair_response    		= {"from_aamt":from_amount,"to_aamt":to_amount};
						this.pairamount_cal         		= true;
          				if(this.rmvlq_fullpair_data.fromCurrency_decimal == "18") {
							this.remove_liq_pair_from_amount   	= window.web3.utils.fromWei(from_amount.toString(), 'ether');
						} else {
							let decimal             = Math.pow(10, this.rmvlq_fullpair_data.fromCurrency_decimal);
							this.remove_liq_pair_from_amount   	= from_amount / decimal;
						}
						if(this.rmvlq_fullpair_data.toCurrency_decimal == "18") {
							console.log("to_amount ----->",to_amount);
							this.remove_liq_pair_to_amount     	= window.web3.utils.fromWei(to_amount.toString(), 'ether');
						} else {
							console.log("to_amount ----->",to_amount);
							console.log("this.rmvlq_fullpair_data.toCurrency_decimal ----->",this.rmvlq_fullpair_data.toCurrency_decimal);
							let decimal             = Math.pow(10, this.rmvlq_fullpair_data.toCurrency_decimal);
							this.remove_liq_pair_to_amount     	= to_amount / decimal;
						}

						await this.sleep(1000);
          				this.removepoolformdata.from_amount     = this.remove_liq_pair_from_amount;
		                this.removepoolformdata.to_amount       = this.remove_liq_pair_to_amount;
		                
		                // console.log("this.poolDetails.totalShare ------>", this.poolDetails.totalShare);
		                // console.log("rounds ------>", this.rounds(this.poolDetails.totalShare,2));

		                if(this.rounds(this.poolDetails.totalShare,2) == 100){
		                	console.clear();
		                	console.log(" 100 ");
		                }

		                console.log("this.remove_liq_pair_from_amount ----->",this.remove_liq_pair_from_amount);
		                console.log("this.remove_liq_pair_to_amount ----->",this.remove_liq_pair_to_amount);
		                this.removepoolformdata.one_fromAmount  = this.remove_liq_pair_to_amount / this.remove_liq_pair_from_amount ;
		                this.removepoolformdata.one_toAmount    = this.remove_liq_pair_from_amount / this.remove_liq_pair_to_amount ;
		                
		                console.log("removepoolformdata ------>", this.removepoolformdata);
		                
		                await this.progressBar('100');

		                console.log("this.remove_lptoken_balance ----->",this.remove_lptoken_balance);

		            } else {
		            	console.log("error 11111111---->",result);
						// this.toastr.errorToastr(result.message, 'OOPS!');
						this.commonservice.alertmessage("error",result.message);
					}
				}).catch((error)=>{
					console.log("error 22222222---->",error);
				  	// this.toastr.errorToastr(error, 'OOPS!');
				  	this.commonservice.alertmessage("error",error);
				});
	        // get reserves
	      } else {

          }
        }

        async progressBar(value){
          if(this.notEligibleForRemove && value != '100') {
            // this.toastr.errorToastr('Pool Balance is too low to remove less than 100%');
            this.commonservice.alertmessage("error","Pool Balance is too low to remove less than 100%");
          } else {
            this.removepoolformdata.from_amount = this.remove_liq_pair_from_amount;
            this.removepoolformdata.to_amount   = this.remove_liq_pair_to_amount;
            let calculatedValue;
            switch(value){
              case '25':
                calculatedValue = 0.75;
                break;
              case '50' :
                calculatedValue = 0.5;
                break;
              case '75':
                calculatedValue = 0.25;
                break;
              case '100':
                calculatedValue = 0;  
            }
            this.progressValue = value;
            this.removepoolformdata.to_amount = this.removepoolformdata.to_amount - (this.removepoolformdata.to_amount * calculatedValue );
            this.removepoolformdata.from_amount = this.removepoolformdata.from_amount - (this.removepoolformdata.from_amount * calculatedValue );
          }
        }
    // remove liqudity show section

    // add liqudity contract functions
    	addliqudity_fromtextbox 	= false;
    	addliqudity_totextbox 		= false;
    	// approve function
	    async alq_approve_sumbit(){
	    	console.log("into approve function ------>");
	    	await this.checkChainId();
	    	if(this.addlq_fullpair_data.fromCurrency_type == "token" && this.addlq_fullpair_data.toCurrency_type == "token") {
	    		this.addlq_approvesubmitted = true;
				this.uichange.changebackground();
				// from amount approve
					let from_token_address 	= this.addlq_fullpair_data.fromCurrency_address;
					let from_amount 		= 0;
					if(this.addlq_fullpair_data.fromCurrency_decimal == "18"){
						from_amount        	= window.web3.utils.toWei(this.addpoolformdata.from_amount.toString(), 'ether');
	    			} else {
	    				let decimal   		= Math.pow(10, this.addlq_fullpair_data["fromCurrency_decimal"]);
						from_amount        	= this.addpoolformdata.from_amount*(+decimal);
						from_amount        	= Math.trunc(from_amount);
					}
					await this.commonmetamaskservice.ApproveFunction(from_token_address,TokenAbi,ContractDetails.router_contract,from_amount,this.commonservice.metaDetails.account).then(async(result)=>{
						console.log(" from result ---->",result);
						if(result.status) {
							// to amount approve
							let to_token_address 	= this.addlq_fullpair_data.toCurrency_address;
							let to_amount 			= 0;
							if(this.addlq_fullpair_data.toCurrency_decimal == "18"){
			    				to_amount        	= window.web3.utils.toWei(this.addpoolformdata.to_amount.toString(), 'ether');
			    			} else {
			    				let decimal   		= Math.pow(10, this.addlq_fullpair_data["toCurrency_decimal"]);
								to_amount        	= this.addpoolformdata.to_amount*(+decimal);
								to_amount        	= Math.trunc(to_amount);
							}
							await this.commonmetamaskservice.ApproveFunction(to_token_address,TokenAbi,ContractDetails.router_contract,to_amount,this.commonservice.metaDetails.account).then(async(result)=>{
								console.log(" to result ---->",result);
								if(result.status) {
									this.addlq_approvesubmitted = false;
									this.addlq_approveshow = false;
									this.addlq_submittedshow = true;
									this.commonservice.alertmessage("success",'Approved Successfully');
									this.addliqudity_fromtextbox 	= true;
									this.addliqudity_totextbox 		= true;
									this.uichange.clearbackground();
								} else {
									this.commonservice.alertmessage("error",result.message);
									setTimeout(()=>{location.reload();},2000);
								}
							}).catch((error)=>{
							  	this.commonservice.alertmessage("error",error);
							  	setTimeout(()=>{location.reload();},2000);
							});
						} else {
							this.commonservice.alertmessage("error",result.message);
							setTimeout(()=>{location.reload();},2000);
						}
					}).catch((error)=>{
					  	this.commonservice.alertmessage("error",error);
					  	setTimeout(()=>{location.reload();},2000);
					});
			} else {
	    		// coin to token
	    		this.uichange.changebackground();
	    		this.addlq_approvesubmitted = true;
	    		let token_address = '';
	    		let text_box 	  = '';
	    		if( this.addlq_fullpair_data.fromCurrency_type == 'token' ){
	    			token_address 	= this.addlq_fullpair_data.fromCurrency_address;
	    			text_box 		= "from";
	    		} else {
	    			token_address 	= this.addlq_fullpair_data.toCurrency_address;
	    			text_box 		= "to";
	    		}
	    		let amount = 0;
	    		if( text_box == "from" ){
	    			if(this.addlq_fullpair_data.fromCurrency_decimal == "18"){
	    				amount        = window.web3.utils.toWei(this.addpoolformdata.from_amount.toString(), 'ether');
	    			} else {
	    				let decimal   = Math.pow(10, this.addlq_fullpair_data["fromCurrency_decimal"]);
						amount        = this.addpoolformdata.from_amount*(+decimal);
						amount        = Math.trunc(amount);
					}
	    		} else if ( text_box == "to" ){
	    			if(this.addlq_fullpair_data.toCurrency_decimal == "18"){
	    				amount        = window.web3.utils.toWei(this.addpoolformdata.to_amount.toString(), 'ether');
	    			} else {
	    				let decimal   = Math.pow(10, this.addlq_fullpair_data["toCurrency_decimal"]);
						amount        = this.addpoolformdata.to_amount*(+decimal);
						amount        = Math.trunc(amount);
					}
	    		}
	    		await this.commonmetamaskservice.ApproveFunction(token_address,TokenAbi,ContractDetails.router_contract,amount,this.commonservice.metaDetails.account).then(async(result)=>{
					if(result.status) {
						this.addlq_approvesubmitted = false;
						this.addlq_approveshow = false;
						this.addlq_submittedshow = true;
						// this.toastr.successToastr('Approved Successfully', 'Success!');
						this.commonservice.alertmessage("success",'Approved Successfully');
						this.addliqudity_fromtextbox 	= true;
						this.addliqudity_totextbox 		= true;
						this.uichange.clearbackground();
					} else {
						// this.toastr.errorToastr(result.message);
						this.commonservice.alertmessage("error",result.message);
						setTimeout(()=>{location.reload();},2000);
					}
				}).catch((error)=>{
				  	// this.toastr.errorToastr(error, 'OOPS!');
				  	this.commonservice.alertmessage("error",error);
				  	setTimeout(()=>{location.reload();},2000);
				});
			}
		}

		// add liqudity function
		async alq_supply_sumbit(){
			await this.checkChainId();
			if(this.addlq_fullpair_data.fromCurrency_type == "token" && this.addlq_fullpair_data.toCurrency_type == "token") {
				this.uichange.changebackground(); 
				this.addlq_submitted = true;
				// tokenA - fromtoken address (token address)
				// tokenb - totoken address (token address)
				// amountADesired - Atoken address
				// amountBDesired - Btoken address
				// amountAMin - totoken address
				// amountBMin - totoken address
				// to (address) - current eth address
				// deadline (uint256) - timestapm

				let tokenA 		= this.addlq_fullpair_data.fromCurrency_address;
				let tokenB 		= this.addlq_fullpair_data.toCurrency_address;

				let amountADesired    	= 0;
				if(this.addlq_fullpair_data.fromCurrency_decimal == "18") {
					amountADesired      = window.web3.utils.toWei(this.addpoolformdata.from_amount.toString(), 'ether'); //toekn from amount (mul with decimal )
				} else {
					let decimal         = Math.pow(10, this.addlq_fullpair_data.fromCurrency_decimal);
					amountADesired      = this.addpoolformdata.from_amount*decimal;
					amountADesired      = Math.trunc(amountADesired);  
				}

				let amountBDesired    	= 0;
				if(this.addlq_fullpair_data.toCurrency_decimal == "18") {
					amountBDesired      = window.web3.utils.toWei(this.addpoolformdata.to_amount.toString(), 'ether'); //toekn from amount (mul with decimal )
				} else {
					let decimal         = Math.pow(10, this.addlq_fullpair_data.toCurrency_decimal);
					amountBDesired      = this.addpoolformdata.to_amount*decimal;
					amountBDesired      = Math.trunc(amountBDesired);  
				}

				let amountAMin        	= 1;
				let amountBMin        	= 1;
				// let amountAMin        	= 0;
				// let amountBMin        	= 0;

				let to                	= this.commonservice.metaDetails.account;
				let date              	= new Date(); 
				let timestamp         	= date.getTime();
				let deadline          	= timestamp+1000;
				// let deadline          	= timestamp + ( ((+this.commonservice.simpleUserStorage.userDeadline) / 60) * 60000 );

				await this.liqudityservice.Addliquditytoken_to_token(ContractDetails.router_contract,RouterAbi,tokenA,tokenB,amountADesired,amountBDesired,amountAMin,amountBMin,to,deadline).then(async(result)=>{
					if(result.status) {
						// this.toastr.successToastr('After 2-3 mins Pool added successfully. Kindly reload this page', 'Success!');
						this.commonservice.alertmessage("success",'After 2-3 mins Pool added successfully. Kindly reload this page');
	                    this.addlq_approveshow = true;
	                    this.addlq_submittedshow = false;
	                    var obj = {
	                      "pair":this.addlq_fullpair_data.pair,
	                      "fromCurrency":this.addlq_fullpair_data.fromCurrency,
	                      "toCurrency":this.addlq_fullpair_data.toCurrency,
	                      "fromCurrency_address":this.addlq_fullpair_data.fromCurrency_address,
	                      "toCurrency_address":this.addlq_fullpair_data.toCurrency_address,
	                      "from_amount":this.addpoolformdata.from_amount,
	                      "to_amount":this.addpoolformdata.to_amount,
	                      "user_address":to.toLowerCase(),
	                      "tx_id":result.result.transactionHash,
	                    }
	                    await this.dataservice.postUrl('pool/create_pool_log',obj).subscribe((adlqresData:any) => {
	                      if(adlqresData.status == true) {
	                      	this.uichange.clearbackground(); 
	                        location.reload();
	                      } else {
	                      }
	                    });
					} else {
						// this.toastr.errorToastr(result.message);
						this.commonservice.alertmessage("error",result.message);
						setTimeout(()=>{location.reload();},2000);
					}
				}).catch((error)=>{
				  	// this.toastr.errorToastr(error, 'OOPS!');
				  	this.commonservice.alertmessage("error",error);
				  	setTimeout(()=>{location.reload();},2000);
				});
			} else {
				this.uichange.changebackground(); 
				this.addlq_submitted = true;
				// addLiquidityETH - eth form amount
				// token (address) - approve token contract address
				// amountTokenDesired (uint256)- toekn from amount (mul with decimal )
				// amountTokenMin (uint256) - toekn from amount (mul with decimal )
				// amountETHMin (uint256) - eth form amount
				// to (address) - current eth address
				// deadline (uint256) - timestapm

				let addLiquidityETH   	= 0;
				if(this.addlq_fullpair_data.fromCurrency_type == "coin") {
					addLiquidityETH   	= window.web3.utils.toWei(this.addpoolformdata.from_amount.toString(), 'ether'); // eth from amount
				} else {
					addLiquidityETH   	= window.web3.utils.toWei(this.addpoolformdata.to_amount.toString(), 'ether'); // eth from amount
				}

				let token   		  	= '';
				if(this.addlq_fullpair_data.fromCurrency_type == "token") {
					token   			= this.addlq_fullpair_data.fromCurrency_address; // approve token contract address
				} else {
					token   			= this.addlq_fullpair_data.toCurrency_address; // approve token contract address
				}

				let amountTokenDesired 	= 0;
				if(this.addlq_fullpair_data.fromCurrency_type == "token") {
					if(this.addlq_fullpair_data.fromCurrency_decimal == "18") {
					  amountTokenDesired  	= window.web3.utils.toWei(this.addpoolformdata.from_amount.toString(), 'ether'); //toekn from amount (mul with decimal )
					} else {
					  let decimal         	= Math.pow(10, this.addlq_fullpair_data.fromCurrency_decimal);
					  amountTokenDesired  	= this.addpoolformdata.from_amount*decimal;
					  amountTokenDesired  	= Math.trunc(amountTokenDesired);  
					}
				} else {
					if(this.addlq_fullpair_data.toCurrency_decimal == "18") {
					  amountTokenDesired  	= window.web3.utils.toWei(this.addpoolformdata.to_amount.toString(), 'ether'); //toekn from amount (mul with decimal )
					} else {
					  let decimal         	= Math.pow(10, this.addlq_fullpair_data.toCurrency_decimal);
					  amountTokenDesired  	= this.addpoolformdata.to_amount*decimal;
					  amountTokenDesired  	= Math.trunc(amountTokenDesired);  
					}
				}

				if(this.pairamount_cal) {
					// new cal
						// coin part
							if(this.addlq_fullpair_data.fromCurrency_type == "coin") {
								let min_ethamount         	= ( this.addpoolformdata.from_amount * min_percentage ) / 100;
								min_ethamount             	= this.addpoolformdata.from_amount - min_ethamount;
								let amountETHMin              	= window.web3.utils.toWei(min_ethamount.toFixed(18), 'ether'); 
							} else {
								let min_ethamount         	= ( this.addpoolformdata.to_amount * min_percentage ) / 100;
								min_ethamount             	= this.addpoolformdata.to_amount - min_ethamount;
								let amountETHMin              	= window.web3.utils.toWei(min_ethamount.toFixed(18), 'ether'); 
							}
						// token part
							if(this.addlq_fullpair_data.fromCurrency_type == "token") {
								let min_tokenamount       	= ( this.addpoolformdata.from_amount * min_percentage ) / 100;
								min_tokenamount           	= this.addpoolformdata.from_amount - min_tokenamount;
								if(this.addlq_fullpair_data.fromCurrency_decimal == "18"){
									let amountTokenMin          = window.web3.utils.toWei(min_tokenamount.toFixed(18), 'ether'); //toekn from amount (mul with decimal )
								} else {
									let decimal             = Math.pow(10, this.addlq_fullpair_data.fromCurrency_decimal);
									let amountTokenMin          = min_tokenamount*decimal;
									amountTokenMin          = Math.trunc(amountTokenMin);  
								}
							} else {
								let min_tokenamount       	= ( this.addpoolformdata.to_amount * min_percentage ) / 100;
								min_tokenamount           	= this.addpoolformdata.to_amount - min_tokenamount;
								if(this.addlq_fullpair_data.toCurrency_decimal == "18"){
									let amountTokenMin          = window.web3.utils.toWei(min_tokenamount.toFixed(18), 'ether'); //toekn from amount (mul with decimal )
								} else {
									let decimal             = Math.pow(10, this.addlq_fullpair_data.toCurrency_decimal);
									let amountTokenMin          = min_tokenamount*decimal;
									amountTokenMin          = Math.trunc(amountTokenMin);  
								}
							}
					// new cal
				} else {
					let amountETHMin  	= addLiquidityETH;
					let amountTokenMin  = amountTokenDesired;
				}
				
				let amountAMin        	= 1;
				let amountBMin        	= 1;

				let to                = this.commonservice.metaDetails.account;
				let date              = new Date(); 
				let timestamp         = date.getTime();
				let deadline          = timestamp+1000;
				// let deadline          = timestamp + ( ((+this.commonservice.simpleUserStorage.userDeadline) / 60) * 60000 );	


				// console.log("ContractDetails.router_contract ------>",ContractDetails.router_contract);
				// console.log("addLiquidityETH ------>",addLiquidityETH);
				// console.log("token ------>",token);
				// console.log("amountTokenDesired ------>",amountTokenDesired);
				// console.log("to ------>",to);
				// console.log("deadline ------>",deadline);


				// await this.liqudityservice.Addliquditycoin_to_token(ContractDetails.router_contract,RouterAbi,addLiquidityETH,token,amountTokenDesired,1,1,to,deadline).then(async(result)=>{
				await this.liqudityservice.Addliquditycoin_to_token(ContractDetails.router_contract,RouterAbi,addLiquidityETH,token,amountTokenDesired,amountAMin,amountBMin,to,deadline).then(async(result)=>{
					if(result.status) {
						// this.toastr.successToastr('After 2-3 mins Pool added successfully. Kindly reload this page', 'Success!');
						this.commonservice.alertmessage("success",'After 2-3 mins Pool added successfully. Kindly reload this page');
	                    this.addlq_approveshow = true;
	                    this.addlq_submittedshow = false;
	                    var obj = {
	                      "pair":this.addlq_fullpair_data.pair,
	                      "fromCurrency":this.addlq_fullpair_data.fromCurrency,
	                      "toCurrency":this.addlq_fullpair_data.toCurrency,
	                      "fromCurrency_address":this.addlq_fullpair_data.fromCurrency_address,
	                      "toCurrency_address":this.addlq_fullpair_data.toCurrency_address,
	                      "from_amount":this.addpoolformdata.from_amount,
	                      "to_amount":this.addpoolformdata.to_amount,
	                      "user_address":to.toLowerCase(),
	                      "tx_id":result.result.transactionHash,
	                    }
	                    await this.dataservice.postUrl('pool/create_pool_log',obj).subscribe((adlqresData:any) => {
	                      if(adlqresData.status == true) {
	                      	this.uichange.clearbackground(); 
	                        location.reload();
	                      } else {
	                      }
	                    });
					} else {
						// this.toastr.errorToastr(result.message);
						this.commonservice.alertmessage("error",result.message);
						setTimeout(()=>{location.reload();},2000);
					}
				}).catch((error)=>{
				  	// this.toastr.errorToastr(error, 'OOPS!');
				  	this.commonservice.alertmessage("error",error);
				  	setTimeout(()=>{location.reload();},2000);
				});
			}
		}
	// add liqudity contract functions


    // remove liqudity contract sections
    	async rlq_approve_sumbit(){
    		this.removeapprovesubmitted = true;
    		await this.checkChainId();
    		this.uichange.changebackground();
    		if(this.remove_lptoken_balance <= 0.01){
                this.notEligibleForRemove 	= true;
            }
            await this.commonmetamaskservice.ApproveFunction(this.rmvlq_fullpair_data.pair_address,TokenAbi,ContractDetails.router_contract,this.rawremove_lptoken_balance,this.commonservice.metaDetails.account).then(async(result)=>{
				console.log(" to result ---->",result);
				if(result.status) {
					// this.toastr.successToastr('Your requset has been send successfully', 'Success!');
					this.commonservice.alertmessage("success",'Your requset has been send successfully');
					this.removeapprovesubmitted = false;
					this.removeapproveshow = false;
					this.removesupplyshow = true;
					this.rl_progressbarul_show = true;
					setTimeout(()=>{
						this.progressBar('25');
					},2000);
					this.uichange.clearbackground();
				} else {
					// this.toastr.errorToastr(result.message);
					this.commonservice.alertmessage("error",result.message);
					setTimeout(()=>{location.reload();},2000);
				}
			}).catch((error)=>{
			  	// this.toastr.errorToastr(error, 'OOPS!');
			  	this.commonservice.alertmessage("error",error);
			  	setTimeout(()=>{location.reload();},2000);
			});
		}


		async removesubmit(){
			this.removepoolsubmitted = true;
			await this.checkChainId();
			this.uichange.changebackground();
			if(this.rmvlq_fullpair_data.fromCurrency_type == "token" && this.rmvlq_fullpair_data.toCurrency_type == "token") {
				// token to token
				let calculatedValue;
				switch(this.progressValue){
					case '25':
					  calculatedValue = 0.25;
					  break;
					case '50' :
					  calculatedValue = 0.5;
					  break;
					case '75':
					  calculatedValue = 0.75;
					  break;
					case '100':
					  calculatedValue = 1;  
				}
				calculatedValue     		= this.notEligibleForRemove ? 1 : calculatedValue;
                let calculatedBal   		= calculatedValue == 1 ? this.remove_lptoken_balance : this.toFixeds(this.remove_lptoken_balance * calculatedValue);

                this.rmvlq_fullpair_data.afterBal 	= calculatedValue; 
				this.rmvlq_fullpair_data.beforeBal 	= this.remove_lptoken_balance;// pairaddress balance
				//tokenA 		- tokenA (from token address)
				//tokenB 		- tokenB (to token address)
				//liquidity 	- liquidity (remove amount)
				//amountAMin  	- amountAMin  (from token amount)
				//amountBMin 	- amountBMin (to token amount)
				//to 			- to (user address)
				//deadline  	- deadline (deadline)

				let tokenA          = this.rmvlq_fullpair_data.fromCurrency_address;
				let tokenB          = this.rmvlq_fullpair_data.toCurrency_address;
				let liquidity       = window.web3.utils.toWei(calculatedBal.toString(), 'ether');
				let amountAMin      = 0;
              	let amountBMin      = 0;
              	let to              = this.commonservice.metaDetails.account; // metamask address
              	let date            = new Date(); 
              	let timestamp       = date.getTime();
              	let deadline        = timestamp+1000; //time + 1000
              	// let deadline        = timestamp + ( ((+this.commonservice.simpleUserStorage.userDeadline) / 60) * 60000 );	

              	await this.liqudityservice.Removeliquditytoken_to_token(ContractDetails.router_contract,RouterAbi,tokenA,tokenB,liquidity,amountAMin,amountBMin,to,deadline).then(async(result)=>{
					if(result.status) {
						// this.toastr.successToastr('Your requset has been send successfully', 'Success!');
						this.commonservice.alertmessage("success",'Your requset has been send successfully');
	                    await this.insertRemoveLiq(result.result.transactionHash);
	                    this.removeapproveshow 	= true;
                      	this.removesupplyshow 	= false;
                      	setTimeout(()=>{
	                        location.reload();
	                    },2000);
					} else {
						this.removepoolsubmitted = false;
						// this.toastr.errorToastr(result.message);
						this.commonservice.alertmessage("error",result.message);
						setTimeout(()=>{location.reload();},2000);
					}
				}).catch((error)=>{
					this.removepoolsubmitted = false;
				  	// this.toastr.errorToastr(error, 'OOPS!');
				  	this.commonservice.alertmessage("error",error);
				  	setTimeout(()=>{location.reload();},2000);
				});
			} else {
				// coin to token
				this.removepoolsubmitted = true;
				let calculatedValue;
				switch(this.progressValue){
					case '25':
					  calculatedValue 	= 0.25;
					  break;
					case '50' :
					  calculatedValue 	= 0.5;
					  break;
					case '75':
					  calculatedValue 	= 0.75;
					  break;
					case '100':
					  calculatedValue 	= 1;  
				}
				calculatedValue     	= this.notEligibleForRemove ? 1 : calculatedValue;
				let calculatedBal   	= calculatedValue == 1 ? this.remove_lptoken_balance : this.toFixeds(this.remove_lptoken_balance * calculatedValue);

				let token_address 		= this.rmvlq_fullpair_data.fromCurrency_address;
				let liquidity      	 	= window.web3.utils.toWei(calculatedBal.toString(), 'ether');
				this.rmvlq_fullpair_data.afterBal 	= calculatedBal; 
				this.rmvlq_fullpair_data.beforeBal 	= this.remove_lptoken_balance;// pairaddress balance
				let amountTokenMin  	= this.removepair_response.from_aamt;
				let amountETHMin    	= this.removepair_response.to_aamt;

				let to    				= this.commonservice.metaDetails.account; // metamask address
				let date 				= new Date(); 
				let timestamp 			= date.getTime();
				let deadline 			= timestamp+1000; //time + 1000
				// let deadline        	= timestamp + ( ((+this.commonservice.simpleUserStorage.userDeadline) / 60) * 60000 );	

				await this.liqudityservice.Removeliquditycoin_to_token(ContractDetails.router_contract,RouterAbi,token_address,liquidity,0,0,to,deadline).then(async(result)=>{
					if(result.status) {
						// this.toastr.successToastr('Your requset has been send successfully', 'Success!');
						this.commonservice.alertmessage("success",'Your requset has been send successfully');
	                    await this.insertRemoveLiq(result.result.transactionHash);
	                    this.removeapproveshow 	= true;
                      	this.removesupplyshow 	= false;
                      	setTimeout(()=>{
	                        location.reload();
	                    },2000);
					} else {
						this.removepoolsubmitted = false;
						// this.toastr.errorToastr(result.message);
						this.commonservice.alertmessage("error",result.message);
						setTimeout(()=>{location.reload();},2000);
					}
				}).catch((error)=>{
					this.removepoolsubmitted = false;
				  	// this.toastr.errorToastr(error, 'OOPS!');
				  	this.commonservice.alertmessage("error",error);
				  	setTimeout(()=>{location.reload();},2000);
				});
			}
		}

		async insertRemoveLiq(txhash){
          let data = {
            pair:this.rmvlq_fullpair_data.pair,
            fromCurrency:this.rmvlq_fullpair_data.fromCurrency,
            toCurrency:this.rmvlq_fullpair_data.toCurrency,
            fromCurrency_address:this.rmvlq_fullpair_data.fromCurrency_address,
            toCurrency_address:this.rmvlq_fullpair_data.toCurrency_address,
            percentage:this.progressValue,
            balance:this.rmvlq_fullpair_data.afterBal,
            user_address:this.commonservice.metaDetails.account,
            tx_id:txhash
          }
          await this.dataservice.postUrl('pool/add_remove_pool',data).subscribe((res:any)=>{
            console.log(res,'result')
          })
        }
    // remove liqudity contract sections

  	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	rounds(n, decimal){
        n = parseFloat(n);
        n = n.toString();
        if(n.indexOf(".") == -1) {
          n = (+n).toFixed(decimal);
          return n
        } else {
          n = n.slice(0, (n.indexOf(".")) + (decimal + 1));
          n = (+n).toFixed(decimal);
          return n
        }
    }

    toFixeds(x) {
        if (Math.abs(x) < 1.0) {
          var e = parseInt(x.toString().split('e-')[1]);
          if (e) {
              x *= Math.pow(10,e-1);
              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
          }
        } else {
          var e = parseInt(x.toString().split('+')[1]);
          if (e > 20) {
              e -= 20;
              x /= Math.pow(10,e);
              x += (new Array(e+1)).join('0');
          }
        }
        return x;
    }

    async filterFn(value,pairData) {
      	if(pairData=="first"){
			if(value == ''|| value == null) {			
				this.addlq_from_currency = this.addlq_from_currency_temp;
			} else {			
				var first = this.addlq_from_currency; 
				var res = first.filter((fir) => { 
			if(new RegExp(value, "i").test(fir._id)){return true;}else{return false;} });
				this.addlq_from_currency = res;			
			}				
		}else{			
			if(value == ''|| value == null) {			
				this.addlq_sec_currency = this.addlq_sec_currency_temp;
			} else {			
				var second = this.addlq_sec_currency; 
				var res = second.filter((sec) => { 
				if(new RegExp(value, "i").test(sec.toCurrency)){return true;}else{return false;} });
				this.addlq_sec_currency = res;			
			}
		}
    }

}
