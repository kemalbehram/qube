import { Component, OnInit ,ViewChild} from '@angular/core';
import { DataService } from 'src/app/common/services/api/data.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { ContractDetails } from "src/assets/files/contract";
import { LiqudityService } from 'src/app/common/services/metamask/liqudity/liqudity.service';
import { SwapService } from 'src/app/common/services/metamask/swap/swap.service';
import { PairAbi } from "src/assets/files/pair_abi";
import { RouterAbi } from "src/assets/files/router_abi";
declare let window: any;
import * as HighCharts from 'highcharts';
@Component({
  selector: 'app-coinview',
  templateUrl: './coinview.component.html',
  styleUrls: ['./coinview.component.scss']
})
export class CoinviewComponent implements OnInit {

	pairsSno:any;
  	pairArray:any=[];
  	pairArray_temp:any=[];
  	collectionData = { count: 0, data: [] };
  	toppairSort: any = {dir: "desc", prop: "modifieddate"};
  	
  	coinLiqudityArr:any=[];
  	recordShow:Boolean=false;
  	TokenName="";
  	decimal:any;
  	currencyHistory:any={};
  	tot_Currency:any=0;
  	Favtoken=false;
  	Search = "";
  	CoinSym="";

  	coins:any=[];
  	swapSno:any;
  	swapArray:any=[];
  	swapData = { count: 0, data: [] };
  	swapSort: any = {dir: "desc", prop: "createddate"};

  	addSno:any;
  	addArray:any=[];
  	addData = { count: 0, data: [] };
  	addSort: any = {dir: "desc", prop: "modified_date"};

  	removeSno:any;
  	removeArray:any=[];
  	removeData = { count: 0, data: [] };
  	removeSort: any = {dir: "desc", prop: "modified_date"};

  	allSno:any;
  	allArray:any=[];
  	allData = { count: 0, data: [] };
  	allSort: any = {dir: "desc", prop: "created_date"};
  	// currency=""
  	ShowTrue = false;
  	tokenHistory:any={}
  	constructor(private activateRoute:ActivatedRoute,private liqudityservice:LiqudityService,private router:Router,public uichange:UichangeService,private dataservice:DataService) { 
	    this.pairsSno = {
	      	totalItems   : this.collectionData.count,
	      	itemsPerPage : 10,
	      	currentPage  : 1,
	    }

	    this.swapSno = {
	      	totalItems   : this.swapData.count,
	      	itemsPerPage : 10,
	      	currentPage  : 1,
	    }

	    this.addSno = {
	      	totalItems   : this.addData.count,
	      	itemsPerPage : 10,
	      	currentPage  : 1,
	    }

	    this.removeSno = {
	      	totalItems   : this.removeData.count,
	      	itemsPerPage : 10,
	      	currentPage  : 1,
	    }

	    this.allSno = {
	      	totalItems   : this.allData.count,
	      	itemsPerPage : 10,
	      	currentPage  : 1,
	    }
	}

  ngOnInit() {
  	this.activateRoute.params.subscribe((params) => {
  		if(params){
  			this.TokenName=params.id;
		    this.viewLoad();
		    this.getToppair();
		    this.coins = JSON.parse(localStorage.getItem("CoinFAv"));
		    if(this.coins.length>0){
			    if(this.coins.indexOf(this.TokenName)>=0){
			    	this.Favtoken=true;
			    }
			}
		}else{
  			this.router.navigate(['/overview']);
  		}
    })
  }

	viewLoad(){
		this.uichange.changebackground();
		// setTimeout(() => {
	        this.getPairDetails();      	    
			this.getSwap();
			this.managePairs();
		    this.getAdd();
		    this.getRemove();
		    this.getAll();
	    // }, 2000);
	}
	filterFnc(value) {
      	this.addSno.currentPage = 1;
      	this.removeSno.currentPage = 1;
      	this.swapSno.currentPage = 1;
      	this.pairsSno.currentPage = 1;
      	this.allSno.currentPage = 1;
      	this.Search = value;

      	this.getToppair();
      	this.getSwap();
	    this.getAdd();
	    this.getRemove();
	    this.getAll();
    }

	async getPairDetails(){
	  	var obj1={
		  "currency":this.TokenName
		}
		await this.dataservice.postUrl('accounts/getCoinDept',obj1).subscribe(async(resData:any) => {
		  	if(resData.status) {
			    let resPoolData 	= resData.data;
			    this.currencyHistory 	= resPoolData;
			    this.CoinSym=this.currencyHistory.currencySymbol;
			    this.barChartPopulation(this.CoinSym);
			    this.ShowTrue=true;
			    await this.dataservice.postUrl('chart/getOnetoken',obj1).subscribe((resData:any) => {
			    	if(resData.status) {
			    		this.tokenHistory 	= resData.data;
			    	}else{
			    		this.tokenHistory 	= {};
			    	}
			    })
		  	}else{
		  		this.currencyHistory 	= {};
		  	}
		});
	}

  	async managePairs(){
  		var obj1={
		  "currency":this.TokenName
		}
  		await this.dataservice.postUrl('chart/getActPair',obj1).subscribe(async(pairData:any) => {
  			await pairData.data.map(async pairDetails=>{
	  			this.liqudityservice.InfoReserves(pairDetails.pair_address,PairAbi,pairDetails).then(async(result)=>{
					if(result.status) {
						console.log(result.from_amount)
						if(pairDetails.fromCurrency_name==this.TokenName){
							
							let Tok_amount			= +result.from_amount;
							if(pairDetails.fromCurrency_decimal == "18"){
								let amounts    =+ window.web3.utils.fromWei(Tok_amount.toString(), 'ether');
								this.tot_Currency=+this.tot_Currency + amounts;
								
							} else {
								this.decimal             = +Math.pow(10, pairDetails.fromCurrency_decimal);
								this.tot_Currency=this.tot_Currency+(Tok_amount / this.decimal)
							}
							
						}else if(pairDetails.toCurrency_name==this.TokenName){
							let Tok_amount 			= +result.to_amount;
							if(pairDetails.toCurrency_decimal == "18"){
								let amounts    = +window.web3.utils.fromWei(Tok_amount.toString(), 'ether');
								this.tot_Currency=+this.tot_Currency +amounts;
							} else {
								this.decimal             = +Math.pow(10, pairDetails.toCurrency_decimal);
								this.tot_Currency=+this.tot_Currency +(Tok_amount / this.decimal)
							}
						}
						}
				}).catch((error)=>{
					this.uichange.clearbackground();
				});
			});
		})
	}
	

   	getToppair(){
	    var pair_config = {
	      size:this.pairsSno.itemsPerPage,
	      pageNumber:this.pairsSno.currentPage,
	      total:this.collectionData.count
	    }
	  	var toppairresult = {"page":pair_config,"sorting":this.toppairSort,"search": this.Search};
	    this.dataservice.postUrl('chart/chartpair_data',toppairresult).subscribe((result:any)=>{ 
	      this.pairsSno.totalItems = result.currencycount;
	      this.pairArray = result.data;
	      this.pairArray_temp = result.data;
	    });
  	}

  	getSwap(){
	    var swapRes = {
	      size:this.swapSno.itemsPerPage,
	      pageNumber:this.swapSno.currentPage,
	      totalItems:this.swapData.count
	    }
	    var lstinput = {"page":swapRes,"sorting":this.swapSort,"search": this.Search};
	    this.dataservice.postUrl('accounts/accountSwapData',lstinput).subscribe((result:any)=>{         
	        this.swapSno.totalItems = result.swapcount;
	      	this.swapArray = result.data;
	    });
  	}

  	getAdd(){
  		var addRes = {
	      size:this.addSno.itemsPerPage,
	      pageNumber:this.addSno.currentPage,
	      totalItems:this.addData.count
	    }
	    var lstinput = {"page":addRes,"sorting":this.addSort,"search": this.Search};
	    this.dataservice.postUrl('accounts/accountAddData',lstinput).subscribe((result:any)=>{         
	        this.addSno.totalItems = result.addcount;
	      	this.addArray = result.data;
	    });
  	}

  	getRemove(){
  		var removeRes = {
	      size:this.removeSno.itemsPerPage,
	      pageNumber:this.removeSno.currentPage,
	      totalItems:this.removeData.count
	    }
	    var lstinput = {"page":removeRes,"sorting":this.removeSort,"search": this.Search};
	    this.dataservice.postUrl('accounts/accountRemData',lstinput).subscribe((result:any)=>{         
	        this.removeSno.totalItems = result.removecount;
	      	this.removeArray = result.data;
	    });
  	}

  	getAll(){
  		var allRes = {
	      size:this.allSno.itemsPerPage,
	      pageNumber:this.allSno.currentPage,
	      totalItems:this.allData.count
	    }
	    var lstinput = {"page":allRes,"sorting":this.allSort,"search": this.Search};
	    this.dataservice.postUrl('accounts/accountAllData',lstinput).subscribe(async (result:any)=>{         
	        this.allSno.totalItems = result.currencycount;
	      	await result.data.map(async item=>{
	      		let pairsVal=item.pair.split("_")
      			// item.DateTRans=this.timedif(item.created_date)
	      		if(item.status == true || item.status == false){
	      			item.type="Swap "+pairsVal[0]+" for "+pairsVal[1]
	      			item.fromCurrency=pairsVal[0];
	      			item.toCurrency=pairsVal[1];
	      			item.from_amount=item.amountETH;
	      			item.to_amount=item.amountToken;
	      			item.user_address=item.userAddress;
	      		}else if(item.status=="Active"){
	      			item.type="Add "+item.fromCurrency+" and "+item.toCurrency
	      		}else if(item.status=="Completed"){
	      			item.type="Remove "+item.fromCurrency+" and "+item.toCurrency;
	      		}
	      	})
	      	setTimeout(() => {
	        	this.allArray = result.data;
	        	this.uichange.clearbackground();
	    	}, 2000);
	      	// this.allArray = result.data;
	      	 
	    });
  	}

  	//open exporer
    openaddress_explorer(){
    	let address_exp_url = environment.explorerlink+"/address/"+this.currencyHistory.contract_address;
      	window.open(address_exp_url, "_blank");
    }
    open_explorer(passAddress){
    	let address_exp_url = environment.explorerlink+"address/"+passAddress;
      	window.open(address_exp_url, "_blank");
    }
	//open exporer

	pageChanged(event:any){
	    this.pairsSno.currentPage = event;
	    this.getToppair();
  	}

	swappageChanged(swapevent){
		this.swapSno.currentPage = swapevent;
    	this.getSwap();	
  	}

  	addpageChanged(addevent){
		this.addSno.currentPage = addevent;
    	this.getAdd();	
  	}

  	removepageChanged(removeevent){
  		this.removeSno.currentPage = removeevent;
	    this.getRemove();
  	}

	allpageChanged(allevent){
    	this.allSno.currentPage = allevent;
	    this.getAll();
    }



    Favsection(sec){
    	if(sec=="add"){
          	let array = this.coins
          	if(array== null){
            	localStorage.setItem("CoinFAv", JSON.stringify([this.TokenName]));
          	}else if(array.indexOf(this.TokenName)==-1){
            	array.push(this.TokenName)
            	localStorage.setItem("CoinFAv", JSON.stringify(array));
            	this.coins =array;
        	}else{
        		localStorage.setItem("CoinFAv", JSON.stringify([this.TokenName]));
        	}
        	this.Favtoken=true;
    	}else{
			let array = this.coins
	        let inDex = array.indexOf(this.TokenName)
	        array.splice(inDex,1)
		    localStorage.setItem("CoinFAv", JSON.stringify(array));
		    this.coins =array;
		    this.Favtoken=false;
    	}
    }

    barChartPopulation(pairVal:any) {
	  	this.dataservice.postUrl('chart/chart_Coinliqudity',{"Currency":pairVal}).subscribe((result:any)=>{
	    	this.coinLiqudityArr = result.result;
	    	HighCharts.chart('highcharts', {
			    chart: {
			        type: 'areaspline',
					backgroundColor: '#fff',
					
			    },				
			    title: {
			        text: 'Liquidity',
					style: {
						color: '#259F76',
					}
			    },
			    xAxis: {
			        type: 'datetime',
					lineColor: '#ffffff',
			    },
			    yAxis: {
			        min: 0,
			        title: {
			          text: 'Liquidity',
			          align: 'high'
			        },
					gridLineColor: '#ffffff'
			    },
			    legend: {
			        enabled: false
			    },
			    tooltip: {
			        valueSuffix: '',
			        valueDecimals: 4
			    },

	       // tooltip: {
	       //      valueSuffix: ' millions',
	       //      crosshairs: [true,true],
	       //      formatter: function() {
	       //          var s = '<b>'+ this.x +'</b>';
	                
	       //          $.each(this.points, function(i, point) {
	       //              s += '<br/>'+ point.series.name +': '+
	       //                  point.y +'m';
	       //          });
	       //          $("#left").html(s);
	       //          return false;
	       //      },
	       //      shared: true
	       //  },
		        plotOptions: {
		        	bar: {
		          		dataLabels: {
		            		enabled: true
		          		}
		        	},
					series: {
						color: '#259F76'
					}
		    	},
	      		credits: {
	       			enabled: false
	      		},
	      		series: [
	      			{
	                	type: 'areaspline',
	                	name: '',
	                	data: this.coinLiqudityArr,
	               		// visible: false
	            	}
	            ]
	      	});
	   	});    
	}

}
