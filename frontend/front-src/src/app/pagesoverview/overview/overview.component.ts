import { Component, OnInit,ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataService } from 'src/app/common/services/api/data.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

 	Search = "";

	tokensSno:any;
  	tokenArray:any=[];
  	volumearr:any=[];
  	liqudityArr:any=[];
  	collectionData = { count: 0, data: [] };
  	tokenSort: any = {dir: "desc", prop: "modified_date"};
	recordShow:Boolean=false;

  	pairsSno:any;
  	pairArray:any=[];
  	collection1Data = { count: 0, data: [] };
  	pairSort: any = {dir: "desc", prop: "modified_date"};
  	recordShow1:Boolean=false;

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

  	finaldays;

  	constructor(private uichange:UichangeService,private dataservice:DataService) {
  		this.tokensSno = {
	      	totalItems   : this.collectionData.count,
	      	itemsPerPage : 10,
	      	currentPage  : 1,
	    } 
	    this.pairsSno = {
	      	totalItems   : this.collection1Data.count,
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

  	filterFnc(value) {
      	this.tokensSno.currentPage = 1;
      	this.addSno.currentPage = 1;
      	this.removeSno.currentPage = 1;
      	this.swapSno.currentPage = 1;
      	this.pairsSno.currentPage = 1;
      	this.allSno.currentPage = 1;
      	this.Search = value;
      	this.getTopttokens();
      	this.getToppair();
      	this.getSwap();
	    this.getAdd();
	    this.getRemove();
	    this.getAll();
    }

	ngOnInit() {
		this.barChartPopulation(); 
	    this.getTopttokens();
	    this.getToppair();
	    this.getSwap();
	    this.getAdd();
	    this.getRemove();
	    this.getAll();
	}


	barChartPopulation() {
	  	this.dataservice.getUrl('chart/chart_liqudity').subscribe((result:any)=>{
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
	     
	    this.dataservice.getUrl('chart/chart_volume').subscribe((result:any)=>{
	      
	     	this.volumearr = result.result;
	     	HighCharts.chart('highcharts1', {
	      		chart: {
	        		type: 'areaspline',
					backgroundColor: '#fff',
	      		},
	      		title: {
	        		text: 'Volume',
					style: {
						color: '#259F76',
					}
	      		},
	      		xAxis: {
	        		type: 'datetime',
					lineColor: '#ffffff'
	      		},
	      		yAxis: {
	        		min: 0,
	        		title: {
	          			text: 'Volume',
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
	                	data: this.volumearr
	            	}
	            ]
	        });
	    });   
	}


	getToppair(){
		this.uichange.changebackground();
	    var pairConfig = {
	      size:this.pairsSno.itemsPerPage,
	      pageNumber:this.pairsSno.currentPage,
	      totalItems:this.collection1Data.count
	    }
	  	var pairResult = {"page":pairConfig,"sorting":this.pairSort,"search": this.Search};
	    this.dataservice.postUrl('chart/chartpair_data',pairResult).subscribe((result:any)=>{  
	      this.recordShow=true;
	      this.pairsSno.totalItems = result.paircount;
	      this.pairArray = result.data;
	    });
  	}

	getTopttokens(){
	    var tokenRes = {
	      size:this.tokensSno.itemsPerPage,
	      pageNumber:this.tokensSno.currentPage,
	      totalItems:this.collectionData.count
	    }
	    var lstinput = {"page":tokenRes,"sorting":this.tokenSort,"search": this.Search};
	    this.dataservice.postUrl('chart/charttoken_data',lstinput).subscribe((result:any)=>{         
	        this.recordShow1=true;
	        this.tokensSno.totalItems = result.tokencount;
	      	this.tokenArray = result.data;
	      	// this.uichange.clearbackground(); 
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
	      	// this.uichange.clearbackground(); 
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
	      	// this.uichange.clearbackground(); 
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
	      	// this.uichange.clearbackground(); 
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
    openaddress_explorer(passAddress){
    	let address_exp_url = environment.explorerlink+"address/"+passAddress;
      	window.open(address_exp_url, "_blank");
    }
	//open exporer

	
}
