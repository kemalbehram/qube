import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/common/services/common/common.service';
import { DataService } from 'src/app/common/services/api/data.service';

import { AuthmetamaskService } from 'src/app/common/services/metamask/auth/authmetamask.service';
import { CommonMetamaskService } from 'src/app/common/services/metamask/common/common-metamask.service';
import { SwapService } from 'src/app/common/services/metamask/swap/swap.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';

// contract details
	import { ContractDetails } from "src/assets/files/contract";
	import { RouterAbi } from "src/assets/files/router_abi";
	import { TokenAbi } from "src/assets/files/token_abi";
	import { PairAbi } from "src/assets/files/pair_abi";
// contract details

declare let window: any;
let min_percentage      = 0.5;

let wethaddress = ContractDetails.WBNB_contract;

import * as _ from 'lodash'; 

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss']
})
export class SwapComponent implements OnInit {

	@ViewChild('swap_tokenModal_f') swap_tokenModal_f;
	@ViewChild('swap_tokenModal_s') swap_tokenModal_s;

	swapformorder 						= true;
	show_poolshare 						= false;

	exchangeformdata: any 				= {};

	public swap_base_currency: any 		= [];
	public swap_base_currency_temp: any 		= [];

	public sw_first_currency 			= '';
	public sw_first_currency_show 		= false;
	public sw_second_currency 			= '';
	public sw_second_currency_show 		= false;

	public sw_sec_currency: any 		= [];
	public sw_sec_currency_temp: any 		= [];

	public sw_first_currency_balance 	= 0;
    public sw_second_currency_balance 	= 0;

    public sw_fullpair_data: any 		= {};
    exe_tocur_status  					= false;

    showsubmitbutton 					= false;
    exchange_eth_api_value 				= 0; //  to
    exchange_token_api_value 			= 0; // from

	base_currency;
	exchangeHash;

	constructor(private commonservice:CommonService,private dataservice:DataService,private commonmetamaskservice:CommonMetamaskService,private authmetamaskservice:AuthmetamaskService,public router: Router,public swapservice: SwapService,private uichange:UichangeService) { }

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
		}, 3000);
		this.checkChainId();
	}

	// login wallet
		loginmetamask(){
			this.commonservice.showWalletList.emit(true);
      		return;
		}
	// login wallet

	async checkChainId(){
		this.authmetamaskservice.checkChainId().then(async(result)=>{
		  	if(result.status) {} else {
		  		this.commonservice.alertmessage("error",result.message);
		  		this.router.navigate(['']);
		  	}
		}).catch((error)=>{
			this.commonservice.alertmessage("error",error);
		});
	}

	// get pairs
		async getswappair_first(method=null){
			// console.clear();
			let url = 'exchange/get_sw_basecurrency';
			await this.dataservice.getUrl(url).subscribe((resData:any) => {
				if(method=="exchange"){
				    let swap_fir_currency 		= resData.data;
				    this.swap_base_currency   	= swap_fir_currency;
				    this.swap_base_currency_temp   	= swap_fir_currency;
				    // console.log("this.swap_base_currency ---->",this.swap_base_currency);
				    this.base_currency 			= this.swap_base_currency[0]._id;
				    // this.sw_set_currency(this.base_currency,'exchange','first')
				}
			});
		}

		sw_first_image = "";
		async sw_set_currency(value,method,type) {
	        if(method=='exchange') {
	          if(type=="first") {
	            this.sw_first_currency  		= value._id;
	            this.sw_first_image  			= value.currency_image;
	            this.sw_first_currency_show 	= true;
	            var obj = {
	              "basecurrency":this.sw_first_currency
	            }
	            await this.dataservice.postUrl('pool/get_swap_pairdetails',obj)
	            .subscribe((resData:any) => {
	              if(resData.status == true) {
	                let sw_sec_currency 		= resData.data;
	                this.sw_sec_currency 		= sw_sec_currency;
	                this.sw_sec_currency_temp   = sw_sec_currency;
	                // console.log("this.sw_sec_currency ----->",this.sw_sec_currency);
	              }
	            });
	            await this.getuserbalance(value,method,type);
	            this.swap_tokenModal_f.hide();
	          } else if(type=="second") {
	            this.sw_second_currency  			= value.toCurrency_name;
	            this.sw_second_currency_show 		= true;
	            await this.getuserbalance(value,method,type);
	            this.exchangeformdata.from_amount 	= '';
	            this.exchangeformdata.to_amount 	= '';
	            this.sw_fullpair_data 				= value;
	            this.exe_tocur_status 				= true;
	            await this.getPricePoolshare(this.sw_fullpair_data);
	            this.swap_tokenModal_s.hide();
	            this.show_poolshare = true;
	            // this.examount_cal =  true;
	          }
	        }
	    }

	// get balance 
		async getuserbalance(value,method,type){
	    	this.uichange.changebackground(); 
			if( method=='exchange' ) {
	    		if( type=='first' ) {
	    			if(value.currency_type=="token") {
			    		this.commonmetamaskservice.GetTokenbalance(value.contract_address,TokenAbi,this.commonservice.metaDetails.account).then(async(result)=>{
						  	if(result.status) {
						  		this.uichange.clearbackground(); 		
						  		if(value.decimal == 18) {
						  			this.sw_first_currency_balance = await window.web3.utils.fromWei(result.rawbalance.toString(), 'ether');
						  		} else {
						  			let decimal                    = Math.pow(10, (+value.decimal));
	                  				this.sw_first_currency_balance =  result.rawbalance / decimal;
						  		}
						  	} else {
						  		this.uichange.clearbackground(); 		
						  		this.commonservice.alertmessage("error",result.message);
						  		this.sw_first_currency_balance = 0.0000;
						  	}
						}).catch((error)=>{
							this.uichange.clearbackground(); 		
						  	this.commonservice.alertmessage("error",error);
						});
			    	} else if(value.currency_type=="coin") {
			    		this.uichange.clearbackground(); 		
			    		this.sw_first_currency_balance = this.commonservice.metaDetails.balance.toString();
			    	}
	    		} else if ( type=='second' ) {
			    	if( value.toCurrency_type == "token" ) {
			    		this.commonmetamaskservice.GetTokenbalance(value.toCurrency_address,TokenAbi,this.commonservice.metaDetails.account).then(async(result)=>{
						  	if(result.status) {
						  		this.uichange.clearbackground(); 		
						  		if(value.decimal == 18) {
			    					this.sw_second_currency_balance 	= await window.web3.utils.fromWei(result.rawbalance.toString(), 'ether');
						  		} else {
			    					let decimal                       	= Math.pow(10, (+value.toCurrency_decimal));
	                  				this.sw_second_currency_balance 	=  result.rawbalance / decimal;
						  		}
						  	} else {
						  		this.uichange.clearbackground(); 		
						  		this.commonservice.alertmessage("error",result.message);
						  		this.sw_second_currency_balance = 0.0000;
						  	}
						}).catch((error)=>{
							this.uichange.clearbackground(); 		
						  	this.commonservice.alertmessage("error",error);
						});
			    	} else if( value.toCurrency_type == "coin" ) {
			    		this.uichange.clearbackground(); 		
			    		this.sw_second_currency_balance 	= this.commonservice.metaDetails.balance.toString();
			    	}
			    }
	    	}
	    }

	// get pool share
		pricePoolShare:any = {};
	    async getPricePoolshare(pairvalue){
	    	this.uichange.changebackground(); 
	    	// console.log(" pairvalue -----> ",pairvalue);
	    	// pair balance
				await this.commonmetamaskservice.GetTokenbalance(pairvalue.pair_address,PairAbi,this.commonservice.metaDetails.account).then(async(result)=>{
				  	if(result.status) {
						// let tokenBal  	= window.web3.utils.toWei(result.rawbalance.toString(), 'ether');
				  		let tokenBal  	= result.rawbalance;
				  		this.commonmetamaskservice.GetTotalSupply(pairvalue.pair_address,PairAbi).then(async(result)=>{
						  	if(result.status) {
								// let totalSupplies  	= window.web3.utils.toWei(result.rawtotalsupply.toString(), 'ether');
						  		let totalSupplies  	= result.rawtotalsupply;
								if((+tokenBal) > 0) {
									if(totalSupplies == 0){
						  				this.pricePoolShare.sharePool = 0;
						  			}else{
						  				this.pricePoolShare.sharePool = (tokenBal/totalSupplies) * 100;
									}
						  		} else {
						  			this.pricePoolShare.sharePool = 0;
								}
							} else {
						  		this.pricePoolShare.sharePool = 0;
						  	}
						}).catch((error)=>{
						  	this.pricePoolShare.sharePool = 0;
						});
					} else {
				  		this.pricePoolShare.sharePool = 0;
				  	}
				}).catch((error)=>{
				  	this.pricePoolShare.sharePool = 0;
				});
			// pair balance
	    	if(pairvalue.toCurrency_type == "token" && pairvalue.fromCurrency_type == "token") {
	    		console.log("into token to token ---->");
	    		if(this.swapformorder){
					console.log("normal pool share --->");
					// from amount 
						let amount_value 			= 1;
						let path_f                	= [pairvalue.fromCurrency_address,pairvalue.toCurrency_address]; // array values
						let path_s                	= [pairvalue.toCurrency_address,pairvalue.fromCurrency_address]; // array values
						
						let amountIn;
						// new
				  			if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
						      amountIn 	= window.web3.utils.toWei(amount_value.toString(), 'ether');
						    } else {
						      let decimal             			= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
							  amountIn  = (amount_value * decimal).toFixed(4);
							}
				  		// new
				  		
						await this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountIn,path_f).then(async(result)=>{
							if(result.status) {
						  		if(this.sw_fullpair_data.toCurrency_decimal=="18") {
									this.pricePoolShare.to_amount 	= window.web3.utils.fromWei(result.resultamount[1].toString(), 'ether'); 
								} else {
									let decimal             		= Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
									this.pricePoolShare.to_amount   = result.resultamount[1] / decimal;
								}
							} else {
								this.pricePoolShare.to_amount = 0.0000;
						  	}
						}).catch((error)=>{
						  	this.pricePoolShare.to_amount = 0.0000;
						});

					// to amount
						let amountOut;
		    			if( this.sw_fullpair_data.toCurrency_decimal == "18" ) {
							amountOut           = window.web3.utils.toWei(amount_value.toString(), 'ether'); 
						} else {
							let decimal         = Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
							amountOut           = amount_value * decimal;
						}
						
						await this.swapservice.getAmountsIn(ContractDetails.router_contract,RouterAbi,amountOut,path_f).then(async(result)=>{
							// console.log("this.sw_fullpair_data.toCurrency_decimal ----> ",this.sw_fullpair_data.toCurrency_decimal);
							// console.log("amountIn ----> ",amountIn);
							// console.log("path_f ----> ",path_f);
							// console.log("getPricePoolshare result ----> ",result);
							if(result.status) {
								if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
									console.log("decimal -----> ",this.sw_fullpair_data.fromCurrency_decimal);
									this.pricePoolShare.from_amount 	= window.web3.utils.fromWei(result.resultamount[0].toString(), 'ether'); 
								} else {
									console.log("decimal -----> ",this.sw_fullpair_data.fromCurrency_decimal);
									let decimal             		= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
									this.pricePoolShare.from_amount   = result.resultamount[0] / decimal;
								}
							} else {
								this.pricePoolShare.from_amount = 0.0000;
						  	}
						}).catch((error)=>{
						  	this.pricePoolShare.from_amount = 0.0000;
						});
						// console.log("this.pricePoolShare ---->",this.pricePoolShare);
						await this.uichange.clearbackground(); 
				}else{
					console.log("invert pool share --->");
					// to amount
						let amountIn           		= 0;
						let amount_value 			= 1;
						let path_f                	= [pairvalue.fromCurrency_address,pairvalue.toCurrency_address]; // array values
						let path_s                	= [pairvalue.toCurrency_address,pairvalue.fromCurrency_address]; // array values
						
						if(this.sw_fullpair_data.toCurrency_decimal=="18") {
							amountIn            	= window.web3.utils.toWei(amount_value.toString(), 'ether'); 
						} else {
							let decimal         	= Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
							amountIn            	= amount_value * decimal;
						}

						
						// console.log("amountIn ----> ",amountIn);
						console.log("this.sw_fullpair_data.toCurrency_decimal ----> ",this.sw_fullpair_data.toCurrency_decimal);
						console.log("amountIn fixed ----> ",amountIn.toFixed(this.sw_fullpair_data.toCurrency_decimal));
						// this.swapservice.getAmountsIn(ContractDetails.router_contract,RouterAbi,amountIn,path_f).then(async(result)=>{
						await this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountIn,path_s).then(async(result)=>{
							console.log("getAmountsIn --->",result);
						  	if(result.status) {
								if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
									this.pricePoolShare.from_amount 	= result.resultamount[1]/1000000000000000000;
								} else {
									let decimal             		= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
									this.pricePoolShare.from_amount   = result.resultamount[1] / decimal;
								}
								console.log("this.pricePoolShare.from_amount --->",this.pricePoolShare.from_amount);
							} else {
								this.pricePoolShare.from_amount = 0.0000;
						  	}
						}).catch((error)=>{
						  	this.pricePoolShare.from_amount = 0.0000;
						});

					// from amount 
						let amountOut           	= 0;
						if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
							amountOut            	= window.web3.utils.toWei(amount_value.toString(), 'ether'); 
						} else {
							let decimal         	= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
							amountOut            	= amount_value * decimal;
						}
						
						// this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountOut,path_f).then(async(result)=>{
						await this.swapservice.getAmountsIn(ContractDetails.router_contract,RouterAbi,amountOut,path_s).then(async(result)=>{
							console.log("getAmountsOut --->",result);
						  	if(result.status) {
						  		if(this.sw_fullpair_data.toCurrency_decimal=="18") {
									this.pricePoolShare.to_amount 	= result.resultamount[0]/1000000000000000000;
								} else {
									let decimal             		= Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
									this.pricePoolShare.to_amount   = result.resultamount[0] / decimal;
								}
								console.log("this.pricePoolShare.to_amount --->",this.pricePoolShare.to_amount);
							} else {
								this.pricePoolShare.to_amount = 0.0000;
						  	}
						}).catch((error)=>{
						  	this.pricePoolShare.to_amount = 0.0000;
						});
						await this.uichange.clearbackground(); 
				}
			} else {
	    		console.log("into coin to token ---->");
	    		let amount_value 			= 1;

				if(this.swapformorder) {
					console.log("normal pool share --->");
					let amountIn;
					let path_f     			= [wethaddress,this.sw_fullpair_data.fromCurrency_address]; // array values
					let path_s     			= [this.sw_fullpair_data.fromCurrency_address,wethaddress]; // array values
					// if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
					//      amountIn 				= window.web3.utils.toWei(amount_value.toString(), 'ether');
					//    } else {
					//      let decimal           = Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
					//   amountIn  			= (amount_value * decimal).toFixed(4);
					// }

					if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
				      amountIn 	= window.web3.utils.toWei(amount_value.toString(), 'ether');
				    } else {
				      let decimal             			= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
					  amountIn  = (amount_value * decimal).toFixed(4);
					}

					await this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountIn,path_s).then(async(result)=>{
						console.log("getAmountsIn ---->",result);
						if(result.status) {
							if(this.sw_fullpair_data.toCurrency_decimal=="18") {
								this.pricePoolShare.to_amount 	= (result.resultamount[1]/1000000000000000000).toFixed(4);
							} else {
								let decimal             			= Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
								this.pricePoolShare.to_amount   	= (result.resultamount[1] / decimal).toFixed(4);
							}
							console.log("this.pricePoolShare.to_amount ---->",this.pricePoolShare.to_amount);
						} else {
							this.pricePoolShare.to_amount 		= 0.0000;
					  	}
					}).catch((error)=>{
					  	this.pricePoolShare.to_amount = (0).toFixed(4);
					});

					let amountOut;
	    			if( this.sw_fullpair_data.toCurrency_decimal == "18" ) {
						amountOut           = window.web3.utils.toWei(amount_value.toString(), 'ether'); 
					} else {
						let decimal         = Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
						amountOut           = amount_value / decimal;
					}
					await this.swapservice.getAmountsIn(ContractDetails.router_contract,RouterAbi,amountOut,path_s).then(async(result)=>{
						console.log("getAmountsOut ---->",result);
					  	if(result.status) {
					  		// new
								if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
							      this.pricePoolShare.from_amount 	= (result.resultamount[0]/1000000000000000000).toFixed(4);
							    } else {
							      let decimal   						= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
	    						  this.pricePoolShare.from_amount     = (result.resultamount[0] / decimal).toFixed(4);
	    						}
					  		// new
					  		console.log("this.pricePoolShare.from_amount ---->",this.pricePoolShare.from_amount);
					  	} else {
							this.pricePoolShare.from_amount = 0.0000;
					  	}
					}).catch((error)=>{
					  	this.pricePoolShare.from_amount = 0.0000;
					});
					await this.uichange.clearbackground();
				} else {
					// console.log("no need --->")
					console.log("invert pool share --->");
					let amountOut;
					let amount_value 		= 1;
	    			let path_f     			= [wethaddress,this.sw_fullpair_data.fromCurrency_address]; // array values
	    			let path_s   			= [this.sw_fullpair_data.fromCurrency_address,wethaddress]; // array values
				  	if( this.sw_fullpair_data.fromCurrency_decimal == "18" ) {
						amountOut           = window.web3.utils.toWei(amount_value.toString(), 'ether'); 
					} else {
						let decimal         = Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
						// amountOut        = amount_value / decimal;
						amountOut           = amount_value * decimal;
					}
					await this.swapservice.getAmountsIn(ContractDetails.router_contract,RouterAbi,amountOut,path_f).then(async(result)=>{
						if(result.status) {
							console.log("getAmountsIn ---->",result);
					  		// new
								if(this.sw_fullpair_data.toCurrency_decimal=="18") {
							      this.pricePoolShare.to_amount 	= (result.resultamount[0]/1000000000000000000).toFixed(4);
							    } else {
							      let decimal   					= Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
	    						  this.pricePoolShare.to_amount   	= (result.resultamount[0] / decimal).toFixed(4);
	    						}
	    						console.log("this.pricePoolShare.to_amount ---->",this.pricePoolShare.to_amount);
					  		// new
					  	} else {
							this.pricePoolShare.to_amount = 0.0000;
					  	}
					}).catch((error)=>{
					  	this.pricePoolShare.to_amount = 0.0000;
					});


					let amountIn;
					if(this.sw_fullpair_data.toCurrency_decimal=="18") {
				      amountIn 		= window.web3.utils.toWei(amount_value.toString(), 'ether');
				    } else {
				      let decimal   = Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
					  amountIn  	= (amount_value * decimal).toFixed(4);
					}
					// let path     = [wethaddress,this.sw_fullpair_data.fromCurrency_address]; // array values
					await this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountIn,path_f).then(async(result)=>{
						console.log("getAmountsOut ---->",result);
						if(result.status) {
							if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
								this.pricePoolShare.from_amount 	= (result.resultamount[1]/1000000000000000000).toFixed(4);
							} else {
								let decimal             			= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
								this.pricePoolShare.from_amount   	= (result.resultamount[1] / decimal).toFixed(4);
							}
							console.log("this.pricePoolShare.from_amount ---->",this.pricePoolShare.from_amount);
						} else {
							this.pricePoolShare.from_amount 		= 0.0000;
					  	}
					}).catch((error)=>{
					  	this.pricePoolShare.from_amount = (0).toFixed(4);
					});
					await this.uichange.clearbackground();
				}
	    	}
	    }

	// price call for keypress    
	    async pricecal(method,type){
	    	if(this.sw_second_currency_show) {
	    		if(this.pricePoolShare.sharePool == 0){
	    			// this.toastr.clear();
	    			// this.toastr.errorToastr("Enough liquidity not available for this pair either Add liquidity to perform Swap", 'OOPS!',{"maxShown":1});
	    			this.commonservice.alertmessage("error","Enough liquidity not available for this pair either Add liquidity to perform Swap");
	    		} else {
		    		this.uichange.changebackground(); 
			    	if( this.sw_fullpair_data.fromCurrency_type == "token" && this.sw_fullpair_data.toCurrency_type == "token" ) {
			    		if(this.swapformorder) {
				    		if(type=="first") {
			    				if(this.exchangeformdata.from_amount) {
			    					let amountIn;
			    					// new
							  			if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
									      amountIn 	= window.web3.utils.toWei(this.exchangeformdata.from_amount.toString(), 'ether');
									    } else {
									      let decimal             			= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
		        						  amountIn  = (this.exchangeformdata.from_amount * decimal).toFixed(4);
		        						}
							  		// new
							  		let path     	= [this.sw_fullpair_data.fromCurrency_address,this.sw_fullpair_data.toCurrency_address]; // array values
							  		
									await this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountIn,path).then(async(result)=>{
										if(result.status) {
											if(this.sw_fullpair_data.toCurrency_decimal=="18") {
												this.exchangeformdata.to_amount 	= (result.resultamount[1]/1000000000000000000).toFixed(4);
											} else {
												let decimal             			= Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
												this.exchangeformdata.to_amount   	= (result.resultamount[1] / decimal).toFixed(4);
											}
										} else {
											this.exchangeformdata.to_amount 		= 0.0000;
									  	}
										this.exchange_eth_api_value 			= result.resultamount[1]; // to
										this.exchange_token_api_value 			= result.resultamount[0]; // from
										this.showsubmitbutton   				= true;
										this.uichange.clearbackground(); 		
										// this.checkswapbalance();
									}).catch((error)=>{
									  	this.exchangeformdata.to_amount = (0).toFixed(4);
									    this.showsubmitbutton 			= false;
									    this.uichange.clearbackground(); 		
									});
								} else {
			    					this.exchangeformdata.to_amount = (0).toFixed(4);
									this.showsubmitbutton = false;
									this.uichange.clearbackground(); 		
			    				}
				    		} else if(type=="second") {
				    			let amountOut;
				    			let path     			= [this.sw_fullpair_data.fromCurrency_address,this.sw_fullpair_data.toCurrency_address];
							  	if( this.sw_fullpair_data.toCurrency_decimal == "18" ) {
									amountOut           = window.web3.utils.toWei(this.exchangeformdata.to_amount.toString(), 'ether'); 
								} else {
									let decimal         = Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
									amountOut           = this.exchangeformdata.to_amount * decimal;
								}
								await this.swapservice.getAmountsIn(ContractDetails.router_contract,RouterAbi,amountOut,path).then(async(result)=>{
								  	if(result.status) {
								  		// console.log("this.sw_fullpair_data.toCurrency_decimal ----> ",this.sw_fullpair_data.toCurrency_decimal);
								  		// console.log("amountOut ----> ",amountOut);
								  		// console.log("path ----> ",path);
								  		// console.log("price cal ----> ",result);
								  		// new
											if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
										      this.exchangeformdata.from_amount 	= (result.resultamount[0]/1000000000000000000).toFixed(4);
										    } else {
										      let decimal   						= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
		            						  this.exchangeformdata.from_amount     = (result.resultamount[0] / decimal).toFixed(4);
		            						}
								  		// new
								  		this.exchange_eth_api_value 		= result.resultamount[1]; // to
									    this.exchange_token_api_value 		= result.resultamount[0]; // from
									    this.showsubmitbutton 				= true;
									    this.uichange.clearbackground(); 		
									    // this.checkswapbalance();
									} else {
										this.exchangeformdata.from_amount = 0.0000;
								  		this.showsubmitbutton = false;
								  		this.uichange.clearbackground(); 		
								  	}
								}).catch((error)=>{
								  	this.exchangeformdata.from_amount = 0.0000;
								  	this.uichange.clearbackground(); 		
								});
				    		}
				    	} else {
				    		if(type == "first") {
				    			console.log(" first ----> ",type);
				    			let amountOut;
				    			// let path     			= [this.sw_fullpair_data.fromCurrency_address,this.sw_fullpair_data.toCurrency_address];
				    			let path     			= [this.sw_fullpair_data.toCurrency_address,this.sw_fullpair_data.fromCurrency_address];
							  	if( this.sw_fullpair_data.fromCurrency_decimal == "18" ) {
									amountOut           = window.web3.utils.toWei(this.exchangeformdata.from_amount.toString(), 'ether'); 
								} else {
									let decimal         = Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
									amountOut           = this.exchangeformdata.from_amount * decimal;
								}

								// this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountOut,path).then(async(result)=>{
								await this.swapservice.getAmountsIn(ContractDetails.router_contract,RouterAbi,amountOut,path).then(async(result)=>{
									console.log("getAmountsOut result ---->",result);
									if(result.status) {
								  		// new
											if(this.sw_fullpair_data.toCurrency_decimal=="18") {
										      this.exchangeformdata.to_amount 	= (result.resultamount[0]/1000000000000000000).toFixed(4);
										    } else {
										      let decimal   						= Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
		            						  this.exchangeformdata.to_amount     = (result.resultamount[0] / decimal).toFixed(4);
		            						}
								  		// new
								  		console.log("this.exchangeformdata.to_amount ---->",this.exchangeformdata.to_amount);
								  		this.exchange_eth_api_value 		= result.resultamount[0]; // to
									    this.exchange_token_api_value 		= result.resultamount[1]; // from
									    this.showsubmitbutton 				= true;
									    this.uichange.clearbackground(); 		
									    // this.checkswapbalance();
									} else {
										this.exchangeformdata.to_amount = 0.0000;
								  		this.showsubmitbutton = false;
								  		this.uichange.clearbackground(); 		
								  	}
								}).catch((error)=>{
								  	this.exchangeformdata.to_amount = 0.0000;
								  	this.uichange.clearbackground(); 		
								});
				    		} else if(type=="second") {
				    			console.log(" second ----> ",type);
				    			let amountIn;
		    					// new
						  			if(this.sw_fullpair_data.toCurrency_decimal=="18") {
								      amountIn 			= window.web3.utils.toWei(this.exchangeformdata.to_amount.toString(), 'ether');
								    } else {
								      let decimal       = Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
		    						  amountIn  		= (this.exchangeformdata.to_amount * decimal);
		    						}
						  		// new
						  		// let path     			= [this.sw_fullpair_data.toCurrency_address,this.sw_fullpair_data.fromCurrency_address];
						  		let path     			= [this.sw_fullpair_data.toCurrency_address,this.sw_fullpair_data.fromCurrency_address];
						  		
						  		await this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountIn,path).then(async(result)=>{
								// this.swapservice.getAmountsIn(ContractDetails.router_contract,RouterAbi,amountIn,path).then(async(result)=>{
									console.log("result ---->",result);
									if(result.status) {
										if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
											this.exchangeformdata.from_amount 	= (result.resultamount[1]/1000000000000000000).toFixed(4);
										} else {
											let decimal             			= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
											this.exchangeformdata.from_amount   = (result.resultamount[1] / decimal).toFixed(4);
										}
									} else {
										this.exchangeformdata.from_amount 		= 0.0000;
								  	}
									this.exchange_eth_api_value 			= result.resultamount[0]; // to
									this.exchange_token_api_value 			= result.resultamount[1]; // from
									this.showsubmitbutton   				= true;
									this.uichange.clearbackground(); 		
									// this.checkswapbalance();
								}).catch((error)=>{
								  	this.exchangeformdata.from_amount = (0).toFixed(4);
								    this.showsubmitbutton 			= false;
								    this.uichange.clearbackground(); 		
								});
				    		}
				    	}
				    } else {
				    	if(this.swapformorder) {
				    		if(type=="first") {
				    			if(this.exchangeformdata.from_amount){
				    				let amountIn;
				    				if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
								      amountIn 	= window.web3.utils.toWei(this.exchangeformdata.from_amount.toString(), 'ether');
								    } else {
								      let decimal             			= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
		    						  amountIn  = (this.exchangeformdata.from_amount * decimal).toFixed(4);
		    						}
									// let path     = [wethaddress,this.sw_fullpair_data.fromCurrency_address]; // array values
									let path     = [this.sw_fullpair_data.fromCurrency_address,wethaddress]; // array values
									await this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountIn,path).then(async(result)=>{
									// this.swapservice.getAmountsIn(ContractDetails.router_contract,RouterAbi,amountIn,path).then(async(result)=>{
										console.clear();
										console.log("getAmountsIn ---->",result);
										if(result.status) {
											if(this.sw_fullpair_data.toCurrency_decimal=="18") {
												this.exchangeformdata.to_amount 	= (result.resultamount[1]/1000000000000000000).toFixed(4);
											} else {
												let decimal             			= Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
												this.exchangeformdata.to_amount   	= (result.resultamount[1] / decimal).toFixed(4);
											}
										} else {
											this.exchangeformdata.to_amount 		= 0.0000;
									  	}
										this.exchange_eth_api_value 			= result.resultamount[1]; // to
										this.exchange_token_api_value 			= result.resultamount[0]; // from
										this.showsubmitbutton   				= true;
										this.uichange.clearbackground(); 		
										// this.checkswapbalance();
									}).catch((error)=>{
									  	this.exchangeformdata.to_amount = (0).toFixed(4);
									    this.showsubmitbutton 			= false;
									    this.uichange.clearbackground(); 		
									});
				    			}else{
									this.exchangeformdata.to_amount = (0).toFixed(4);
									this.showsubmitbutton = false;
									this.uichange.clearbackground(); 		
								}
				    		} else if(type=="second") {
				    			let amountOut;
				    			// let path     = [wethaddress,this.sw_fullpair_data.fromCurrency_address]; // array values
				    			let path     			= [this.sw_fullpair_data.fromCurrency_address,wethaddress]; // array values
							  	if( this.sw_fullpair_data.toCurrency_decimal == "18" ) {
									amountOut           = window.web3.utils.toWei(this.exchangeformdata.to_amount.toString(), 'ether'); 
								} else {
									let decimal         = Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
									amountOut           = this.exchangeformdata.to_amount * decimal;
								}
								await this.swapservice.getAmountsIn(ContractDetails.router_contract,RouterAbi,amountOut,path).then(async(result)=>{
								// this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountOut,path).then(async(result)=>{
									console.clear();
									console.log("getAmountsIn  ----> result ",result);
								  	if(result.status) {
								  		// new
											if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
										      this.exchangeformdata.from_amount 	= (result.resultamount[0]/1000000000000000000).toFixed(4);
										    } else {
										      let decimal   						= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
		            						  this.exchangeformdata.from_amount     = (result.resultamount[0] / decimal).toFixed(4);
		            						}
								  		// new
								  		this.exchange_eth_api_value 		= result.resultamount[1]; // to
									    this.exchange_token_api_value 		= result.resultamount[0]; // from
									    this.showsubmitbutton 				= true;
									    this.uichange.clearbackground(); 		
									    // this.checkswapbalance();
									} else {
										this.exchangeformdata.from_amount = 0.0000;
								  		this.showsubmitbutton = false;
								  		this.uichange.clearbackground(); 		
								  	}
								}).catch((error)=>{
								  	this.exchangeformdata.from_amount = 0.0000;
								  	this.uichange.clearbackground(); 		
								});
				    		}
				    	} else {
				    		if(type=="first") {
				    			let amountOut;
				    			let path     			= [wethaddress,this.sw_fullpair_data.fromCurrency_address]; // array values
							  	if( this.sw_fullpair_data.fromCurrency_decimal == "18" ) {
									amountOut           = window.web3.utils.toWei(this.exchangeformdata.from_amount.toString(), 'ether'); 
								} else {
									let decimal         = Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
									amountOut           = this.exchangeformdata.from_amount * decimal;
								}
								await this.swapservice.getAmountsIn(ContractDetails.router_contract,RouterAbi,amountOut,path).then(async(result)=>{
									if(result.status) {
								  		// new
											if(this.sw_fullpair_data.toCurrency_decimal=="18") {
										      this.exchangeformdata.to_amount 	= (result.resultamount[0]/1000000000000000000).toFixed(4);
										    } else {
										      let decimal   						= Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
		            						  this.exchangeformdata.to_amount     = (result.resultamount[0] / decimal).toFixed(4);
		            						}
								  		// new
								  		this.exchange_eth_api_value 		= result.resultamount[1]; // to
									    this.exchange_token_api_value 		= result.resultamount[0]; // from
									    this.showsubmitbutton 				= true;
									    this.uichange.clearbackground(); 		
									    // this.checkswapbalance();
									} else {
										this.exchangeformdata.to_amount = 0.0000;
								  		this.showsubmitbutton = false;
								  		this.uichange.clearbackground(); 		
								  	}
								}).catch((error)=>{
								  	this.exchangeformdata.to_amount = 0.0000;
								  	this.uichange.clearbackground(); 		
								});
							} else if(type=="second") {
								let amountIn;
			    				if(this.sw_fullpair_data.toCurrency_decimal=="18") {
							      amountIn 	= window.web3.utils.toWei(this.exchangeformdata.to_amount.toString(), 'ether');
							    } else {
							      let decimal             			= Math.pow(10, this.sw_fullpair_data.toCurrency_decimal);
								  amountIn  = (this.exchangeformdata.to_amount * decimal).toFixed(4);
								}
								let path     = [wethaddress,this.sw_fullpair_data.fromCurrency_address]; // array values
								await this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountIn,path).then(async(result)=>{
									if(result.status) {
										if(this.sw_fullpair_data.fromCurrency_decimal=="18") {
											this.exchangeformdata.from_amount 	= (result.resultamount[1]/1000000000000000000).toFixed(4);
										} else {
											let decimal             			= Math.pow(10, this.sw_fullpair_data.fromCurrency_decimal);
											this.exchangeformdata.from_amount   	= (result.resultamount[1] / decimal).toFixed(4);
										}
									} else {
										this.exchangeformdata.from_amount 		= 0.0000;
								  	}
									this.exchange_eth_api_value 			= result.resultamount[1]; // to
									this.exchange_token_api_value 			= result.resultamount[0]; // from
									this.showsubmitbutton   				= true;
									this.uichange.clearbackground(); 		
									// this.checkswapbalance();
								}).catch((error)=>{
								  	this.exchangeformdata.from_amount = (0).toFixed(4);
								    this.showsubmitbutton 			= false;
								    this.uichange.clearbackground(); 		
								});
				    		}
				    	}
				    }
				}
		    } else { 
		    	console.log("<--- else --->");
	    	}
	    }

	// swap form section
		swaptextbox(){
	    	if(this.sw_second_currency_show) {
				if(this.swapformorder) {
					this.swapformorder = false;
				} else {
					this.swapformorder = true;
				}

				if(this.exchangeformdata.from_amount || this.exchangeformdata.to_amount){
					console.log("into");
					this.closeexpopup();
				} else {
					console.log("else");
				}

				if(this.sw_fullpair_data){
					this.getPricePoolshare(this.sw_fullpair_data);
				}
			} else {
				// this.toastr.errorToastr("Kindly select your pair", 'OOPS!');
				this.commonservice.alertmessage("error","Kindly select your pair");
			}
	    }


	    closeexpopup(){
			this.exchangeformdata.from_amount 	= (0).toFixed(4);
			this.exchangeformdata.to_amount 	= (0).toFixed(4);
		}

	// contract call
	    withdrawswapsubmitted  = false;
	    // token to coin swap
	    	// token to coin approve call
		    	async token_to_coin_submit(token_address,type){
		    		this.uichange.changebackground();
		    		this.withdrawswapsubmitted = true;
		    		let amount;
		    		if( type == "from" ){
		    			if(this.sw_fullpair_data.fromCurrency_decimal == "18"){
		    				amount        = window.web3.utils.toWei(this.exchangeformdata.from_amount.toString(), 'ether');
		    			} else {
		    				let decimal   = Math.pow(10, this.sw_fullpair_data["fromCurrency_decimal"]);
							amount        = this.exchangeformdata.from_amount*(+decimal);
							amount        = Math.trunc(amount);
						}
		    		} else {
		    			if(this.sw_fullpair_data.toCurrency_decimal == "18"){
		    				amount        = window.web3.utils.toWei(this.exchangeformdata.to_amount.toString(), 'ether');
		    			} else {
		    				let decimal   = Math.pow(10, this.sw_fullpair_data["toCurrency_decimal"]);
							amount        = this.exchangeformdata.to_amount*(+decimal);
							amount        = Math.trunc(amount);
						}
		    		}
		    		await this.commonmetamaskservice.ApproveFunction(token_address,TokenAbi,ContractDetails.router_contract,amount,this.commonservice.metaDetails.account).then(async(result)=>{
						if(result.status) {
							this.commonservice.alertmessage("success","Approved Successfully");
							this.withdrawswapsubmitted = false;
							this.token_to_coin_swap_concall();
						} else {
							this.commonservice.alertmessage("error",result.message);
							this.withdrawswapsubmitted = false;
							setTimeout(()=>{location.reload();},2000);
						}
					}).catch((error)=>{
					  	this.commonservice.alertmessage("error",error);
					  	this.withdrawswapsubmitted = false;
					  	setTimeout(()=>{location.reload();},2000);
					});
				}

			// token to coin swap call
		    	async token_to_coin_swap_concall(){
		    		this.uichange.changebackground();
		    		this.withdrawswapsubmitted = true;
		    		let amountIn 		= this.exchange_token_api_value; // eth from amount
					let min_amount    	= (this.exchange_eth_api_value * min_percentage) / 100;
					min_amount        	= this.exchange_eth_api_value - min_amount;
					min_amount        	= Math.trunc(min_amount);
					let amountOutMin   	= min_amount.toString(); //toekn from amount (mul with decimal )
					let path     		= [this.sw_fullpair_data.fromCurrency_address,wethaddress]; // array values
					let to 				= this.commonservice.metaDetails.account;
					let date 			= new Date(); 
					let timestamp 		= date.getTime();
					let deadline 		= timestamp+1000;
					await this.swapservice.swapExactTokensForETH(ContractDetails.router_contract,RouterAbi,amountIn,amountOutMin,path,to,deadline).then(async(result)=>{
						if(result.status) {
							this.commonservice.alertmessage("success",'Swap Successfully Completed');
							this.withdrawswapsubmitted = false;
							this.exchangeHash = result.result.transactionHash;
							await this.exchangeInsert('tokenTotoken');
							this.uichange.clearbackground();
							setTimeout(()=>{location.reload();},4000);
						} else {
							this.commonservice.alertmessage("error",result.message);
							this.withdrawswapsubmitted = false;
							setTimeout(()=>{location.reload();},2000);
						}
					}).catch((error)=>{
					  	this.commonservice.alertmessage("error",error);
					  	this.withdrawswapsubmitted = false;
					  	setTimeout(()=>{location.reload();},2000);
					});
		    	}
		    // token to coin swap

		    // coin to token swap
		    	async coin_to_token_swap_concall(){
		    		this.uichange.changebackground();
					this.withdrawswapsubmitted = true;
					let swapExactETHForTokens 	= this.exchange_token_api_value; // eth from amount
			        let amountOut 				= this.exchange_eth_api_value; //toekn from amount (mul with decimal )
			        let path     				= [wethaddress,this.sw_fullpair_data.fromCurrency_address]; // array values
			        let to 						= this.commonservice.metaDetails.account;
			        let date 					= new Date(); 
			        let timestamp 				= date.getTime();
			        let deadline 				= timestamp+1000;
			        await this.swapservice.swapExactETHForTokens(ContractDetails.router_contract,RouterAbi,swapExactETHForTokens,amountOut,path,to,deadline).then(async(result)=>{
						if(result.status) {
							this.commonservice.alertmessage("success",'Swap Successfully Completed');
							this.withdrawswapsubmitted = false;
							this.exchangeHash = result.result.transactionHash;
							await this.exchangeInsert('coinTotoken');
							this.uichange.clearbackground();
							setTimeout(()=>{location.reload();},4000);
						} else {
							// this.toastr.errorToastr(result.message);
							this.commonservice.alertmessage("error",result.message);
							this.withdrawswapsubmitted = false;
							setTimeout(()=>{location.reload();},2000);
						}
					}).catch((error)=>{
					  	// this.toastr.errorToastr(error, 'OOPS!');
					  	this.commonservice.alertmessage("error",error);
					  	this.withdrawswapsubmitted = false;
					  	setTimeout(()=>{location.reload();},2000);
					});
				}
		    // coin to token swap

		    // token to token swap
		    	// approve call
			    	async token_to_token_submit(){
			    		this.uichange.changebackground();
						this.withdrawswapsubmitted = true;
						let f_amount;
						let f_address;
						let t_amount;
						let t_address;
						if(this.swapformorder) {
							console.log("this.exchange_token_api_value --->",this.exchange_token_api_value);
							console.log("this.exchange_eth_api_value --->",this.exchange_eth_api_value);
							f_amount 		= this.exchange_token_api_value;
							t_amount 		= this.exchange_eth_api_value;
							f_address  		= this.sw_fullpair_data.fromCurrency_address;
							t_address  		= this.sw_fullpair_data.toCurrency_address;
						} else {
							console.log("this.exchange_token_api_value --->",this.exchange_token_api_value);
							console.log("this.exchange_eth_api_value --->",this.exchange_eth_api_value);
							f_amount 		= this.exchange_eth_api_value;
							t_amount 		= this.exchange_token_api_value;
							f_address  		= this.sw_fullpair_data.toCurrency_address;
							t_address  		= this.sw_fullpair_data.fromCurrency_address;
						}
						
						await this.commonmetamaskservice.ApproveFunction(f_address,TokenAbi,ContractDetails.router_contract,f_amount,this.commonservice.metaDetails.account).then(async(result)=>{
							if(result.status) {
								await this.commonmetamaskservice.ApproveFunction(t_address,TokenAbi,ContractDetails.router_contract,t_amount,this.commonservice.metaDetails.account).then(async(result)=>{
									if(result.status) {
										this.commonservice.alertmessage("success",'Approved Successfully');
										this.withdrawswapsubmitted = false;
										this.token_to_token_swap_concall(f_address,t_address,f_amount,t_amount);
									} else {
										this.commonservice.alertmessage("error",result.message);
										this.withdrawswapsubmitted = false;
										setTimeout(()=>{location.reload();},2000);
									}
								}).catch((error)=>{
								  	this.commonservice.alertmessage("error",error);
								  	this.withdrawswapsubmitted = false;
								  	setTimeout(()=>{location.reload();},2000);
								});
			                } else {
								this.commonservice.alertmessage("error",result.message);
								this.withdrawswapsubmitted = false;
								setTimeout(()=>{location.reload();},2000);
							}
						}).catch((error)=>{
						  	this.commonservice.alertmessage("error",error);
						  	this.withdrawswapsubmitted = false;
						  	setTimeout(()=>{location.reload();},2000);
						});
			    	}

			    // token to token swap call
			    	async token_to_token_swap_concall(first_cont_address,second_cont_address,f_amount,s_amount){
			    		this.uichange.changebackground();
						this.withdrawswapsubmitted = true;
						console.log("f_amount ----->",f_amount);
						console.log("s_amount ----->",s_amount);
						

						let amountIn 		= f_amount;//
						let amountOutMin    = (s_amount * min_percentage) / 100; //
						amountOutMin        = s_amount - amountOutMin;
						amountOutMin        = Math.trunc(amountOutMin);
						console.log("amountOutMin ----->",amountOutMin);

						let path 			= [first_cont_address,second_cont_address];
						let to 				= this.commonservice.metaDetails.account;
						let date 			= new Date(); 
						let timestamp 		= date.getTime();
						let deadline 		= timestamp+1000;

						await this.swapservice.swapExactTokensForTokens(ContractDetails.router_contract,RouterAbi,amountIn.toString(),amountOutMin.toString(),path,to,deadline).then(async(result)=>{
							if(result.status) {
								// this.toastr.successToastr('Swap Successfully Completed', 'Success!');
								this.commonservice.alertmessage("success",'Swap Successfully Completed');
								this.withdrawswapsubmitted = false;
								this.exchangeHash = result.result.transactionHash;
								await this.exchangeInsert('tokenTotoken');
								this.uichange.clearbackground();
								setTimeout(()=>{location.reload();},4000);
							} else {
								// this.toastr.errorToastr(result.message);
								this.commonservice.alertmessage("error",result.message);
								this.withdrawswapsubmitted = false;
								setTimeout(()=>{location.reload();},2000);
							}
						}).catch((error)=>{
						  	// this.toastr.errorToastr(error, 'OOPS!');
						  	this.commonservice.alertmessage("error",error);
						  	this.withdrawswapsubmitted = false;
						  	setTimeout(()=>{location.reload();},2000);
						});
					}
			// token to token swap
	// contract call

	// exchange insert
		async exchangeInsert(type){
		    let data = {
		      userAddress:this.commonservice.metaDetails.account,
		      type: type,
		      amountETH: this.exchangeformdata.from_amount,
		      amountToken: this.exchangeformdata.to_amount,
		      from_amount: parseFloat(this.exchangeformdata.from_amount),
		      to_amount: parseFloat(this.exchangeformdata.to_amount),
		      pair:this.sw_fullpair_data.pair,
		      txId: this.exchangeHash,
		    }
		    await this.dataservice.postUrl('exchange/createExchange',data).subscribe((res:any)=>{
		      console.log(res,'result of exchangeinsertion');
		    })
		}
    // exchange insert


 	async filterFn(value,pairData) {
      	if(pairData=="first"){
			if(value == ''|| value == null) {			
				this.swap_base_currency = this.swap_base_currency_temp;
			} else {			
				var first = this.swap_base_currency; 
				var res = first.filter((fir) => { 
			if(new RegExp(value, "i").test(fir._id)){return true;}else{return false;} });
				this.swap_base_currency = res;			
			}				
		}else{			
			if(value == ''|| value == null) {			
				this.sw_sec_currency = this.sw_sec_currency_temp;
			} else {			
				var second = this.sw_sec_currency; 
				var res = second.filter((sec) => { 
				if(new RegExp(value, "i").test(sec.toCurrency)){return true;}else{return false;} });
				this.sw_sec_currency = res;			
			}
		}
    }

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

 //    toFixeds(x) {
 //        if (Math.abs(x) < 1.0) {
 //          var e = parseInt(x.toString().split('e-')[1]);
 //          if (e) {
 //              x *= Math.pow(10,e-1);
 //              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
 //          }
 //        } else {
 //          var e = parseInt(x.toString().split('+')[1]);
 //          if (e > 20) {
 //              e -= 20;
 //              x /= Math.pow(10,e);
 //              x += (new Array(e+1)).join('0');
 //          }
 //        }
 //        return x;
 //    }

}
