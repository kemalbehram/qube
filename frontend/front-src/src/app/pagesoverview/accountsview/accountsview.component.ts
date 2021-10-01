import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/common/services/api/data.service';
import { CommonService } from 'src/app/common/services/common/common.service';
import { CommonContractService } from 'src/app/common/services/metamask/common-contract/common-contract.service';
import { CommonMetamaskService } from 'src/app/common/services/metamask/common/common-metamask.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';

import * as HighCharts from 'highcharts';

import { PairAbi } from "src/assets/files/pair_abi";
import * as _ from 'lodash'; 
declare let window: any;

@Component({
  selector: 'app-accountsview',
  templateUrl: './accountsview.component.html',
  styleUrls: ['./accountsview.component.scss']
})
export class AccountsviewComponent implements OnInit {
	positionRec={pair:"all"};
	passAddress:any="";
	liqudityArr:any=[];
	shoWREc=false;
	Search = "";
	userLpbalance:any=0.0000;
	swapSno:any;
	poolhistory=[];
  	swapArray:any=[];
  	swapData = { count: 0, data: [] };
  	swapSort: any = {dir: "desc", prop: "createddate"};
  	swaptotal:any=0;
  	
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

  	constructor(private activateRoute:ActivatedRoute,private uichange:UichangeService,private commonmetamaskservice:CommonMetamaskService,private commoncontractservice:CommonContractService,private commonservice:CommonService,private dataservice:DataService,private router:Router) { 
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
	  			this.passAddress=params.id
	  			this.shoWREc=true;
	  			this.getSwap();
			    this.getAdd();
			    // this.userLiquidity_Tot();
			    this.barChartPopulation({"user_address":this.passAddress}); 
			    this.get_pooldetails();
			    this.getRemove();
			    this.getAll();

	  		}else{
	  			this.router.navigate(['/accounts']);
	  		}
	    })
	}

    async get_pooldetails(){
		var obj1={
		  "address":this.passAddress.toLowerCase()
		}
		await this.dataservice.postUrl('pool/get_pooldetails',obj1).subscribe((resData:any) => {
		  	if(resData.status == true) {
			    let resPoolData 	= resData.data;
			    this.poolhistory 	=  _.uniqBy(resPoolData, 'pair');
			     this.poolhistory.map(async selpair=>{
		      		if(selpair.pair_address){
				      	await this.commoncontractservice.GetTokenbalance(selpair.pair_address,PairAbi,this.passAddress).then(async(result)=>{
				        	if(result.status) {
				        		selpair.Lppoints=result.balance;
				          		this.userLpbalance=parseFloat(this.userLpbalance) + parseFloat(result.balance);
			        			this.commonmetamaskservice.GetTotalSupply(selpair.pair_address,PairAbi).then(async(resultval)=>{
									if(result.status){
							            selpair.totalAmount =resultval.totalsupply
							            selpair.totalShare = ((result.balance/resultval.totalsupply) * 100);
							            var objval1={
										  "pair":selpair.pair
										}
							            await this.dataservice.postUrl('accounts/getPairDept',objval1).subscribe((resData:any) => {
							            	if(resData.status == true) {
							            		selpair.fromDept =resData.data[0].total
							            		selpair.toDept =resData.data[0].to_total
							            	}else{
							            		selpair.fromDept =0
							            		selpair.toDept =0
							            	}
							            })
									}else{
										selpair.totalShare =0
									} 
								}).catch((error)=>{
									selpair.totalShare =0
									console.log("Error",error)
								});
			        		}else{
			        			selpair.Lppoints=0	
			        		}
				      	}).catch((error)=>{
				      		selpair.Lppoints=0	
				        	console.log(error)
				      	});
				    }
			    })
		  	}else{
		  		this.poolhistory 	= [];
		  	}
		});
	}

	filterFncAccount(value) {
      	this.addSno.currentPage = 1;
      	this.removeSno.currentPage = 1;
      	this.swapSno.currentPage = 1;
      	this.allSno.currentPage = 1;
      	this.Search = value;
      	this.getSwap();
	    this.getAdd();
	    this.getRemove();
	    this.getAll();
    }

    //open exporer
    openaddress_explorer(){
    	let address_exp_url = environment.explorerlink+"/address/"+this.passAddress;
      	window.open(address_exp_url, "_blank");
    }
	//open exporer

	//open exporer
    openUseraddress_explorer(passAddress){
    	let address_exp_url = environment.explorerlink+"address/"+passAddress;
      	window.open(address_exp_url, "_blank");
    }
	//open exporer

		
	getSwap(){
		this.uichange.changebackground();
	    var swapRes = {
	      size:this.swapSno.itemsPerPage,
	      pageNumber:this.swapSno.currentPage,
	      totalItems:this.swapData.count
	    }
	    var lstinput = {userAddress:this.passAddress,"page":swapRes,"sorting":this.swapSort,"search": this.Search};
	    this.dataservice.postUrl('accounts/accountSwapData',lstinput).subscribe((result:any)=>{         
	        this.swapSno.totalItems = result.swapcount;
	      	this.swaptotal = result.Totalswapvalue;
	      	this.swapArray = result.data;
	      	
	      	// this.uichange.clearbackground(); 
	    });
  	}

  	getAdd(){
  		var addRes = {
	      size:this.addSno.itemsPerPage,
	      pageNumber:this.addSno.currentPage,
	      totalItems:this.addData.count
	    }
	    var lstinput = {user_address:this.passAddress.toLowerCase(),"page":addRes,"sorting":this.addSort,"search": this.Search};
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
	    var lstinput = {user_address:this.passAddress,"page":removeRes,"sorting":this.removeSort,"search": this.Search};
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
	    var lstinput = {user_address:this.passAddress,"page":allRes,"sorting":this.allSort,"search": this.Search};
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

  	PositionData(Data:any){
  		if(this.positionRec.pair=="all"){
  			this.barChartPopulation({user_address:this.passAddress});
  		}else{
  			this.barChartPopulation({pair:this.positionRec.pair,user_address:this.passAddress});
  		}
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


    barChartPopulation(pairVal:any) {
	  	this.dataservice.postUrl('chart/chart_Pairliqudity',pairVal).subscribe((result:any)=>{
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


}
