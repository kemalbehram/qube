import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from 'src/app/common/services/api/data.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';

@Component({
  selector: 'app-toppairs',
  templateUrl: './toppairs.component.html',
  styleUrls: ['./toppairs.component.scss']
})
export class ToppairsComponent implements OnInit {

	pairsSno:any;
  	pairArray:any=[];
  	pairArray_temp:any=[];
  	collectionData = { count: 0, data: [] };
  	toppairSort: any = {dir: "desc", prop: "modifieddate"};
  	toppairSearch = "";
  	recordShow:Boolean=false;

  	constructor(public uichange:UichangeService,private dataservice:DataService) { 
	    this.pairsSno = {
	      	totalItems   : this.collectionData.count,
	      	itemsPerPage : 10,
	      	currentPage  : 1,
	    }
	}

  ngOnInit() {
  	this.viewLoad();
  }
	
	viewLoad(){
		setTimeout(() => {
	        this.getToppair();
	    }, 2000);
	}

    pageChanged(event){
	    this.pairsSno.currentPage = event;
	    this.getToppair();
  	}

   	getToppair(){
   		this.uichange.changebackground();
	    var pair_config = {
	      size:this.pairsSno.itemsPerPage,
	      pageNumber:this.pairsSno.currentPage,
	      total:this.collectionData.count
	    }
	  	var toppairresult = {"page":pair_config,"sorting":this.toppairSort,"search": this.toppairSearch};
	    this.dataservice.postUrl('chart/chartpair_data',toppairresult).subscribe((result:any)=>{ 
	      
	      this.recordShow=true;
	      this.pairsSno.totalItems = result.currencycount;
	      this.pairArray = result.data;
	      this.pairArray_temp = result.data;
		  this.uichange.clearbackground(); 
	    });
  	}

  	async filterFnc(value) {
		if(value == ''|| value == null) {			
			this.pairArray = this.pairArray_temp;
		} else {			
			let Pairs = this.pairArray; 
			var res = Pairs.filter((paI) => { 
		if(new RegExp(value, "i").test(paI.fromCurrency)|| new RegExp(value, "i").test(paI.toCurrency)){return true;}else{return false;} });
			this.pairArray = res;			
		}				
    }
}
