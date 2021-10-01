import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/common/services/api/data.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';

@Component({
  selector: 'app-toptokens',
  templateUrl: './toptokens.component.html',
  styleUrls: ['./toptokens.component.scss']
})
export class ToptokensComponent implements OnInit {

  	tokensSno:any;
  	tokenArray:any=[];
  	tokenArray_temp:any=[];
  	collectionData = { count: 0, data: [] };
  	tokenSort: any = {dir: "desc", prop: "modifieddate"};
  	tokenSearch = "";
  	recordShow:Boolean=false;

  	constructor(public uichange:UichangeService,private dataservice:DataService) {
  		this.tokensSno = {
	      	totalItems   : this.collectionData.count,
	      	itemsPerPage : 10,
	      	currentPage  : 1,
	    } 
  	}

	ngOnInit() {
	    this.getTokens()
	}

	async filterFnc(value) {
		if(value == ''|| value == null) {			
			this.tokenArray = this.tokenArray_temp;
		} else {			
			let tokens = this.tokenArray; 
			var res = tokens.filter((toke) => { 
		if(new RegExp(value, "i").test(toke.currency_name)|| new RegExp(value, "i").test(toke.currency)){return true;}else{return false;} });
			this.tokenArray = res;			
		}				
    }

    pageChanged(event){
	    this.tokensSno.currentPage = event;
	    this.getTokens();
  	}

	getTokens(){
		this.uichange.changebackground();
	    var tokenRes = {
	      size:this.tokensSno.itemsPerPage,
	      pageNumber:this.tokensSno.currentPage,
	      total:this.collectionData.count
	    }
	    var lstinput = {"page":tokenRes,"sorting":this.tokenSort,"search": this.tokenSearch};
	    this.dataservice.postUrl('chart/charttoken_data',lstinput).subscribe((result:any)=>{         
	        this.uichange.clearbackground(); 
	        this.recordShow=false;
	        this.tokensSno.totalItems = result.currencycount;
	      	this.tokenArray = result.data;
	      	this.tokenArray_temp = result.data;
	      	
	    });
  	}
  	

}
