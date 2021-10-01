import { Injectable,Output,EventEmitter } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

	@Output() public showWalletList = new EventEmitter();

	metaDetails: any = {};
	simpleUserStorage: any = {};
	
  	constructor(private toastr: ToastrManager) { }

	alertmessage(type,message){
	  	switch(type) {
			case "success":
				this.toastr.successToastr(message, 'Success!',{"maxShown":1});
			break;
			case "error":
				this.toastr.errorToastr(message, 'Error!',{"maxShown":1});
			break;
			case "warning":
				this.toastr.warningToastr(message, 'Oops!',{"maxShown":1});
			break;
			case "info":
				this.toastr.infoToastr(message, 'Oops!',{"maxShown":1});
			break;
			default:
				this.toastr.infoToastr(message, 'Oops!',{"maxShown":1});
		}
	}

	setLocalstorageSimpleUser(value){
		let simpleuserStorage = localStorage.getItem("LocalstorageSimpleUser");
		let Objkey            = Object.keys(value)[0];
		if(simpleuserStorage){
			let simpleuserStorageObj 		= JSON.parse(simpleuserStorage)
			simpleuserStorageObj[Objkey] 	= value[Objkey];
			localStorage.setItem("LocalstorageSimpleUser", JSON.stringify(simpleuserStorageObj));
		}else{
			localStorage.setItem("LocalstorageSimpleUser", JSON.stringify(value));
		}
	}

	getLocalstorageSimpleUser(){
		let simpleuserStorage 		= localStorage.getItem("LocalstorageSimpleUser");
		if(simpleuserStorage == null) {
			let simpleuserStorageobj = 	{
							"userSlippageTolerance" : 50,
							"userDeadline" : 600
						}
			localStorage.setItem("LocalstorageSimpleUser", JSON.stringify(simpleuserStorageobj));
			this.simpleUserStorage 		= simpleuserStorageobj;
		} else {
			this.simpleUserStorage 		= JSON.parse(simpleuserStorage);
		}
	}
}
