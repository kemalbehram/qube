import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/common/services/common/common.service';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class SwapService {

	constructor(private commonservice:CommonService) { 
		if (window.ethereum === undefined) {
		    this.commonservice.alertmessage("error","Non-Ethereum browser detected. Connect MetaMask");
		} else {
			let wallet_type = localStorage.getItem("Wallettype");
			if (wallet_type == "metamask") {
				window.web3 = window.web3.currentProvider;
				window.web3 = new window.Web3(window.ethereum);
			} else if (wallet_type == "walletconnect") {
				window.web3 = window.web3.currentProvider;
				window.web3 = new window.Web3(window.ethereum);
			} else {
				window.web3 = window.web3.currentProvider;
				window.web3 = new window.Web3(window.ethereum);
			}

			let _this = this
			window.ethereum.on('accountsChanged', function (accounts) {
				_this.commonservice.alertmessage("info","Metamask Account has been changed ! ");
			})
		} 
	}

	// get equalamount
		// getAmountsIn
			public async getAmountsIn(Contract:any,Abi_array:any,AmountOut:any,Path:any): Promise<any> {
				return new Promise(async(resolve, reject) => {
			      if (typeof window.web3 !== "undefined") {
			      	let pair_contract =  new window.web3.eth.Contract(Abi_array, Contract);
			        await pair_contract.methods.getAmountsIn(AmountOut,Path).call(async (err,getamountsInresult) =>{
			          if( getamountsInresult ) {
						const sucMsg = {
					              status: true,
					              message: "GetamountsInresult Result",
					              resultamount: getamountsInresult,
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

		// getAmountsOut
			public async getAmountsOut(Contract:any,Abi_array:any,AmountIn:any,Path:any): Promise<any> {
				return new Promise(async(resolve, reject) => {
			      if (typeof window.web3 !== "undefined") {
			      	let pair_contract =  new window.web3.eth.Contract(Abi_array, Contract);
			        await pair_contract.methods.getAmountsOut(AmountIn,Path).call(async (err,getamountsOutresult) =>{
			          if( getamountsOutresult ) {
						const sucMsg = {
					              status: true,
					              message: "getamountsOutresult Result",
					              resultamount: getamountsOutresult,
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

		// token_to_coin section
		  	public async swapExactTokensForETH(Contract:any,Abi_array:any,AmountIn:any,AmountOutMin:any,Path:any,To:any,Deadline:any): Promise<any> {
		  		// console.log("into swapExactTokensForETH function ------>");
		  		// console.log("Contract ------>",Contract);
		  		// console.log("AmountIn ------>",AmountIn);
		  		// console.log("AmountOutMin ------>",AmountOutMin);
		  		// console.log("Path ------>",Path);
		  		// console.log("To ------>",To);
		  		// console.log("Deadline ------>",Deadline);
		  		return new Promise(async(resolve, reject) => {
			      if (typeof window.web3 !== "undefined") {
			      		let Slippage  		= (+this.commonservice.simpleUserStorage.userSlippageTolerance) / 100;
			      		window.web3.eth.getGasPrice(async function(error, Gaspriceresult){
							if(Gaspriceresult){
								let Gasprice:any 		= (+Gaspriceresult);
								let Slipageprice 	= (Gasprice * ((+Slippage) / 100) );
								Gasprice 			=  Math.ceil(Gasprice + Slipageprice).toString();
				      			// swap token to coin
				      				let contract =  new window.web3.eth.Contract(Abi_array, Contract);
					      			await contract.methods.swapExactTokensForBNB(AmountIn,AmountOutMin,Path,To,Deadline).send({from:To,gasPrice:Gasprice}).on('transactionHash', (hash) => {
									  	// console.log("a ------>",hash);
									}).on('receipt', async (approveresult) => {
									  	const sucMsg = {
								              status: true,
								              message: "Successfully swap",
								              result: approveresult,
								            };
								    	resolve(sucMsg);
									}).on('confirmation', (confirmationNumber, approveresult) => {
									}).on('error',async (error) =>{
										let message = (error.message=="MetaMask Tx Signature: User denied transaction signature")?"Transaction Rejected !":"Something went wrong try after Sometime";
									  	const sucMsg = {
								              status: false,
								              message: error.message,
								              data: error,
								            };
								    	await resolve(sucMsg);
									});
								// swap token to coin
							} else {
								const sucMsg = {
									              status: false,
									              message: "Please try again later",
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

		// coin_to_token section
		  	public async swapExactETHForTokens(Contract:any,Abi_array:any,swapExactETHForTokens:any,AmountOut:any,Path:any,To:any,Deadline:any): Promise<any> {
		  		// console.log("into swapExactETHForTokens function ------>");
		  		// console.log("Contract ------>",Contract);
		  		// console.log("swapExactETHForTokens ------>",swapExactETHForTokens);
		  		// console.log("AmountOut ------>",AmountOut);
		  		// console.log("Path ------>",Path);
		  		// console.log("To ------>",To);
		  		// console.log("Deadline ------>",Deadline);
		  		return new Promise(async(resolve, reject) => {
			      if (typeof window.web3 !== "undefined") {
			      		let Slippage  		= (+this.commonservice.simpleUserStorage.userSlippageTolerance) / 100;
			      		window.web3.eth.getGasPrice(async function(error, Gaspriceresult){
							if(Gaspriceresult){
								let Gasprice:any 		= (+Gaspriceresult);
								let Slipageprice 	= (Gasprice * ((+Slippage) / 100) );
								Gasprice 			=  Math.ceil(Gasprice + Slipageprice).toString();
				      			// swap coin to token
				      				let contract =  new window.web3.eth.Contract(Abi_array, Contract);
					      			await contract.methods.swapExactBNBForTokens(AmountOut,Path,To,Deadline).send({from:To,value:swapExactETHForTokens,gasPrice:Gasprice}).on('transactionHash', (hash) => {
									  	// console.log("a ------>",hash);
									}).on('receipt', async (approveresult) => {
									  	const sucMsg = {
								              status: true,
								              message: "Successfully swap",
								              result: approveresult,
								            };
								    	resolve(sucMsg);
									}).on('confirmation', (confirmationNumber, approveresult) => {
									}).on('error',async (error) =>{
										let message = (error.message=="MetaMask Tx Signature: User denied transaction signature")?"Transaction Rejected !":"Something went wrong try after Sometime";
									  	const sucMsg = {
								              status: false,
								              message: error.message,
								              data: error,
								            };
								    	await resolve(sucMsg);
									});
								// swap coin to token
							} else {
								const sucMsg = {
									              status: false,
									              message: "Please try again later",
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

		// token_to_token section
		  	public async swapExactTokensForTokens(Contract:any,Abi_array:any,AmountIn:any,AmountOutMin:any,Path:any,To:any,Deadline:any): Promise<any> {
		  		// console.log("into swapExactTokensForTokens function ------>");
		  		// console.log("Contract ------>",Contract);
		  		// console.log("AmountIn ------>",AmountIn);
		  		// console.log("AmountOutMin ------>",AmountOutMin);
		  		// console.log("Path ------>",Path);
		  		// console.log("To ------>",To);
		  		// console.log("Deadline ------>",Deadline);
		  		return new Promise(async(resolve, reject) => {
			      if (typeof window.web3 !== "undefined") {
			      		let Slippage  		= (+this.commonservice.simpleUserStorage.userSlippageTolerance) / 100;
			      		window.web3.eth.getGasPrice(async function(error, Gaspriceresult){
							if(Gaspriceresult){
								let Gasprice:any 		= (+Gaspriceresult);
								let Slipageprice 	= (Gasprice * ((+Slippage) / 100) );
								Gasprice 			=  Math.ceil(Gasprice + Slipageprice).toString();
				      			// swap token to token
							      	let contract =  new window.web3.eth.Contract(Abi_array, Contract);
					      			await contract.methods.swapExactTokensForTokens(AmountIn,AmountOutMin,Path,To,Deadline).send({from:To,gasPrice:Gasprice}).on('transactionHash', (hash) => {
									  	// console.log("a ------>",hash);
									}).on('receipt', async (approveresult) => {
									  	const sucMsg = {
								              status: true,
								              message: "Successfully swap",
								              result: approveresult,
								            };
								    	resolve(sucMsg);
									}).on('confirmation', (confirmationNumber, approveresult) => {
									}).on('error',async (error) =>{
										let message = (error.message=="MetaMask Tx Signature: User denied transaction signature")?"Transaction Rejected !":"Something went wrong try after Sometime";
									  	const sucMsg = {
								              status: false,
								              message: error.message,
								              data: error,
								            };
								    	await resolve(sucMsg);
									});
								// swap token to token
							} else {
								const sucMsg = {
									              status: false,
									              message: "Please try again later",
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
