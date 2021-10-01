import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from '../../common.service';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { NgbModal, ModalDismissReasons,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-userhistory',
  templateUrl: './userhistory.component.html',
  styleUrls: ['./userhistory.component.scss']
})
export class UserhistoryComponent implements OnInit {

  @ViewChild(DatatableComponent,{static: false}) usertable:DatatableComponent;
// symbol=[{1},{2}]
// symbol:any[]=[1,2];
   fcurrency = "";
  symbol=[
    {
       "values":1,
       "symbolval":"+(Plus)",
      
    },
    {
       "values":2,
       "symbolval":"-(Minus)"
    }
    ]
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
serviceHost=environment.BackendHost;
environment = environment;
table_loader:Boolean = false; 

isNumberKey(event){
      // const charCode = (event.which) ? event.which : event.keyCode;
 const charCode = (event.which) ? event.which : event.keyCode

 if ((charCode > 34 && charCode < 41) || (charCode > 47 && charCode < 58) || (charCode == 46) || (charCode == 8) || (charCode == 9))
 {
  return true;
 }
  return false;
 
 
}

  constructor(private toastr: ToastrManager,private modalService: NgbModal, private CommonService: CommonService,private cookieService: CookieService,private http:Http) {
    //login check
      this.CommonService.sessioncheck();
      this.CommonService.ipcheck();
    //login check
  	this.loadpairs();
   }

  ngOnInit() {
  }
loadpairs(){
  this.table_loader = true;
var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
this.loading = true;
this.CommonService.requestData('harvest/harvestlist',lstinput)
.subscribe(resData => {
  this.page.totalElements = resData.holderscount;
  this.page.totalPages = this.page.totalElements / this.page.size;
  // this.userlist = resData.data;
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
      // this.CommonService.requestData('admin/pairslist',lstinput)
      // .subscribe(resData => {
        this.userlist = this.userlist;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
      // });
    }
//drop down of number
   	changeRowLimits(event) {
      // this.userlist = [];
      // this.usertemp = this.userlist;
      // this.userrows = this.userlist;
      this.page.size = (+event.target.value);
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

      this.loaduserlist(this.page,this.defsort,this.defsearch);
      // this.loading = true;
      // this.CommonService.requestData('admin/pairslist',lstinput)
      // .subscribe(resData => {
      //   this.page.totalElements = resData.currencycount;
      //   this.page.totalPages = this.page.totalElements / this.page.size;
      //   this.userlist = resData.data;
      //   this.usertemp = this.userlist;
      //   this.userrows = this.userlist;
      //   this.loading = false;
      // });

    }

//filter of search
  updateFilter() {
      this.loading = true;
      var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
      this.CommonService.requestData('admin/pairslist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.currencycount;
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
edithostlist = {"total_amt":"","_id": "","pair":"","buylimit":"","buylimitvalue":"","buyrate":"","selllimit":"","selllimitvalue":"","sellrate":"","marketPrice":"","max_amt":"","fee":"","fee_type":"","min_amt":""};

   // editIndex = -1;
   openeditmodel(content,bannerrow) {
      // this.editIndex = bannerrow.$index;
      var pair_details = bannerrow.pair.split('/');
      this.fcurrency   = pair_details[0];

      this.edithostlist = {"total_amt":bannerrow.total_amt,"_id": bannerrow._id,"pair": bannerrow.pair,"buylimit": bannerrow.buylimit,"buylimitvalue": bannerrow.buylimitvalue,"buyrate":bannerrow.buyrate,"selllimit":bannerrow.selllimit,"selllimitvalue":bannerrow.selllimitvalue,"sellrate":bannerrow.sellrate,"marketPrice":bannerrow.marketPrice,"max_amt":bannerrow.max_amt,"fee":bannerrow.fee,"fee_type":bannerrow.fee_type,"min_amt":bannerrow.min_amt};
      this.modalRef = this.modalService.open(content,{size:'lg'});
     
   }
buycalculation(edithostlist){
  var percentvalue=(edithostlist.marketPrice*edithostlist.buylimitvalue)/100
  if(edithostlist.buylimit=="plus"){
    var fa=edithostlist.marketPrice+percentvalue
    // edithostlist.buyrate=this.decimalrounds(fa,4)
    edithostlist.buyrate=fa
  }
  else if(edithostlist.buylimit=="minus"){
    var fb=(edithostlist.marketPrice)-(percentvalue)
    // edithostlist.buyrate=this.decimalrounds(fb,4)
    edithostlist.buyrate=fb
  }
}

 sellcalculation(edithostlist){
  var pervalue=(edithostlist.marketPrice*edithostlist.selllimitvalue)/100
    if(edithostlist.selllimit=="plus"){
     var sb= edithostlist.marketPrice+pervalue
     // edithostlist.sellrate=this.decimalrounds(sb,4)
     edithostlist.sellrate=sb
  }
  else if(edithostlist.selllimit=="minus"){
    var sc=(edithostlist.marketPrice)-(pervalue)
    // edithostlist.sellrate=this.decimalrounds(sc,4)
    edithostlist.sellrate=sc
  }
}
buyratecalculation(edithostlist){
  var ratevalue=(edithostlist.marketPrice*edithostlist.buylimitvalue)/100
  if(edithostlist.buylimit=="plus"){
     var b= edithostlist.marketPrice+ratevalue
     edithostlist.buyrate=b
  }
  else if(edithostlist.buylimit=="minus"){
    var c=(edithostlist.marketPrice)-(ratevalue)
    // edithostlist.buyrate=this.decimalrounds(c,4)
    edithostlist.buyrate=c
  }
  
   }
   sellratecalculation(edithostlist){
    var sellratevalue=(edithostlist.marketPrice*edithostlist.selllimitvalue)/100
    if(edithostlist.selllimit=="plus"){
     var cb= edithostlist.marketPrice+sellratevalue
     // edithostlist.sellrate=this.decimalrounds(cb,4)
     edithostlist.sellrate=cb
  }
  else if(edithostlist.selllimit=="minus"){
    var cc=(edithostlist.marketPrice)-(sellratevalue)
    // edithostlist.sellrate=this.decimalrounds(cc,4)
    edithostlist.sellrate=cc
  }
   }
submitted:boolean=false;

editpairs(pairsform){
this.submitted = true;

this.CommonService.requestData('admin/pairsupdate',this.edithostlist).subscribe(resData=>{
if(resData.status==true){
this.toastr.successToastr('Pairs field updated','Success');
this.modalRef.close();
this.loadpairs();
}
else{
this.toastr.errorToastr('While updating','Error');
}
});
}
 bannersvalue = {};
  banner = "";
  changehost(content, bannerrow){

    this.bannersvalue = bannerrow;
    // this.bannerindx = bannerrow.$$index;
     this.modalRef = this.modalService.open(content,{size:'sm'});
      //   this.modalRef.result.then((result) => {
      //      this.closeResult = `Closed with: ${result}`;
      //   }, (reason) => {
      //      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // });
  }
  changebannerStatus(bannersvalue) {
         if(bannersvalue.status == "Active"){
        this.bannersvalue = "Deactive";
      }
      else{
        this.bannersvalue = "Active";
      }
      
      this.currencyObj = {"_id":bannersvalue._id,"status": this.bannersvalue};
      this.CommonService.requestData('admin/pairsstatus', this.currencyObj).subscribe(resData => {
        if(resData)
        {
          this.toastr.successToastr('Pair status changed Successfully!', 'Success');
      if(this.cookieService.get('role') == 'admin'){
        this. loadpairs();
           
      }
      else{
          this. loadpairs();
          
      }
      }
      else{
           this. loadpairs();
      }
      })
  }
   decimalrounds(value, length) {
        return this.CommonService.testrounds(+value, length);
  };


  // filters results
    // filterDatatable(event){
    //   console.clear();
    //   // get the value of the key pressed and make it lowercase
    //   // let val = event.target.value.toLowerCase();
    //   let val = this.defsearch;
    //   // get the amount of columns in the table
    //   // let colsAmt = this.cols.length;
    //   let colsAmt = this.page.totalElements;
    //   // get the key names of each column in the dataset
    //   let keys = Object.keys(this.userrows[0]);
    //   // assign filtered matches to the active datatable
    //   this.userrows = this.userrows.filter(function(item){
    //     // iterate through each row's column data
    //     for (let i=0; i<colsAmt; i++){
    //       // check for a match
    //       if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val){
    //         // found match, return true to add to result set
    //         return true;
    //       }
    //     }
    //   });
    //   // whenever the filter changes, always go back to the first page
    //   this.table.offset = 0;
    // }

    filterDatatable() {
      console.clear();
      let val = this.defsearch;
      const value = val.toString().toLowerCase().trim();
      // get the amount of columns in the table
      // const count = this.columns.length;
      const count = 10;
      // get the key names of each column in the dataset
      const keys = Object.keys(this.usertemp[0]);
      // assign filtered matches to the active datatable
      this.userrows = this.usertemp.filter(item => {
        // iterate through each row's column data
        for (let i = 0; i < count; i++) {
          // check for a match
          if (
            (item[keys[i]] &&
              item[keys[i]]
                .toString()
                .toLowerCase()
                .indexOf(value) !== -1) ||
            !value
          ) {
            // found match, return true to add to result set
            return true;
          }
        }
      });

      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
    }

}