import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CommonService } from '../../common.service';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-lending',
  templateUrl: './lending.component.html',
  styleUrls: ['./lending.component.scss']
})
export class LendingComponent implements OnInit {
@ViewChild(DatatableComponent,{static: false}) usertable:DatatableComponent;
userrows = [];
	userlist = [];
 	usertemp = [];
	limits = [
	  { key: '10', value: 10 },
	  { key: '25', value: 25 },
	  { key: '50', value: 50 },
	  { key: '100', value: 100 }
	];
	limit: number = this.limits[0].value;
	page = {
	  size: this.limits[0].value,totalElements:0,totalPages:0,pageNumber:0
	}
  	defsort: any = {dir: "desc", prop: "created_date"};
	defsearch = "";
 	loading: boolean = false;
 	rowLimits: Array<any> = this.limits;
 	table_loader:Boolean = false; 
 	dataLoader:Boolean=false;

  	constructor(private CommonService: CommonService,private cookieService: CookieService,private http:Http) { }

  	ngOnInit() {
  		this.loadcms()
  	}

	//drop down of number
	changeRowLimits(event) {
      this.userlist = [];
      this.usertemp = this.userlist;
      this.userrows = this.userlist;
      this.page.size = +event.target.value;
      this.page.pageNumber = 0;
      this.usertable.limit = event.target.value;
      this.loaduserlist(this.page,this.defsort,this.defsearch);
    }

	//refresh 
    resetuserlist(){
      this.limits = [
        { key: '10', value: 10 },
        { key: '25', value: 25 },
        { key: '50', value: 50 },
        { key: '100', value: 100 }
      ];

      this.limit = this.limits[0].value;
      this.rowLimits = this.limits;

      this.page = {
        size: this.limits[0].value,totalElements:0,totalPages:0,pageNumber:0
      }
      this.defsort = {dir: "desc", prop: "created_date"};
      this.defsearch = "";

      var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
      this.loading = true;
      this.CommonService.requestData('lending/lending_list',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.datacount;
        this.page.totalPages = this.page.totalElements / this.page.size;
        this.userlist = resData.data;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
      });
    }

	//filter of search
  	updateFilter() {
      this.loading = true;
      var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
      this.CommonService.requestData('lending/lending_list',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.datacount;
        this.page.totalPages = this.page.totalElements / this.page.size;
        this.userlist = resData.data;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
      });
    }

	//page limit in table
    setPage(pageInfo){
      	this.userlist=[];
	    this.usertemp = this.userlist;
	    this.userrows = this.userlist;
      	this.page.pageNumber = pageInfo.offset;
      	this.loaduserlist(this.page,this.defsort,this.defsearch);
    }

   	onSort(event) {
      this.page.pageNumber = 0;
      this.defsort = event.sorts[0];
      this.loaduserlist(this.page,this.defsort,this.defsearch);
    }
  	loadcms(){
  		this.table_loader = true;
  		this.dataLoader = true;
		var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
		this.loading = true;
		this.CommonService.requestData('lending/lending_list',lstinput)
		.subscribe(resData => {
		  	this.page.totalElements = resData.datacount;
		  	this.page.totalPages = this.page.totalElements / this.page.size;
		  	this.userlist = resData.data;
		  	this.usertemp = this.userlist;
		  	this.userrows = this.userlist;
		  	this.loading = false;
		  	this.table_loader = false;
		  	this.dataLoader = false;
		});

		
}
    loaduserlist(page,sort,search){
      this.loading = true;
      var lstinput = {"page":page,"sorting":sort,"search":search};
      this.CommonService.requestData('lending/lending_list',lstinput)
      .subscribe(resData => {
        this.userlist = resData.data;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
      });
    }


}
