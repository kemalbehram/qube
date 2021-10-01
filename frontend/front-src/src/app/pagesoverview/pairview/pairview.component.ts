import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/common/services/api/data.service';
import { CommonService } from 'src/app/common/services/common/common.service';
import { CommonContractService } from 'src/app/common/services/metamask/common-contract/common-contract.service';
import { CommonMetamaskService } from 'src/app/common/services/metamask/common/common-metamask.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';

import { ContractDetails } from "src/assets/files/contract";
import { LiqudityService } from 'src/app/common/services/metamask/liqudity/liqudity.service';
import { SwapService } from 'src/app/common/services/metamask/swap/swap.service';
import { PairAbi } from "src/assets/files/pair_abi";
import { RouterAbi } from "src/assets/files/router_abi";

import * as HighCharts from 'highcharts';

declare let window: any;
let wethaddress = ContractDetails.WBNB_contract;

@Component({
  selector: 'app-pairview',
  templateUrl: './pairview.component.html',
  styleUrls: ['./pairview.component.scss']
})
export class PairviewComponent implements OnInit {
	@Output() pairview = new EventEmitter();
	pairAddress="";
	pairHistory:any={};
	poolDetails:any={};
	pair="";
	Search = "";
	liqudityArr:any=[];
	swapSno:any;
	swapArray:any=[];
  	swapData = { count: 0, data: [] };
  	swapSort: any = {dir: "desc", prop: "createddate"};
  	swaptotal:any=0;

  	Favtoken =false;
  	PairsArr:any=[];

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

  	constructor(private activateRoute:ActivatedRoute,public swapservice: SwapService,private liqudityservice:LiqudityService,private uichange:UichangeService,private commonmetamaskservice:CommonMetamaskService,private commoncontractservice:CommonContractService,private commonservice:CommonService,private dataservice:DataService,private router:Router) { 
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
  			this.pairAddress=params.id;
		    this.getPairDetails();
		}else{
  			this.router.navigate(['/accounts']);
  		}
    })
  }

  async getPairDetails(){
  	var obj1={
	  "pair_address":this.pairAddress
	}
	await this.dataservice.postUrl('chart/getOnePair',obj1).subscribe((resData:any) => {
	  	if(resData.status) {
		    let resPoolData 	= resData.data;
		    this.pairHistory 	= resPoolData;
		    this.pair 	= resPoolData.pair;
		    this.PairsArr = JSON.parse(localStorage.getItem("PairFAv"));
		    if(this.PairsArr){
			    if(this.PairsArr.indexOf(this.pair)>=0){
			    	this.Favtoken=true;
			    }
			}
		    this.managePairs(this.pairHistory)
		    this.PairFromTo();
		    this.barChartPopulation(this.pair); 
		    this.getRemove();
		    this.getSwap();
		    this.getAdd();
		    this.getAll();
		    if(this.pairHistory.fromCurrency=="ETH"){
		    	this.pairHistory.fromCurrency_address=wethaddress;
		    }
		    if(this.pairHistory.toCurrency=="ETH"){
		    	this.pairHistory.toCurrency_address=wethaddress;

		    }
	  	}else{
	  		this.pairHistory 	= {};
	  	}
	});
  }


  	async managePairs(pairDetails){
		// console.clear();
		this.uichange.changebackground();
        // new 
		this.liqudityservice.InfoReserves(pairDetails.pair_address,PairAbi,pairDetails).then(async(result)=>{
			if(result.status) {
				let from_amount 			= result.from_amount;
				let to_amount 				= result.to_amount;
				if(pairDetails.fromCurrency_decimal == "18"){
					this.poolDetails.fromCurrency   =  window.web3.utils.fromWei(from_amount.toString(), 'ether');
				} else {
					let decimal             = Math.pow(10, pairDetails.fromCurrency_decimal);
					this.poolDetails.fromCurrency  = from_amount / decimal;
				}
				if(pairDetails.toCurrency_decimal == "18"){
					this.poolDetails.toCurrency    =  window.web3.utils.fromWei(to_amount.toString(), 'ether');
				} else {
					let decimal             = Math.pow(10, pairDetails.toCurrency_decimal);
					this.poolDetails.toCurrency     = to_amount / decimal;
				}
				this.commonmetamaskservice.GetTotalSupply(pairDetails.pair_address,PairAbi).then(async(result)=>{
					if(result.status){
			            this.poolDetails.totalShare =result.totalsupply
					} 
				}).catch((error)=>{
					console.log("Error",error)
				});
				// this.uichange.clearbackground();
			} else {
				// this.uichange.clearbackground();
			}
		}).catch((error)=>{
			this.uichange.clearbackground();
		});
			// get reserves value	
	        // new
    }

    async PairFromTo(){
    	let amount_value 			= 1;
    	let amountIn;
    	if(this.pairHistory.toCurrency_type=="token" &&this.pairHistory.fromCurrency_type=="token"){
    		var path_f                	= [this.pairHistory.fromCurrency_address,this.pairHistory.toCurrency_address]; // array values
			var path_s                	= [this.pairHistory.toCurrency_address,this.pairHistory.fromCurrency_address]; // array values
    	}else{
    		var path_f     			= [wethaddress,this.pairHistory.fromCurrency_address]; // array values
			var path_s     			= [this.pairHistory.fromCurrency_address,wethaddress]; // array values
    	}   
    	if(this.pairHistory.fromCurrency_decimal=="18") {
	      amountIn 	= window.web3.utils.toWei(amount_value.toString(), 'ether');
	    } else {
	      let decimal             			= Math.pow(10, this.pairHistory.fromCurrency_decimal);
		  amountIn  = (amount_value * decimal).toFixed(4);
		}

		await this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountIn,path_f).then(async(result)=>{
			if(result.status) {
				if(this.pairHistory.toCurrency_decimal=="18") {
					this.poolDetails.Equalto_amount 	= (result.resultamount[1]/1000000000000000000).toFixed(4);
				} else {
					let decimal             			= Math.pow(10, this.pairHistory.toCurrency_decimal);
					this.poolDetails.Equalto_amount   	= (result.resultamount[1] / decimal).toFixed(4);
				}
			} else {
				// this.pricePoolShare.to_amount 		= 0.0000;
		  	}
		}).catch((error)=>{
		  	// this.pricePoolShare.to_amount = (0).toFixed(4);
		});

		await this.swapservice.getAmountsOut(ContractDetails.router_contract,RouterAbi,amountIn,path_s).then(async(result)=>{
			if(result.status) {
				if(this.pairHistory.fromCurrency_decimal=="18") {
					this.poolDetails.Equalfrom_amount 	= (result.resultamount[1]/1000000000000000000).toFixed(4);
				} else {
					let decimal             			= Math.pow(10, this.pairHistory.fromCurrency_decimal);
					this.poolDetails.Equalfrom_amount   	= (result.resultamount[1] / decimal).toFixed(4);
				}
				// console.log("this.pricePoolShare.to_amount ---->",this.pricePoolShare.to_amount);
			} else {
				// this.pricePoolShare.to_amount 		= 0.0000;
		  	}
		}).catch((error)=>{
		  	// this.pricePoolShare.to_amount = (0).toFixed(4);
		});
    }

    // copy 
	    copyvalue(data){
	      var textArea = document.createElement("textarea");
	      if(data=='fromC'){
	      	textArea.value = this.pairHistory.fromCurrency_address;
	      }else if(data=='toC'){
	      	textArea.value = this.pairHistory.toCurrency_address;
	      }else{
	      	textArea.value = this.pairAddress;
	      }
	      
	      document.body.appendChild(textArea);
	      textArea.select();
	      document.execCommand("Copy");
	      textArea.remove();
	      this.commonservice.alertmessage("success", 'Copied ');
	    }
	// copy 


	getSwap(){
		this.uichange.changebackground();
	    var swapRes = {
	      size:this.swapSno.itemsPerPage,
	      pageNumber:this.swapSno.currentPage,
	      totalItems:this.swapData.count
	    }
	    var lstinput = {pair:this.pair,"page":swapRes,"sorting":this.swapSort,"search": this.Search};
	    this.dataservice.postUrl('accounts/accountSwapData',lstinput).subscribe((result:any)=>{         
	        this.swapSno.totalItems = result.swapcount;
	      	this.swapArray = result.data;
	      	this.swaptotal = result.Totalswapvalue;
	      	// this.uichange.clearbackground(); 
	    });
  	}

  	getAdd(){
  		var addRes = {
	      size:this.addSno.itemsPerPage,
	      pageNumber:this.addSno.currentPage,
	      totalItems:this.addData.count
	    }
	    var lstinput = {pair:this.pair,"page":addRes,"sorting":this.addSort,"search": this.Search};
	    this.dataservice.postUrl('accounts/accountAddData',lstinput).subscribe((result:any)=>{         
	        this.addSno.totalItems = result.addcount;
	      	this.addArray = result.data;
	      	// this.uichange.clearbackground(); 
	    });
  	}

  	getRemove(){
  		var removeRes = {
	      size:this.removeSno.itemsPerPage,
	      pageNumber:this.removeSno.currentPage,
	      totalItems:this.removeData.count
	    }
	    var lstinput = {pair:this.pair,"page":removeRes,"sorting":this.removeSort,"search": this.Search};
	    this.dataservice.postUrl('accounts/accountRemData',lstinput).subscribe((result:any)=>{         
	        this.removeSno.totalItems = result.removecount;
	      	this.removeArray = result.data;
	      	// this.uichange.clearbackground(); 
	    });
  	}

  	getAll(){
  		var allRes = {
	      size:this.allSno.itemsPerPage,
	      pageNumber:this.allSno.currentPage,
	      totalItems:this.allData.count
	    }
	    var lstinput = {pair:this.pair,"page":allRes,"sorting":this.allSort,"search": this.Search};
	    this.dataservice.postUrl('accounts/accountAllData',lstinput).subscribe(async (result:any)=>{         
	        this.allSno.totalItems = result.currencycount;
	      	await result.data.map(async item=>{
	      		let pairsVal=item.pair.split("_")
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
	      			item.type="Remove "+item.fromCurrency+" and "+item.toCurrency
	      		}
	      	})
	      	setTimeout(() => {
	        	this.allArray = result.data;
	        	this.uichange.clearbackground();
	    	}, 2000);
	    });
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
          	let array = this.PairsArr
          	if(array== null){
            	localStorage.setItem("PairFAv", JSON.stringify([this.pair]));
          	}else if(array.indexOf(this.pair)==-1){
            	array.push(this.pair)
            	localStorage.setItem("PairFAv", JSON.stringify(array));
            	this.PairsArr =array;
            	this.pairview.emit(array)
        	}
        	this.Favtoken=true;
    	}else{
			let array = this.PairsArr
	        let inDex = array.indexOf(this.pair)
	        array.splice(inDex,1)
		    localStorage.setItem("PairFAv", JSON.stringify(array));
		    this.PairsArr =array;
		    this.Favtoken=false;
		    this.pairview.emit(array)
    	}
    }

    barChartPopulation(pairVal:any) {
	  	this.dataservice.postUrl('chart/chart_Pairliqudity',{"pair":pairVal}).subscribe((result:any)=>{
	    	this.liqudityArr = result.result;
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
	                	data: this.liqudityArr,
	               		// visible: false
	            	}
	            ]
	      	});
	   	});  
	     
	     }

 //    timedif(d:any) {      
 //    	let currentDate = new Date(new Date().toUTCString());
	//     let date = new Date(d);
	//     let year = currentDate.getFullYear() - date.getFullYear();
	//     let month = currentDate.getMonth() - date.getMonth();
	//     let day = currentDate.getDate() - date.getDate();
	//     let hour = currentDate.getHours() - date.getHours();
	//     let minute = currentDate.getMinutes() - date.getMinutes();
	//     let second = currentDate.getSeconds() - date.getSeconds();
		
	//     let createdSecond = (year * 31556926) + (month * 2629746) + (day * 86400) + (hour * 3600) + (minute * 60) + second;
	//     if (createdSecond >= 31556926) {
	//       let yearAgo = Math.floor(createdSecond / 31556926);
	//       return yearAgo > 1 ? yearAgo + " years ago" : yearAgo + " year ago";
	//     } else if (createdSecond >= 2629746) {
	//       let monthAgo = Math.floor(createdSecond / 2629746);
	//       return monthAgo > 1 ? monthAgo + " months ago" : monthAgo + " month ago";
	//     } else if (createdSecond >= 86400) {
	//       let dayAgo = Math.floor(createdSecond / 86400);
	//       return dayAgo > 1 ? dayAgo + " days ago" : dayAgo + " day ago";
	//     } else if (createdSecond >= 3600) {
	//       let hourAgo = Math.floor(createdSecond / 3600);
	//       return hourAgo > 1 ? hourAgo + " hours ago" : hourAgo + " hour ago";
	//     } else if (createdSecond >= 60) {
	//       let minuteAgo = Math.floor(createdSecond / 60);
	//       return minuteAgo > 1 ? minuteAgo + " minutes ago" : minuteAgo + " minute ago";
	//     } else if (createdSecond < 60) {
	//       return createdSecond > 1 ? createdSecond + " seconds ago" : createdSecond + " second ago";
	//     } else if (createdSecond < 0) {
	//       return "0 second ago";
	//     }
	// }

	//open exporer
    openaddress_explorer(passAddress){
    	let address_exp_url = environment.explorerlink+"address/"+passAddress;
      	window.open(address_exp_url, "_blank");
    }
	//open exporer
}
