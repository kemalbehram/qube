import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from '../../common.service';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons,NgbModalRef,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
@ViewChild(DatatableComponent,{static: false}) usertable:DatatableComponent;
 @ViewChild('inputFile',{static: false}) myInputVariable: ElementRef;
 // @ViewChild('inputFiles',{static: false}) myInputVariables: ElementRef;
reset() {
 
  (<HTMLInputElement>document.getElementById('idssss')).value = "";

   
}
resets() {
      (<HTMLInputElement>document.getElementById('id_proof')).value = "";
}
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
      defsort: any = {dir: "desc", prop: "modifieddate"};
    defsearch = "";
     loading: boolean = false;
     rowLimits: Array<any> = this.limits;
    limit: number = this.limits[0].value;
    viewuserdt={};
    bannersvalue:any={};
    currencyObj:any={};
    image="";
    useremail:any;
   modalRef: NgbModalRef;
  serviceHost=environment.BackendHost
  cmslist = [];
  closeResult: string;
  // ckeConfig: any;
  submitted:Boolean = false; 
  table_loader:Boolean = false; 
  edithostlist:any={};
  addhostlist:any={"heading1": "","heading2":"","heading3":"","button_txt":"","image": "","status":""};
  modalOption: NgbModalOptions = {};

  edittoken_list:any={};
    constructor(private toastr: ToastrManager,private modalService: NgbModal, private CommonService: CommonService,private cookieService: CookieService,private http:Http) {
    //login check
      this.CommonService.sessioncheck();
      this.CommonService.ipcheck();
    //login check
  	this.loadcms();
   }

  ngOnInit() {}
  
loadcms(){
  this.table_loader = true;
	var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
this.loading = true;
this.CommonService.requestData('admin/bannerlist',lstinput)
.subscribe(resData => {
  this.page.totalElements = resData.bannercount;
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
      this.CommonService.requestData('admin/bannerlist',lstinput)
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
      this.defsort = {dir: "desc", prop: "createddate"};
      this.defsearch = "";

      var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
      this.loading = true;
      this.CommonService.requestData('admin/bannerlist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.bannercount;
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
      this.CommonService.requestData('admin/bannerlist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.bannercount;
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

   openeditmodel(content,bannerrow) {
      this.edittoken_list = {"heading1": bannerrow.heading1,"heading2": bannerrow.heading2,"heading3": bannerrow.heading3,"button_txt": bannerrow.button_txt,"image": bannerrow.image,"status":bannerrow.status,"modifieddate":bannerrow.modifieddate}
      this.modalRef = this.modalService.open(content,{size:'lg'});
    }

    changehost(content, bannerrow){
      this.bannersvalue = bannerrow;
      this.modalRef = this.modalService.open(content,{size:'sm'});
    }

    changebannerStatus(bannersvalue) {
      if(bannersvalue.status==1){
        this.bannersvalue=0
      }else{
        this.bannersvalue=1
      }
      this.currencyObj = {"_id":bannersvalue._id,"status": this.bannersvalue};
      this.CommonService.requestData('admin/bannerstatus', this.currencyObj).subscribe(resData => {
        if(resData.status==true){
          this.toastr.successToastr(resData.message,'Success');
          this.modalRef.close();
          this.loadcms();
        }else{
          this.toastr.errorToastr('While updating','Error');
        }
      })
    }

    openviewmodel(content,bannerrow) {
      if(bannerrow.status){
        bannerrow.status="Deactive"
      }else{
        bannerrow.status="Active"
      }
      this.edithostlist = {"heading1": bannerrow.heading1,"heading2": bannerrow.heading2,"heading3": bannerrow.heading3,"button_txt": bannerrow.button_txt,"image": bannerrow.image,"status":bannerrow.status,"modifieddate":bannerrow.modifieddate};
      this.modalRef = this.modalService.open(content,{size:'lg'});
    }

  	openaddcherrymodel(content) {
      this.modalRef = this.modalService.open(content,this.modalOption);
    }
    filename = "";
    filesToUpload: Array<File> = [];
    filepath: any;
    fileerr: Boolean = false;

    upload(data,type) {
    if (this.filesToUpload.length > 0) {
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
      for (let i = 0; i < files.length; i++) {
        formData.append("uploads", files[i], files[i]['name']);
      }
      this.http.post(this.serviceHost + 'uploadsing', formData)
        .map(files => files.json())
        .subscribe(files => {
          if (files.status == true) {
            this.image = files.data.Location;
          }else{
            this.image ='';
          }
          if (type == "insert") {
            this.addhostlist.image=this.image
            this.add_token_result();
          } else {
            this.edittoken_list.image=this.image;
            this.edittoken_result();
          }
        });
    } else {
      if (type == "update") {
        this.edittoken_result();
      }
    }
  }
    imageuploadprofFormat = false;
    fileChangeEvent(fileInput: any) {
      this.fileerr = false
      this.imageuploadprofFormat = false;
      var path = fileInput.target.files[0].type;
      this.filepath = path;
      if (path == "image/jpeg" || path == "image/gif" || path == "image/jpg" || path == "image/png" || path == "image/svg") {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.filename = fileInput.target.files[0].name;
      }
      else {
        this.resetsss();
        this.fileerr = true
      }
    }

    resetsss() {
      this.myInputVariable.nativeElement.value ='';
    }

    edittoken_result(){
      this.submitted = true;
      this.CommonService.requestData('admin/editbanner',this.edittoken_list).subscribe(resData=>{
        if(resData.status==true){
        this.toastr.successToastr(resData.message,'Success');
        this.modalRef.close();
        this.loadcms();
        }
        else{
        this.toastr.errorToastr('While updating','Error');
        }
      });
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

    add_token_result(){
       this.CommonService.requestData('admin/insertbanner',this.addhostlist)
      .subscribe(resData => {
          this.toastr.successToastr(resData.message, 'Success!');
           this.modalRef.close();
      });
      this.loadcms();
    }

    cancelcms(){
      this.loaduserlist(this.page,this.defsort,this.defsearch);
    }

   
}
