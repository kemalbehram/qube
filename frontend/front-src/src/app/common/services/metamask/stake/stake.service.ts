import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
declare let window: any;
@Injectable({
  providedIn: 'root'
})
export class StakeService {

  	constructor(private toastr: ToastrManager) { 
		if (window.ethereum === undefined) {
			this.toastr.errorToastr('Non-Ethereum browser detected. Connect MetaMask', 'OOPS!');
		} else {
			window.web3 = window.web3.currentProvider;
			window.web3 = new window.Web3(window.ethereum);
		}
  	}

  	// get staked amount
	 	public async GetStakedbalance(Contract:any,Abi_array:any,UserAddress:any,Pair_address:any): Promise<any> {
			// console.log("GetStakedbalance --->");
			// console.log("Contract --->",Contract);
			// console.log("UserAddress --->",UserAddress);
			// console.log("Pair_address --->",Pair_address);
			return new Promise(async(resolve, reject) => {
		      if (typeof window.web3 !== "undefined") {
		      	let token_contract =  new window.web3.eth.Contract(Abi_array, Contract);
		        await token_contract.methods.poolUserInfoMap(Pair_address,UserAddress).call((err,balance) =>{
		            if(balance) {
		            	// console.log(balance,"adewr")
		            	// let balance =balance.amount
	          	        const sucMsg = {
			              status: true,
			              message: "Get your balance",
			              rawbalance: balance.amount,
			              balance: window.web3.utils.fromWei(balance.amount.toString(), 'ether')
			            };
				    	// console.log("sucMsg --->",sucMsg);
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

	// GetRewardamount method
		public async GetRewardamount(Contract:any,Abi_array:any,UserAddress:any,Pair:any): Promise<any> {
			return new Promise(async(resolve, reject) => {
		      if (typeof window.web3 !== "undefined") {
		      	let stake_contract =  new window.web3.eth.Contract(Abi_array, Contract);
		        await stake_contract.methods.pendingQube(Pair,UserAddress).call(async (err,getearnedResult) =>{
		          if( getearnedResult ) {
					const sucMsg = {
				              	status: true,
				              	message: "Get Earned Result",
				              	rawbalance: getearnedResult,
			              		balance: window.web3.utils.fromWei(getearnedResult.toString(), 'ether')
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

	// stake section
		public async StakeFunction(Contract:any,Abi_array:any,Amount:any,UserAddress:any,Pair_address:any): Promise<any> {
			return new Promise(async(resolve, reject) => {
		      if (typeof window.web3 !== "undefined") {
		      	let contract =  new window.web3.eth.Contract(Abi_array, Contract);
		      		// stake section
						await contract.methods.deposit(Pair_address,Amount).send({from:UserAddress}).on('transactionHash', (hash) => {
						  	// console.log("a ------>",hash);
						}).on('receipt', async (stakeresult) => {
						  	const sucMsg = {
					              status: true,
					              message: "Successfully staked",
					              result: stakeresult,
					            };
					    	resolve(sucMsg);
						}).on('confirmation', (confirmationNumber, stakeresult) => {
						}).on('error',async (error) =>{
							let message  = (error.message=="MetaMask Tx Signature: User denied transaction signature")?"Transaction Rejected !":"Something went wrong try after Sometime";
						  	const sucMsg = {
					              status: false,
					              message: error.message,
						        };
					    	await resolve(sucMsg);
						});
					// stake section
		      } else {
		        const failMsg = {
		          status: false,
		          message: "Metamask extension not added on your browser"
		        };
		        resolve(failMsg);
		      }
		    }) as Promise<any>;
		}

	// unstake section
		public async UnstakeFunction(Contract:any,Abi_array:any,UserAddress:any,Pair_address:any,Amount:any): Promise<any> {
			// console.log("Contract ---->",Contract);
			// console.log("UserAddress ---->",UserAddress);
			// console.log("Pair_address ---->",Pair_address);
			// console.log("Amount ---->",Amount);
			return new Promise(async(resolve, reject) => {
		      if (typeof window.web3 !== "undefined") {
		      	let contract =  new window.web3.eth.Contract(Abi_array, Contract);
		      		// unstake section
		      		// console.log(typeof Amount,Amount)
					await contract.methods.withdraw(Pair_address,Amount).send({from:UserAddress}).on('transactionHash', (hash) => {
					  	// console.log("a ------>",hash);
					}).on('receipt', async (unstakeresult) => {
					  	const sucMsg = {
				              status: true,
				              message: "Successfully staked",
				              result: unstakeresult,
				            };
				    	resolve(sucMsg);
					}).on('confirmation', (confirmationNumber, unstakeresult) => {
					}).on('error',async (error) =>{
						let message  = (error.message=="MetaMask Tx Signature: User denied transaction signature")?"Transaction Rejected !":"Something went wrong try after Sometime";
					  	const sucMsg = {
				              status: false,
				              message: error.message,
					        };
				    	await resolve(sucMsg);
					});
					// unstake section
		      } else {
		        const failMsg = {
		          status: false,
		          message: "Metamask extension not added on your browser"
		        };
		        resolve(failMsg);
		      }
		    }) as Promise<any>;
		}

	// harvest section
		public async HarvestFunction(Contract:any,Abi_array:any,UserAddress:any,Pair_address:any): Promise<any> {
			return new Promise(async(resolve, reject) => {
		      if (typeof window.web3 !== "undefined") {
		      	let contract =  new window.web3.eth.Contract(Abi_array, Contract);
		      		// Harvestresult section
		      		    let amount=0;
						await contract.methods.withdraw(Pair_address,amount).send({from:UserAddress}).on('transactionHash', (hash) => {
						  	console.log("a ------>",hash);
						}).on('receipt', async (Harvestresult) => {
						  	const sucMsg = {
					              status: true,
					              message: "Successfully Harvest",
					              result: Harvestresult,
					            };
					    	resolve(sucMsg);
						}).on('confirmation', (confirmationNumber, Harvestresult) => {
						}).on('error',async (error) =>{
							let message  = (error.message=="MetaMask Tx Signature: User denied transaction signature")?"Transaction Rejected !":"Something went wrong try after Sometime";
						  	const sucMsg = {
					              status: false,
					              message: error.message,
						        };
					    	await resolve(sucMsg);
						});
					// Harvestresult section
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