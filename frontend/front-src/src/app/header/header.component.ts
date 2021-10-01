import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/common/services/common/common.service';
import { DataService } from 'src/app/common/services/api/data.service';
import { AuthmetamaskService } from 'src/app/common/services/metamask/auth/authmetamask.service';

declare let window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@ViewChild('staticModal') staticModal;
	@ViewChild('staticModal1') staticModal1;
	isLogin 				= false;
	settingPopup 			= false;
	Metamask_address:any 	= "";
	showuseraddress:any 	= "";
	Metamask_balance:any 	= 0;
	slippageValue:any 	={};
	slippageclass:any;
	@Input() site:any={};
	data:any=0
  	constructor(private commonservice:CommonService,private dataservice:DataService,private authmetamaskservice:AuthmetamaskService) { 
  		this.commonservice.showWalletList.subscribe((suc) => {
  			// console.log("into login header --->");
  			// console.log("into login suc --->",suc);
	      if (suc) {
	        this.staticModal.show();
	      }
	    });
  	}

  	async ngOnInit() {
  		await this.sleep(1000);
  		this.commonservice.getLocalstorageSimpleUser();
  		let address_value = localStorage.getItem("account");
  		if(address_value){
  			this.isLogin = true;
  			this.commonservice.metaDetails.isLogin = true;
  			this.commonservice.metaDetails.account = address_value;
			this.Metamask_address = this.commonservice.metaDetails.account;
			this.showuseraddress  = this.commonservice.metaDetails.account.substring(0, 6)+"..."+this.commonservice.metaDetails.account.substring(this.commonservice.metaDetails.account.length-4);
			this.GetETHbalance();
  		}else{
  			this.isLogin = false;
  			this.commonservice.metaDetails.isLogin = false;
  		}

  		// set slippage values
  			this.slippageclass = (+this.commonservice.simpleUserStorage.userSlippageTolerance) / 100;
  		// set slippage values
  	}

  	async connectwallet(wallettype: any){
  		switch (wallettype) {
			case "metamask":
				sessionStorage.setItem("Wallettype", "metamask");
				localStorage.setItem("Wallettype", "metamask");
				window.web3 = window.web3.currentProvider;
				window.web3 = new window.Web3(window.ethereum);
				// code block
			break;
			case "walletconnect":
				// this.connector = new WalletConnect({
				//   bridge: "https://bridge.walletconnect.org" // Required
				// });
				sessionStorage.setItem("Wallettype", "walletconnect");
				localStorage.setItem("Wallettype", "walletconnect");
				window.web3 = window.web3.currentProvider;
				window.web3 = new window.Web3(window.ethereum);
				// code block
			break;
			default:
			// code block
	    }
  		await this.authmetamaskservice.connectMetaMask().then(async(result)=>{
  			if(result.status) {
		  		this.isLogin 		  = true;
		  		this.commonservice.metaDetails.isLogin = true;
		  		this.Metamask_address = result.address;
		  		this.showuseraddress  = this.Metamask_address.substring(0, 6)+"..."+this.Metamask_address.substring(this.Metamask_address.length-4);
		  		this.GetETHbalance();
		  		this.staticModal.hide();
		  		this.commonservice.alertmessage("success",result.message);
				this.commonservice.metaDetails.wallettype = wallettype;
		  	} else {
		  		this.isLogin = false;
		  		this.commonservice.metaDetails.isLogin = false;
				this.commonservice.alertmessage("error",result.message);
				this.commonservice.metaDetails.wallettype = "";
				this.staticModal.hide();
		  	}
		}).catch((error)=>{
			this.isLogin = false;
			this.commonservice.metaDetails.isLogin = false;
			this.commonservice.metaDetails.wallettype = "";
			this.staticModal.hide();
		});
		
  	}

	async GetETHbalance(){
		this.authmetamaskservice.GetETHbalance().then(async(result)=>{
			if(result.status) {
				this.commonservice.metaDetails.balance = result.balance;
				this.Metamask_balance = result.balance;
			} else {
				this.commonservice.alertmessage("error",result.message);
			}
		}).catch((error)=>{
			this.commonservice.alertmessage("error",error);
		});
	}

	// copy 
	    copyvalue(){
	      var textArea = document.createElement("textarea");
	      textArea.value = this.Metamask_address;
	      document.body.appendChild(textArea);
	      textArea.select();
	      document.execCommand("Copy");
	      textArea.remove();
	      this.commonservice.alertmessage("success", 'Copied ');
	    }
	// copy 

	//open exporer
	    openaddress_explorer(){
	    	let address_exp_url = environment.explorerlink+"/address/"+this.Metamask_address;
	      	window.open(address_exp_url, "_blank");
	    }
	//open exporer

	// logout
		logout(){
			this.staticModal1.hide();
			this.isLogin = false;
			this.commonservice.metaDetails.isLogin = false;
			localStorage.clear();
			this.staticModal.show();
		}
	// logout
	

	// slippage tolerance section
	
		settingControl(){
			if(this.settingPopup){
				this.settingPopup = false;
			} else {
				this.settingPopup = true;
			}
		}
	
		// async ToleranceKeyUp(event: any){
		// 	if(event.target.value >= 0.1 && event.target.value <= 1 ){
		// 		this.slippageValue.userSlippageTolerance = (+event.target.value) * 100;
		// 		let obj = 	{
		// 						"userSlippageTolerance" : this.slippageValue.userSlippageTolerance
		// 					}
		// 		this.commonservice.setLocalstorageSimpleUser(obj);
		// 	} else {
		// 		// this.commonservice.alertmessage("error", 'Amount must be 0.1% to 1%');
		// 	}
		// } userDeadline

		async ToleranceClick(Value: any){
			// var check = window.web3.eth.getGasPrice(function(error, result){
				window.web3.eth.getGasPrice(function(error, result){
					// console.log("result   --->",result);
				});
			this.slippageValue.userSlippageTolerance = (+Value) * 100;
			let obj = 	{
							"userSlippageTolerance" : this.slippageValue.userSlippageTolerance
						}
			this.commonservice.setLocalstorageSimpleUser(obj);
			this.slippageclass = (+Value);
		}

		async DeadlineKeyUp(event: any){
			if(event.target.value >= 1){
				this.slippageValue.userDeadline = (+event.target.value) * 60;
				let obj = 	{
								"userDeadline" : this.slippageValue.userDeadline
							}
				this.commonservice.setLocalstorageSimpleUser(obj);
			}
		} 
	// slippage tolerance section




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
}
