import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/common/services/common/common.service';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthmetamaskService {

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
				_this.connectMetaMask();
				_this.commonservice.alertmessage("info","Metamask Account has been changed ! ");
				setTimeout(()=>{location.reload();},2000);
			})
		}  	
	}

	public async checkChainId(): Promise<any> {
	  	return new Promise((resolve, reject) => {
	      if (typeof window.web3 !== "undefined") {
	      	window.web3.eth.getChainId((err, netId) => {
	      		console.log("netId ----->",netId);
		        if( netId == environment.chainid ) {
		        	const sucMsg = {
		              status: true,
		              message: "Correct Network",
		            };
	            	resolve(sucMsg);
		        } else {
		        	console.log("else   ----->",netId);
		        	localStorage.clear();
		        	const sucMsg = {
		              status: false,
		              message: "Kindly Change Ropston network",
		            };
	            	resolve(sucMsg);
		        }
	      	})
	      } else {
	      	console.log("hole else   ----->");
	        const failMsg = {
	          status: false,
	          message: "Metamask extension not added on your browser"
	        };
	        resolve(failMsg);
	      }
	    }) as Promise<any>;
	}

	public async connectMetaMask(): Promise<any> {
	  	await this.sleep(1000);
	    return new Promise((resolve, reject) => {
	      if (typeof window.web3 !== "undefined") {
	      	this.checkChainId().then((result)=>{
	      		if(result.status){
			        window.ethereum.enable();
			        window.web3.eth.getAccounts(async (err, retAccount) => {
			          if (retAccount.length > 0) {
			            localStorage.setItem("account", retAccount[0]);
			            localStorage.setItem("Login_status", "true");
			            this.commonservice.metaDetails.account = retAccount[0];
			            const sucMsg = {
			              status: true,
			              message: "Login successfully",
			              address: retAccount[0]
			            };
			            resolve(sucMsg);
			          } else {
			          	localStorage.setItem("Login_status", "false");
			            const failMsg = {
			              status: false,
			              message: "No account found"
			            };
			            resolve(failMsg);
			          }
			          if (err != null) {
			          	localStorage.setItem("Login_status", "false");
			            const failMsg = {
			              status: false,
			              message: "Error retrieving account"
			            };
			            resolve(failMsg);
			          }
			        });
			    }else{
			    	resolve(result);
	      		}
	      	}).catch((error)=>{
	      		localStorage.setItem("Login_status", "false");
	      		const failMsg = {
	              status: false,
	              message: "Network Error"
	            };
	            resolve(failMsg);
	      	});
	      } else {
	        localStorage.setItem("Login_status", "false");
	        const failMsg = {
	          status: false,
	          message: "Metamask extension not added on your browser"
	        };
	        resolve(failMsg);
	      }
	    }) as Promise<any>;
	}

	public async GetETHbalance(): Promise<any> {
	  	return new Promise((resolve, reject) => {
	      if (typeof window.web3 !== "undefined") {
	      	let account = this.commonservice.metaDetails.account;
	  		  this.checkChainId().then((result)=>{
	  			if(result.status){
			      	window.web3.eth.getBalance(account, function (err, balance) {
	  					localStorage.setItem('rawethbalance',balance);
			      		let convert_balance = window.web3.utils.fromWei(balance.toString(), 'ether');
			      		localStorage.setItem('ethbalance',convert_balance);
			          	let date_for   		= new Date();
			         	let date_data: any  = date_for.getTime();
			          	localStorage.setItem('dtime',date_data);
			          	const sucMsg = {
			              status: true,
			              message: "Get your balance",
			              rawbalance: balance,
			              balance: convert_balance
			            };
			            resolve(sucMsg);
			        });
			    }else{
			    	resolve(result);
	      		}
	      	}).catch((error)=>{
	      		const failMsg = {
	              status: false,
	              message: "Network Error"
	            };
	            resolve(failMsg);
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

	public async isAddressCheck(Address): Promise<any> {
    	return new Promise((resolve, reject) => {
	      	if (typeof window.web3 !== "undefined") {
		      	let isAdd =window.web3.utils.isAddress(Address);
	      		if( isAdd ) {
	      			const sucMsg = {
		              status: true
		            };
	            	resolve(sucMsg);
	      		}else{
	      			const sucMsg = {
		              status: false
		            };
	            	resolve(sucMsg);
	      		}
	      	}else{
		      	const failMsg = {
		          status: false
		        };
		        resolve(failMsg);
	      	}
	  	})
    }

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

}
