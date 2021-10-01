import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class CommonContractService {

	constructor(private toastr: ToastrManager) { 
		if (window.ethereum === undefined) {
			this.toastr.errorToastr('Non-Ethereum browser detected. Connect MetaMask', 'OOPS!');
		} else {
			window.web3 = window.web3.currentProvider;
			window.web3 = new window.Web3(window.ethereum);
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

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
  	}
}
