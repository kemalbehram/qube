import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from '../../common.service';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { NgbModal, ModalDismissReasons,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { environment } from '../../../environments/environment';

import * as $ from 'jquery';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {
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
cmslist = [];
closeResult: string;
ckeConfig: any;
table_loader:Boolean = false;

  constructor(private toastr: ToastrManager,private modalService: NgbModal, private CommonService: CommonService,private cookieService: CookieService,private http:Http) {
    //login check
      this.CommonService.sessioncheck();
      this.CommonService.ipcheck();
    //login check
  	this.loadcms();
   }

   


  ngOnInit() {
     this.ckeConfig = {
      allowedContent: false,
      // extraPlugins: 'divarea,uploadimage',
      removeButtons: 'Source,Save,NewPage,DocProps,Preview,Print,Templates,document,Set language',
      forcePasteAsPlainText: true
    };
  }
loadcms(){
  this.table_loader = true;
	var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
this.loading = true;
this.CommonService.requestData('pool/remove_poollist',lstinput)
.subscribe(resData => {
  this.page.totalElements = resData.totalCount;
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
      this.CommonService.requestData('pool/remove_poollist',lstinput)
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
      this.CommonService.requestData('pool/remove_poollist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.totalCount;
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
      this.CommonService.requestData('pool/remove_poollist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.totalCount;
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


editorConfig = {};
 editcms = {"title": "","pagecontent":"","pagekey":""};
  cmsIndx = 0;
  diseditcms = true;
  openCMSmodel(content,cmsid) {
    const cmsedvalue = this.userlist.filter(function(d) {
      return d._id.indexOf(cmsid) !== -1 || !cmsid;
    });
    this.editcms = cmsedvalue[0];

    this.cmsIndx = this.userlist.indexOf(this.userrows.filter(function(item) {
        return item._id == cmsid
    })[0])

    this.modalRef = this.modalService.open(content,{size:'lg'});
    this.modalRef.result.then((result) => {
         this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.diseditcms = false;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  'with: ${reason}';
    }
  }


  changeeditcmsevent(e){
    var cmspagetitle = $('#cmspagetitle');
    if(!cmspagetitle.val()) {
      cmspagetitle.removeClass('has-success').addClass('has-error');
      e.preventDefault();
    } else {
      cmspagetitle.removeClass('has-error').addClass('has-success');
    }

    if(!cmspagetitle.val() || this.editcms.pagecontent == ''){
      this.diseditcms = true;
    }
    else{
      this.diseditcms = false;
    }

  }


  saveEditCMS(){
    var ck=this.editcms.pagecontent.replace(/&nbsp; /g, "").replace(/&nbsp;/g, "").replace("<p>","").replace("</p>","").replace(/ /g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    ck = ck.toString();
        if(ck.trim() == "")
        {
  this.toastr.errorToastr('Please give a proper answer!', 'Error');
  this.editcms.pagecontent ="";
}
else{

    this.CommonService.requestData('admin/editcms',this.editcms)
    .subscribe(resData => {
      this.userlist[this.cmsIndx] = resData.data[0];
      this.userrows = this.userlist;
      this.toastr.successToastr('CMS details are Updated!', 'Success');
      this.modalRef.close();
       
      
    });
  }
}
  cancelcms(){
    this.loaduserlist(this.page,this.defsort,this.defsearch);
  }
}
