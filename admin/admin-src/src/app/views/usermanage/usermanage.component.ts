import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from '../../common.service';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { NgbModal, ModalDismissReasons,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.scss']
})
export class UsermanageComponent implements OnInit {
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
    page = {
      size: this.limits[0].value,totalElements:0,totalPages:0,pageNumber:0
    }
      defsort: any = {dir: "desc", prop: "created_date"};
    defsearch = "";
     loading: boolean = false;
     rowLimits: Array<any> = this.limits;
    limit: number = this.limits[0].value;
    viewuserdt={};
    useremail:any;
   modalRef: NgbModalRef;
   banner_Status
   currencyObj
   serviceHost=environment.BackendHost
   exchangelist={};
   tfauserid:any;
   userpopmail:any;
   closeResult: string;
   tfadisablereason:any;
  deposit:any={};
  environment=environment;
  textcnt:any=['Please upload','Please upload','Please upload']
  constructor(public socket: Socket,private toastr: ToastrManager,private modalService: NgbModal, private CommonService: CommonService,private cookieService: CookieService,private http:Http) {
    var usersrchval = localStorage.srchval;

      if(usersrchval == undefined || usersrchval == ''){
         this.defsearch = "";
      }
      else{
        if(usersrchval == "user_count"){
          this.defsearch = "";
        }
        else if(usersrchval == "activated_user"){
          this.defsearch = "active";
        }
        else if(usersrchval == "inactive_user"){
          this.defsearch = "deactive";
        
        }
        else if(usersrchval=="pending_kyc"){
          this.defsearch = "In progress";
        }
      
      }

  	
   }

  ngOnInit() {
    //login check
      this.CommonService.sessioncheck();
      this.CommonService.ipcheck();
    //login check
    this.loadcurrency();
    // this.userwholelist();
    // this.userwholelist1();
  }
  with_otp:boolean=false
  userwholelist(){
    this.CommonService.getData('deposit/depositlist').subscribe(resData=>{
      for(var i=0;i<resData.data.length;i++){
        // if(resData.data[i].withdraw_otp==true){
        //   this.whole_with=true
        // }
        // else{
        //   this.whole_with=false
        // }
      }
    })
  } userwholelist1(){
    this.CommonService.getData('deposit/depositlist').subscribe(resData=>{
      for(var i=0;i<resData.data.length;i++){
        // if(resData.data[i].Deposit_otp==true){
        //   this.whole_depo=true
        // }
        // else{
        //   this.whole_depo=false
        // }
      }
    })
  }
loadcurrency(){
var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
this.loading = true;

this.CommonService.requestData('deposit/depositlist',lstinput)
.subscribe(resData => {
  localStorage.removeItem('srchval');
  this.page.totalElements = resData.holderscount;
  this.page.totalPages = this.page.totalElements / this.page.size;
  this.userlist = resData.data;
  this.usertemp = this.userlist;
  this.userrows = this.userlist;
  this.loading = false;
});
}
loaduserlist(page,sort,search){

      this.loading = true;
      var lstinput = {"page":page,"sorting":sort,"search":search};
      this.CommonService.requestData('deposit/depositlist',lstinput)
      .subscribe(resData => {
        this.userlist = resData.data;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
      });
    }
//drop down of number
   changeRowLimits(event) {
    //login check
      this.CommonService.sessioncheck();
    //login check
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
    //login check
      this.CommonService.sessioncheck();
    //login check
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
    this.CommonService.requestData('deposit/depositlist',lstinput)
    .subscribe(resData => {
      this.page.totalElements = resData.holderscount;
      this.page.totalPages = this.page.totalElements / this.page.size;
      this.userlist = resData.data;
      this.usertemp = this.userlist;
      this.userrows = this.userlist;
      this.loading = false;
    });
  }

//filter of search
  updateFilter() {
    //login check
      this.CommonService.sessioncheck();
    //login check
      this.loading = true;
      var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
      this.CommonService.requestData('deposit/depositlist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.holderscount;
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
}
