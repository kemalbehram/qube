import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
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
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
@ViewChild(DatatableComponent,{static: false}) usertable:DatatableComponent;
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
    useremail:any;
banner_Status
currencyObj
serviceHost=environment.BackendHost
cmslist = [];
closeResult: string;
ckeConfig: any;
table_loader:Boolean = false; 
modalRef: NgbModalRef;
createpairlist:any={};
addcms:any={};
view_result:any={};
editcms:any={};
edit_value:any={};
bannersvalue:any={};
 dataLoader:Boolean=false;
  constructor(private toastr: ToastrManager,private modalService: NgbModal, private CommonService: CommonService,private cookieService: CookieService,private http:Http) {
    
     //login check
      this.CommonService.sessioncheck();
      this.CommonService.ipcheck();
    //login check
 
 
   }

  ngOnInit() {

  	 	this.loadcms();

  	this.ckeConfig = {
      allowedContent: false,
      // extraPlugins: 'divarea,uploadimage',
      removeButtons: 'Source,Save,NewPage,DocProps,Preview,Print,Templates,document,Set language',
      forcePasteAsPlainText: true
    };
  }


   async opencreatepairmodel(content) {
    
      this.modalRef = this.modalService.open(content,{size:'lg'});
      // var lstinput = {"msg":1};
      // this.createpairlist.toCurrency = 'ETH';
      // this.createpairlist.fromCurrency_type = 'token';
      // this.createpairlist.pairvalue = 'ETH'
    }

    openviewmodel(content,value)
    {
    	 this.modalRef = this.modalService.open(content,{size:'lg'});
    	 this.view_result = value;
    }

    openCMSmodel(content,value)
    {
    	 this.modalRef = this.modalService.open(content,{size:'lg'});
    	 this.edit_value = value;
    }

    opendeletemodel(content,value)
    {
      this.modalRef = this.modalService.open(content,{size:'lg'});
      this.bannersvalue = value;
    }
    delete_faq(value)
    {
	      this.CommonService.requestData('admin/deletefaq',value)
	      .subscribe(resData => {
	          this.toastr.successToastr(resData.msg, 'Success!');
	           this.loadcms();
	           this.modalRef.close();
	      });
    }

  loadcms(){
  this.table_loader = true;
  this.dataLoader = true;
	var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
this.loading = true;
this.CommonService.requestData('admin/faqlist',lstinput)
.subscribe(resData => {
  this.page.totalElements = resData.faqcount;
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
      this.CommonService.requestData('admin/faqlist',lstinput)
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
      this.CommonService.requestData('admin/faqlist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.faqcount;
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
      this.CommonService.requestData('admin/faqlist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.faqcount;
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
 //editcms = {"title": "","pagecontent":"","pagekey":"","content_title":"","image":"","imagesec":""};
  cmsIndx = 0;
  diseditcms = true;
  // openCMSmodel(content,cmsid,row) {
  //   const cmsedvalue = this.userlist.filter(function(d) {
  //     return d._id.indexOf(cmsid) !== -1 || !cmsid;
  //   });
  //   this.editcms = cmsedvalue[0];

  //   this.cmsIndx = this.userlist.indexOf(this.userrows.filter(function(item) {
  //       return item._id == cmsid
  //   })[0])

  //   this.modalRef = this.modalService.open(content,{size:'lg'});
  //   this.modalRef.result.then((result) => {
  //        this.closeResult = `Closed with: ${result}`;
  //    }, (reason) => {
  //        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  //   this.diseditcms = false;
  // }

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
      // e.preventDefault();
    } else {
      cmspagetitle.removeClass('has-error').addClass('has-success');
    }

    if(!cmspagetitle.val() || this.editcms.pagecontent == '' ||this.editcms.content_title==''){
      this.diseditcms = true;
    }
    else{
      this.diseditcms = false;
    }

  }

 currency_submitted:boolean=false;
 submitted:boolean=false;

 onSubmitData(data)
    {
      this.CommonService.requestData('admin/insertfaq',this.addcms)
      .subscribe(resData => {
          this.toastr.successToastr(resData.msg, 'Success!');
           this.loadcms();
           this.modalRef.close();
      });
     
    }


    saveEditCMS()
    {
      this.CommonService.requestData('admin/editfaq',this.edit_value)
      .subscribe(resData => {
          this.toastr.successToastr(resData.msg, 'Success!');
           this.loadcms();
           this.modalRef.close();
      });
    }

  cancelcms(){
    this.loaduserlist(this.page,this.defsort,this.defsearch);
  }

 filepath: any;
filesToUpload1: Array<File> = [];
filesToUpload2: Array<File> = [];
filename1 = "";
filename2 = "";
im;
value:any;
imageuploadprof = false;
fileChangeEvent(fileInput:any,im) {
    this.value =im;
    this.imageuploadprof = false;
    var path = fileInput.target.files[0].type;
        this.filepath = path;
    if (path == "image/jpeg" || path == "image/gif" || path == "image/jpg" || path == "image/png") {
      if (this.value == 'image') {
        this.filename1 = fileInput.target.files[0].name;
        this.im = fileInput.target.im;
        this.filesToUpload1 = <Array<File>>fileInput.target.files;
      }
      if (this.value == 'imagesec') {
        this.filename2 = fileInput.target.files[0].name;
        this.im = fileInput.target.im;
        this.filesToUpload2 = <Array<File>>fileInput.target.files;
      }
      
    }else{
         this.toastr.errorToastr('Please choose a right file!', 'Error');
      if (this.value == 'image') {
        this.filename1 = '';
        this.im = '';
        this.filesToUpload1 = [];

      }
            this.reset();

      if (this.value == 'imagesec') {
        this.filename2 = '';
        this.im = '';
        this.filesToUpload2 = [];

      }
          this.resets();

     
     }
  
  }
  //  saveEditCMS(){
  //    var formData: any = new FormData();
  //   var files1: Array<File> = this.filesToUpload1;
  //   var files2: Array<File> = this.filesToUpload2;
    
   
  //   for (let j = 0; j < files1.length; j++) {
  //     var fileName = this.filesToUpload1[j]['name'];
  //     var filename1 = fileName.split('.');
  //     var lastValue = filename1.length - 1;
  //     var FileName8 = 'image.' + filename1[lastValue];
  //     formData.append("uploads[]", this.filesToUpload1[j], FileName8);
  //   }
  //   for (let k = 0; k < files2.length; k++) {
  //     var fileName5 = this.filesToUpload2[k]['name'];

  //     var filename2 = fileName5.split('.');
  //     var lastValue = filename2.length - 1;
  //     var FileName7 = 'imagesec.' + filename2[lastValue];
  //     formData.append("uploads[]", this.filesToUpload2[k], FileName7);
  //   }
  //   this.http.post(this.serviceHost+'uploadsmulti',formData)
  //   .map(files => files.json())
  //   .subscribe(files => {
  //     if (files.status) {
  //       for (var i = 0; i < files.value.length; i++) {
  //         var value = files.value[i]
  //         var urlSplit = value.split(',');
  //         if (urlSplit[0] == 'image') {
  //           // var image = value.Location;
  //           // this.editcms.image = value.Location;

  //             var image = urlSplit[1] ;
  //           this.editcms.image = image;

  //         }
  //         if (urlSplit[0] == 'imagesec') {
  //           var imagesec = value.Location;
  //          this.editcms.imagesec = value.Location;

  //         }
  //       }
  //        this.onSubmitData(); 
       
  //        }
        
  //       else {
  //         this.onSubmitData();
  //        }
      
  //   });
  // }

}
