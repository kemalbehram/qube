import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from '../../common.service';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { NgbModal, ModalDismissReasons,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
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
  deposit:any={};
  withdraw_cancel:any={};
  environment = environment;
  table_loader:Boolean = false; 

  // reasons_withdraw:any={};
  constructor(private toastr: ToastrManager,private modalService: NgbModal, private CommonService: CommonService,private cookieService: CookieService,private http:Http,private router: Router) {
    // this.router.navigate(['/GAM23dIXa1aZ/dashboard']);
    var usersrchval = localStorage.srchval;
     if(usersrchval == undefined || usersrchval == ''){
         this.defsearch = "";
      }
      else{
        if(usersrchval == "Fait_withdraw_count"){
          this.defsearch = "pending";
        }
        
     }
   }

  ngOnInit() {
    //login check
      this.CommonService.sessioncheck();
      this.CommonService.ipcheck();
    //login check
    this.loadwithdraw();
  }
loadwithdraw(){
   this.table_loader = true;
	var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
this.loading = true;
this.CommonService.requestData('withdraw/withdrawlist',lstinput)
.subscribe(resData => {
  localStorage.removeItem('srchval');
  this.page.totalElements = resData.holderscount;
  this.page.totalPages = this.page.totalElements / this.page.size;
  this.userlist = resData.data;
  this.usertemp = this.userlist;
  this.userrows = this.userlist;
  this.loading = false;
  this.table_loader = false;
});
}
loaduserlist(page,sort,search){
      this.loading = true;
      var lstinput = {"page":page,"sorting":sort,"search":search};
      this.CommonService.requestData('withdraw/withdrawlist',lstinput)
      .subscribe(resData => {
        this.userlist = resData.data;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
      });
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
      this.CommonService.requestData('withdraw/withdrawlist',lstinput)
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
      this.loading = true;
      var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
      this.CommonService.requestData('withdraw/withdrawlist',lstinput)
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
//edit pop up display
   edithostlist = {"transit_no":"","holder_bankwire":"","bankwire_swift":"","bankwire_branch":"","account_holder_name":"","imps_branch":"","imps_ifsc":"","bankwire_bank":"","imps_bank":"","upi":"","accnum_bankwire":"","accnum_imps":"","phone":"","_id": "","pay_emailid":"","username":"","currencyname":"","feeamt":"","receive_amount":"","created_date":"","totalamount":"","emailid":"","user_id":"","currencyid":"","status":"","Fee_type":"","payment_type":"","currencytype":""};

   // editIndex = -1;
}
