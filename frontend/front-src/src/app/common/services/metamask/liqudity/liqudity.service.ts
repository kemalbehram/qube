import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/common/services/common/common.service';
import { CommonMetamaskService } from 'src/app/common/services/metamask/common/common-metamask.service';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class LiqudityService {

	constructor(public commonservice:CommonService,public commonmetamaskservice:CommonMetamaskService) { 
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

	// get reserves method
		public async GetReserves(Contract:any,Abi_array:any,UserAddress:any,PairValue:any): Promise<any> {
			return new Promise(async(resolve, reject) => {
		      if (typeof window.web3 !== "undefined") {
		      	let pair_contract =  new window.web3.eth.Contract(Abi_array, Contract);
		        await pair_contract.methods.getReserves().call({from:UserAddress},async (err,getReservesResult) =>{
		          if( getReservesResult ) {
					let from_add 		= await pair_contract.methods.token0().call();
	          		let from_amount 	= 0;
	          		let to_amount 		= 0;
	          		if(from_add.toLowerCase() == PairValue.fromCurrency_address.toLowerCase()) {
	          			from_amount     = getReservesResult[0];
	            		to_amount       = getReservesResult[1];	
	          		} else {
	          			from_amount     = getReservesResult[1];
	            		to_amount       = getReservesResult[0];	
	          		}
	          		const sucMsg = {
				              status: true,
				              message: "Getreserves Result",
				              resultamount: getReservesResult,
				              from_amount: from_amount,
				              to_amount: to_amount
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

	// add liqudity section
		// token to token
		public async Addliquditytoken_to_token(Contract:any,Abi_array:any,tokenA:any,tokenB:any,amountADesired:any,amountBDesired:any,amountAMin:any,amountBMin:any,to:any,deadline:any): Promise<any> {

			// console.log("tokenA ----->",tokenA);
			// console.log("tokenB ----->",tokenB);
			// console.log("amountADesired ----->",amountADesired);
			// console.log("amountBDesired ----->",amountBDesired);
			// console.log("amountAMin ----->",amountAMin);
			// console.log("amountBMin ----->",amountBMin);
			// console.log("to ----->",to);
			// console.log("deadline ----->",deadline);
			
			return new Promise(async(resolve, reject) => {
		      if (typeof window.web3 !== "undefined") {
					let Slippage  		= (+this.commonservice.simpleUserStorage.userSlippageTolerance) / 100;
		      		window.web3.eth.getGasPrice(async function(error, Gaspriceresult){
						if(Gaspriceresult){
							let Gasprice:any 		= (+Gaspriceresult);
							let Slipageprice 	= (Gasprice * ((+Slippage) / 100) );
							Gasprice 			=  Math.ceil(Gasprice + Slipageprice).toString();
							// addLiquidity section
				      			let contract =  new window.web3.eth.Contract(Abi_array, Contract);
								await contract.methods.addLiquidity(tokenA,tokenB,amountADesired,amountBDesired,amountAMin,amountBMin,to,deadline).send({from:to,gasPrice:Gasprice}).on('transactionHash', (hash) => {
								}).on('receipt', async (Liquidityresult) => {
								  	const sucMsg = {
							              status: true,
							              message: "Successfully approved",
							              result: Liquidityresult,
							            };
							    	resolve(sucMsg);
								}).on('confirmation', (confirmationNumber, Liquidityresult) => {
								}).on('error',async (error) =>{
									let message = (error.message=="MetaMask Tx Signature: User denied transaction signature")?"Transaction Rejected !":"Something went wrong try after Sometime";
								  	const sucMsg = {
							              status: false,
							              message: error.message,
							              data: error,
							            };
							    	await resolve(sucMsg);
								});
							// addLiquidity section
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

		// coin to token
		public async Addliquditycoin_to_token(Contract:any,Abi_array:any,addLiquidityETH:any,token:any,amountTokenDesired:any,amountTokenMin:any,amountETHMin:any,to:any,deadline:any): Promise<any> {

			// console.log("addLiquidityETH ----->",addLiquidityETH);
			// console.log("token ----->",token);
			// console.log("amountTokenDesired ----->",amountTokenDesired);
			// console.log("amountTokenMin ----->",amountTokenMin);
			// console.log("amountETHMin ----->",amountETHMin);
			// console.log("to ----->",to);
			// console.log("deadline ----->",deadline);

			return new Promise(async(resolve, reject) => {
		      if (typeof window.web3 !== "undefined") {
					let Slippage  		= (+this.commonservice.simpleUserStorage.userSlippageTolerance) / 100;
					window.web3.eth.getGasPrice(async function(error, Gaspriceresult){
						if(Gaspriceresult){
							let Gasprice:any 	= (+Gaspriceresult);
							let Slipageprice 	= (Gasprice * ((+Slippage) / 100) );
							Gasprice 			=  Math.ceil(Gasprice + Slipageprice).toString();
							// addLiquidity section
				      			let contract =  new window.web3.eth.Contract(Abi_array, Contract);
								await contract.methods.addLiquidityBNB(token,amountTokenDesired,amountTokenMin,amountETHMin,to,deadline).send({from:to,value:addLiquidityETH,gasPrice:Gasprice}).on('transactionHash', (hash) => {
								}).on('receipt', async (Liquidityresult) => {
								  	const sucMsg = {
							              status: true,
							              message: "Successfully approved",
							              result: Liquidityresult,
							            };
							    	resolve(sucMsg);
								}).on('confirmation', (confirmationNumber, Liquidityresult) => {
								}).on('error',async (error) =>{
									let message = (error.message=="MetaMask Tx Signature: User denied transaction signature")?"Transaction Rejected !":"Something went wrong try after Sometime";
								  	const sucMsg = {
							              status: false,
							              message: error.message,
							              data: error,
							            };
							    	await resolve(sucMsg);
								});
							// addLiquidity section
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

	// remove liqudity section 
		// coin to token
		public async Removeliquditycoin_to_token(Contract:any,Abi_array:any,TokenAddress:any,Liquidity:any,amountTokenMin:any,amountETHMin:any,to:any,deadline:any): Promise<any> {
			// console.log("Contract ----->",Contract);
			// console.log("TokenAddress ----->",TokenAddress);
			// console.log("Liquidity ----->",Liquidity);
			// console.log("amountTokenMin ----->",amountTokenMin);
			// console.log("amountETHMin ----->",amountETHMin);
			// console.log("to ----->",to);
			// console.log("deadline ----->",deadline);
			return new Promise(async(resolve, reject) => {
		      if (typeof window.web3 !== "undefined") {
					let Slippage  		= (+this.commonservice.simpleUserStorage.userSlippageTolerance) / 100;
		      		window.web3.eth.getGasPrice(async function(error, Gaspriceresult){
						if(Gaspriceresult){
							let Gasprice:any 	= (+Gaspriceresult);
							let Slipageprice 	= (Gasprice * ((+Slippage) / 100) );
							Gasprice 			=  Math.ceil(Gasprice + Slipageprice).toString();
					      		// removeLiquidity section
					      			let contract =  new window.web3.eth.Contract(Abi_array, Contract);
									await contract.methods.removeLiquidityBNB(TokenAddress,Liquidity,amountTokenMin,amountETHMin,to,deadline).send({from:to,gasPrice:Gasprice}).on('transactionHash', (hash) => {
									  	// console.log("a ------>",hash);
									}).on('receipt', async (Liquidityresult) => {
									  	const sucMsg = {
								              status: true,
								              message: "Successfully approved",
								              result: Liquidityresult,
								            };
								    	resolve(sucMsg);
									}).on('confirmation', (confirmationNumber, Liquidityresult) => {
									}).on('error',async (error) =>{
										let message = (error.message=="MetaMask Tx Signature: User denied transaction signature")?"Transaction Rejected !":"Something went wrong try after Sometime";
									  	const sucMsg = {
								              status: false,
								              message: error.message,
								              data: error,
								            };
								    	await resolve(sucMsg);
									});
								// removeLiquidity section
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

		// token to token
		public async Removeliquditytoken_to_token(Contract:any,Abi_array:any,tokenA:any,tokenB:any,Liquidity:any,amountAMin:any,amountBMin:any,to:any,deadline:any): Promise<any> {
			// console.log("Contract ----->",Contract);
			// console.log("tokenA ----->",tokenA);
			// console.log("tokenB ----->",tokenB);
			// console.log("Liquidity ----->",Liquidity);
			// console.log("amountAMin ----->",amountAMin);
			// console.log("amountBMin ----->",amountBMin);
			// console.log("to ----->",to);
			// console.log("deadline ----->",deadline);
			return new Promise(async(resolve, reject) => {
		      if (typeof window.web3 !== "undefined") {
					let Slippage  		= (+this.commonservice.simpleUserStorage.userSlippageTolerance) / 100;
		      		window.web3.eth.getGasPrice(async function(error, Gaspriceresult){
						if(Gaspriceresult){
							let Gasprice:any 	= (+Gaspriceresult);
							let Slipageprice 	= (Gasprice * ((+Slippage) / 100) );
							Gasprice 			=  Math.ceil(Gasprice + Slipageprice).toString();
				      		// removeLiquidity section
				      			let contract =  new window.web3.eth.Contract(Abi_array, Contract);
								await contract.methods.removeLiquidity(tokenA,tokenB,Liquidity,amountAMin,amountBMin,to,deadline).send({from:to,gasPrice:Gasprice}).on('transactionHash', (hash) => {
								  	// console.log("a ------>",hash);
								}).on('receipt', async (Liquidityresult) => {
								  	const sucMsg = {
							              status: true,
							              message: "Successfully approved",
							              result: Liquidityresult,
							            };
							    	resolve(sucMsg);
								}).on('confirmation', (confirmationNumber, Liquidityresult) => {
								}).on('error',async (error) =>{
									let message = (error.message=="MetaMask Tx Signature: User denied transaction signature")?"Transaction Rejected !":"Something went wrong try after Sometime";
								  	const sucMsg = {
							              status: false,
							              message: error.message,
							              data: error,
							            };
							    	await resolve(sucMsg);
								});
							// removeLiquidity section
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


		// Get Pair reserves 

		public async InfoReserves(Contract:any,Abi_array:any,PairValue:any): Promise<any> {
			return new Promise(async(resolve, reject) => {
		      if (typeof window.web3 !== "undefined") {
		      	let pair_contract =  new window.web3.eth.Contract(Abi_array, Contract);
		        await pair_contract.methods.getReserves().call({},async (err,getReservesResult) =>{
		          if( getReservesResult ) {
					let from_add 		= await pair_contract.methods.token0().call();
	          		let from_amount 	= 0;
	          		let to_amount 		= 0;
	          		if(from_add.toLowerCase() == PairValue.fromCurrency_address.toLowerCase()) {
	          			from_amount     = getReservesResult[0];
	            		to_amount       = getReservesResult[1];	
	          		} else {
	          			from_amount     = getReservesResult[1];
	            		to_amount       = getReservesResult[0];	
	          		}
	          		const sucMsg = {
				              status: true,
				              message: "Getreserves Result",
				              resultamount: getReservesResult,
				              from_amount: from_amount,
				              to_amount: to_amount
				            };
				    // console.log("get reserves result =====>",sucMsg);
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

		// Get Pair reserves 

}

