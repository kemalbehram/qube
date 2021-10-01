import { Component, OnInit,ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataService } from 'src/app/common/services/api/data.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';
import { AuthmetamaskService } from 'src/app/common/services/metamask/auth/authmetamask.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

	searchText="";
  	Search = "";
    address_value:any=[];
	liquiSno:any;
  	liquiArray:any=[];
  	liquiData = { count: 0, data: [] };
  	liquiSort: any = {dir: "desc", prop: "modified_date"};
    explorerlink=environment.explorerlink;
  constructor(private router:Router,private uichange:UichangeService,private dataservice:DataService,private authmetamaskservice:AuthmetamaskService) { 
  	this.liquiSno = {
      	totalItems   : this.liquiData.count,
      	itemsPerPage : 10,
      	currentPage  : 1,
    } 
  }	

  	ngOnInit() {
      this.address_value = JSON.parse(localStorage.getItem("MLoadadd"));
  		this.getLiquidity();
  	}

    isAddress(){
      this.authmetamaskservice.isAddressCheck(this.searchText).then(async(result)=>{
        if(result.status) {
          let text=this.searchText
          let Ad =text.toLowerCase();
          let array = this.address_value
          if(array== null){
            localStorage.setItem("MLoadadd", JSON.stringify([Ad]));
            this.router.navigate(['accountsview/'+this.searchText]);
          }else if(array.indexOf(Ad)==-1){
            array.push(Ad)
            localStorage.setItem("MLoadadd", JSON.stringify(array));
            this.address_value =array;
            this.router.navigate(['accountsview/'+Ad]);            
          }else{
            this.router.navigate(['accountsview/'+Ad]);
          }       
        } 
      })
    }
    
    filterFnc(value) {
      this.liquiSno.currentPage = 1;
      this.Search = value;
      this.getLiquidity();
    }

  	getLiquidity(){
      this.uichange.changebackground();
	    var liquiRes = {
	      size:this.liquiSno.itemsPerPage,
	      pageNumber:this.liquiSno.currentPage,
	      totalItems:this.liquiData.count
	    }
	    var lstinput = {"page":liquiRes,"sorting":this.liquiSort,"search": this.Search};
	    this.dataservice.postUrl('accounts/userAcountData',lstinput).subscribe((result:any)=>{      
	        this.liquiSno.totalItems = result.tokencount;
	      	this.liquiArray = result.data;
	      	this.uichange.clearbackground(); 
	    });
  	}

    //open exporer
      openaddress_explorer(Metamask_address){
        let address_exp_url = environment.explorerlink+"address/"+Metamask_address;
        window.open(address_exp_url, "_blank");
      }
    //open exporer

  	 allpageChanged(allevent){
    	this.liquiSno.currentPage = allevent;
	    this.getLiquidity();
    }

    RemoveLoad(item){
      let array = this.address_value
      let inDex = array.indexOf(item)
      array.splice(inDex,1)
      localStorage.setItem("MLoadadd", JSON.stringify(array));
      this.address_value =array;
    }

}
