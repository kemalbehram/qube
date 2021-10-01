import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/common/services/common/common.service';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class CommonMetamaskService {

  	constructor(private commonservice:CommonService) { 
  		if (window.ethereum === undefined) {
		  this.commonservice.alertmessage("error","Non-Ethereum browser detected. Connect MetaMask");
		} else {
			window.web3 = window.web3.currentProvider;
			window.web3 = new window.Web3(window.ethereum);

			let _this = this
			window.ethereum.on('accountsChanged', function (accounts) {
				_this.commonservice.alertmessage("info","Metamask Account has been changed ! ");
			})
		} 
  	}

  	public async GetTokenbalance(Contract:any,Abi_array:any,UserAddress:any): Promise<any> {
		return new Promise(async(resolve, reject) => {
	      if (typeof window.web3 !== "undefined") {
	      	let token_contract =  new window.web3.eth.Contract(Abi_array, Contract);
	        await token_contract.methods.balanceOf(UserAddress).call((err,balance) =>{
	          if(balance) {
	          	const sucMsg = {
			              status: true,
			              message: "Get your balance",
			              rawbalance: balance,
			              balance: window.web3.utils.fromWei(balance.toString(), 'ether')
			            };
			    resolve(sucMsg);
			  } else {
			  	const sucMsg = {
			              status: false,
			              message: "Got error",
			              data: err,
			            };
			    resolve(sucMsg);
			  }
	        });
	      } else {
	        const failMsg = {
	          status: false,
	          message: "Metamask extension not added on your browser"
	        };
	        resolve(failMsg);
	      }
	    }) as Promise<any>;
	}

	public async GetTotalSupply(Contract:any,Abi_array:any): Promise<any> {
		console.log("into GetTotalSupply");
		return new Promise(async(resolve, reject) => {
	      if (typeof window.web3 !== "undefined") {
	      	let token_contract =  new window.web3.eth.Contract(Abi_array, Contract);
	        await token_contract.methods.totalSupply().call((err,totalsupply) =>{
	          if(totalsupply) {
	          	const sucMsg = {
			              status: true,
			              message: "Got Totalsupply",
			              rawtotalsupply: totalsupply,
			              totalsupply: window.web3.utils.fromWei(totalsupply.toString(), 'ether')
			            };
			    resolve(sucMsg);
			  } else {
			  	const sucMsg = {
			              status: false,
			              message: "Got error",
			              data: err,
			            };
			    resolve(sucMsg);
			  }
	        });
	      } else {
	        const failMsg = {
	          status: false,
	          message: "Metamask extension not added on your browser"
	        };
	        resolve(failMsg);
	      }
	    }) as Promise<any>;
	}

	// amount convertion
	public async AmountConvertion(Amount:any,type:any,decimal:any): Promise<any> {
  		return new Promise(async(resolve, reject) => {
	      	if (typeof window.web3 !== "undefined") {
	      		if(type=="towei") {
	      			let resultAmount = 0;
	      			if(decimal == "18"){
						resultAmount        	= window.web3.utils.toWei(Amount.toString(), 'ether');
	    			} else {
	    				resultAmount        	= Amount*(+decimal);
						resultAmount        	= Math.trunc(Amount);
					}
					const susMsg = {
			          status: true,
			          result: resultAmount,
			          message: "Got result"
			        };
			        resolve(susMsg);
	      		} else {
	      			let resultAmount = 0;
	      			if(decimal == "18"){
						resultAmount        	= window.web3.utils.fromWei(Amount.toString(), 'ether');
	    			} else {
	    				resultAmount        	= Amount/(+decimal);
						resultAmount        	= Math.trunc(Amount);
					}
					const susMsg = {
			          status: true,
			          result: resultAmount,
			          message: "Got result"
			        };
			        resolve(susMsg);
	      		}
	      	} else {
		        const failMsg = {
		          status: false,
		          message: "Metamask extension not added on your browser"
		        };
		        resolve(failMsg);
	      	}
	    }) as Promise<any>;
	}

	// approve section
  	public async ApproveFunction(Contract:any,Abi_array:any,SpenderAddress:any,Amount:any,UserAddress:any): Promise<any> {
  		return new Promise(async(resolve, reject) => {
	      	if (typeof window.web3 !== "undefined") {
	      		let contract =  new window.web3.eth.Contract(Abi_array, Contract);
		      		// allowance section
		      		await contract.methods.allowance(UserAddress,SpenderAddress).call({from:UserAddress},async (err,getAllowanceResult) =>{
						if( getAllowanceResult ) {
							if((+getAllowanceResult) > (+Amount)) {
								const sucMsg = {
								              status: true,
								              message: "Successfully approved",
								              result: "No need to approve",
								            };
								await resolve(sucMsg);
							} else {
								// approve section
									await contract.methods.approve(SpenderAddress,Amount).send({from:UserAddress}).on('transactionHash', (hash) => {
									}).on('receipt', async (approveresult) => {
									  	const sucMsg = {
								              status: true,
								              message: "Successfully approved",
								              result: approveresult,
								            };
								    	resolve(sucMsg);
									}).on('confirmation', (confirmationNumber, approveresult) => {
									}).on('error',async (error) =>{
										let message = (error.message=="MetaMask Tx Signature: User denied transaction signature")?"Transaction Rejected !":"Something went wrong try after Sometime";
									  	const sucMsg = {
								              status: false,
								              message: error.message,
								              data: err,
								            };
								    	await resolve(sucMsg);
									});
								// approve section
							}
						} else {
							const sucMsg = {
						          status: false,
						          message: "Got error",
						          data: err,
						        };
							resolve(sucMsg);
						}
			        });
			        // allowance section
		  	} else {
		        const failMsg = {
		          status: false,
		          message: "Metamask extension not added on your browser"
		        };
		        resolve(failMsg);
	      	}
	    }) as Promise<any>;
	}

	// get current gasprice
		public async GetCurrenctGasprice(): Promise<any> {
	  		return new Promise(async(resolve, reject) => {
		      	if (typeof window.web3 !== "undefined") {
		      		window.web3.eth.getGasPrice(async function(error, result){
						if(result){
							const sucMsg = {
								              status: true,
								              message: "Successfully approved",
								              result: result,
								            };
							await resolve(sucMsg);
						} else {
							const sucMsg = {
								              status: false,
								              message: "Error",
								              result: error,
								            };
							await resolve(sucMsg);
						}
					});
			    } else {
			        const failMsg = {
			          status: false,
			          message: "Metamask extension not added on your browser"
			        };
			        resolve(failMsg);
		      	}
		    }) as Promise<any>;
		}


	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
  	}


}
