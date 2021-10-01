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
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnInit {
@ViewChild(DatatableComponent,{static: false}) usertable:DatatableComponent;
 // @ViewChild('inputFile',{static: false}) myInputVariable: ElementRef;
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
    useremail:any;
   modalRef: NgbModalRef;
  banner_Status
  currencyObj
  serviceHost=environment.BackendHost
  cmslist = [];
  closeResult: string;
  ckeConfig: any;
  table_loader:Boolean = false; 
  edithostlist:any={};
  modalOption: NgbModalOptions = {};
  myOptionss={};
  myOptionss1={};
  myOptionss1_start = {};
  myOptionss1_edit = {};
  helo=false;
  helo1=false;
  helo1_edit=false;
  check=false;
  check1=false;
  edittoken_list:any={};
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
this.CommonService.requestData('admin/tokenlotslist',lstinput)
.subscribe(resData => {
  this.page.totalElements = resData.tokenlotscount;
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
      this.CommonService.requestData('admin/tokenlotslist',lstinput)
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
      this.CommonService.requestData('admin/tokenlotslist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.tokenlotscount;
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
      this.CommonService.requestData('admin/tokenlotslist',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.tokenlotscount;
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
 editcms = {"title": "","pagecontent":"","pagekey":"","content_title":"","image":"","imagesec":""};
  cmsIndx = 0;
  diseditcms = true;
  openCMSmodel(content,cmsid,row) {
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

   openeditmodel(content,bannerrow) {
      const parsedDate = moment(bannerrow.start_date);
      bannerrow.start_date = parsedDate.format("YYYY/MM/DD");
      const parsedDate1 = moment(bannerrow.end_date);
      bannerrow.end_date = parsedDate1.format("YYYY/MM/DD");
      // var split_array = bannerrow.start_date.split('/');
      // var start_dd = split_array[2]
      // var start_mm = split_array[1];
      // var start_y = split_array[0];
      // var end_split_array = bannerrow.end_date.split('/');
      // var end_dd = end_split_array[2]
      // var end_mm = end_split_array[1];
      // var end_y = end_split_array[0];
      //var mydatef = start_dd+"/"+start_mm+"/"+start_y;
      var newstart_date = {formatted:bannerrow.start_date};
      // var mydatef_end = end_dd+"/"+end_mm+"/"+end_y;
      var newend_date = {formatted:bannerrow.end_date};
      this.edittoken_list = {"designation": bannerrow.designation,"price": bannerrow.price,"total_supply":bannerrow.total_supply,"status":bannerrow.status,"location":bannerrow.location,"start_date":bannerrow.start_date,"end_date":bannerrow.end_date};
      this.modalRef = this.modalService.open(content,{size:'lg'});
    }
    openviewmodel(content,bannerrow) {
      const parsedDate = moment(bannerrow.start_date);
      bannerrow.start_date = parsedDate.format("YYYY/MM/DD");
      const parsedDate1 = moment(bannerrow.end_date);
      bannerrow.end_date = parsedDate1.format("YYYY/MM/DD");
      this.edithostlist = {"designation": bannerrow.designation,"price": bannerrow.price,"price_btc": bannerrow.price_btc,"price_eth": bannerrow.price_eth,"price_usdt": bannerrow.price_usdt,"total_supply":bannerrow.total_supply,"status":bannerrow.status,"location":bannerrow.location,"start_date":bannerrow.start_date,"end_date":bannerrow.end_date};
      this.modalRef = this.modalService.open(content,{size:'lg'});
    }
  openaddcherrymodel(content) {
      this.modalRef = this.modalService.open(content,this.modalOption);
      
    }
     onDateChanged(event: IMyDateModel) {
    if(event.epoc!=0){
      this.helo1=true;
      this.helo1_edit = true;
    }
    else
    {
      this.helo1=false;
      this.helo1_edit=false;
      this.edithostlist.start_date=null;

    } 
  }
 
  onDate(event: IMyDateModel) {
    if(event.epoc!=0){
      this.helo=true
    }
    else
    {
      this.helo=false
      this.edithostlist.end_date=null;
      this.helo1=false;

    }
  }

    eidtdisableUntil() {
      this.check1=true;
       var last_item = this.userrows[this.userrows.length - 1];
       var dt = new Date(last_item.end_date);
    
    dt.setDate( dt.getDate() - 1 );
    let copy = this.getCopyOfOptions();   
    copy.disableUntil = {year: dt.getFullYear(), 
                         month: dt.getMonth()+1, 
                         day: dt.getDate() };
    this.myOptionss1_start = copy;
    }
    eidtdisableUntil_edit() {
      this.check1=true
    }
    eidtdisableUnti() {
   //  this.search_list.map(async (items)=>{
   //       items.dollar = (items.coin)*(items.equal_amount); 
   //       this.total_sum = this.total_sum + items.dollar;
   // });

    var dt = new Date(this.edithostlist.start_date.formatted);
    dt.setDate( dt.getDate() - 1 );
    let copy = this.getCopyOfOptions();   
    copy.disableUntil = {year: dt.getFullYear(), 
                         month: dt.getMonth()+1, 
                         day: dt.getDate()+1 };
    this.myOptionss1 = copy;
  }

   eidtdisableUnti_edit() {
    var dt = new Date(this.edittoken_list.start_date.formatted);
    dt.setDate( dt.getDate() - 1 );
    let copy = this.getCopyOfOptions();   
    copy.disableUntil = {year: dt.getFullYear(), 
                         month: dt.getMonth()+1, 
                         day: dt.getDate() };
    this.myOptionss1_edit = copy;
  }



  edittoken_result(){
      this.submitted = true;
      this.edittoken_list.start_date  = this.edittoken_list.start_date.formatted;
       this.edittoken_list.end_date  = this.edittoken_list.end_date.formatted;
      this.CommonService.requestData('admin/updatetokenlot',this.edittoken_list).subscribe(resData=>{
        if(resData.status==true){
        this.toastr.successToastr('Token lots field updated','Success');
        this.modalRef.close();
        this.loadcms();
        }
        else{
        this.toastr.errorToastr('While updating','Error');
        }
      });
    }

   descimalkey(evt)
       {
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if (charCode != 46 && charCode > 31 
            && (charCode < 48 || charCode > 57))
             return false;

          return true;
       }  

  
  getCopyOfOptions(): IMyOptions {
    return JSON.parse(JSON.stringify(this.myOptionss));

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

    if(!cmspagetitle.val() || this.editcms.pagecontent == '' ||this.editcms.content_title==''){
      this.diseditcms = true;
    }
    else{
      this.diseditcms = false;
    }

  }

   add_token_result()
    {
       this.edithostlist.start_date  = this.edithostlist.start_date.formatted;
       this.edithostlist.end_date  = this.edithostlist.end_date.formatted;
       this.edithostlist.total_supply = Number(this.edithostlist.total_supply);
       this.edithostlist.price =  Number(this.edithostlist.price);
       this.edithostlist.price_btc =  Number(this.edithostlist.price_btc);
       this.edithostlist.price_eth =  Number(this.edithostlist.price_eth);
       this.edithostlist.price_usdt =  Number(this.edithostlist.price_usdt);
       this.CommonService.requestData('admin/inserttokenlot',this.edithostlist)
      .subscribe(resData => {
          this.toastr.successToastr(resData.msg, 'Success!');
           this.modalRef.close();
      });
      this.loadcms();
    }

 currency_submitted:boolean=false;
   submitted:boolean=false;
//   saveEditCMS(){
//   		this.currency_submitted = true;
//     if(this.filesToUpload.length>0){
//     this.submitted = true;
//     const formData: any = new FormData();
//     const files: Array<File> = this.filesToUpload;

//     for(let i =0; i < files.length; i++){
//       formData.append("uploads[]", files[i], files[i]['name']);
//     }
//     this.http.post(this.serviceHost+'admin/uploadPhoto', formData)
//     .map(files => files.json())
//     .subscribe(files => {
//      if(files.status)
//         {
//           this.editcms.image = files.result.secure_url;
//           this.submitted = false;
//           this.onSubmitData()  
//         }
//         else
//         {
//             this.onSubmitData();
//         }
//     })
//   }
//   else{

//       this.submitted = true;
//       this.onSubmitData();
//   }
   
// }
onSubmitData(){
	 var ck=this.editcms.pagecontent.replace(/&nbsp; /g, "").replace(/&nbsp;/g, "").replace("<p>","").replace("</p>","").replace(/ /g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    ck = ck.toString();
        if(ck.trim() == "")
        {
  this.toastr.errorToastr('Please fill all the field properly!', 'Error');
  this.editcms.pagecontent ="";
}
else{
    this.CommonService.requestData('admin/editstatic',this.editcms)
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

// filename = "";
// filesToUpload: Array<File> = [];
//   imageuploadprofFormat = false;
//   filepath: any;
//   profileUploaded:boolean=false;
//   fileChangeEvent(fileInput: any) {
//     var path = fileInput.target.files[0].type;
//           this.filepath = path;
//       if(path == "image/jpeg" || path == "image/gif" || path == "image/jpg" || path == "image/png")
//       {   
//         this.filesToUpload = <Array<File>>fileInput.target.files;
//         this.filename = fileInput.target.files[0].name;
//       }
//       else
//       {

//       this.toastr.errorToastr('Please choose valid image','Error');
//       this.reset() ;
//       this.profileUploaded = true;
//       }
      
//   }


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
   saveEditCMS(){
     var formData: any = new FormData();
    var files1: Array<File> = this.filesToUpload1;
    var files2: Array<File> = this.filesToUpload2;
    
   
    for (let j = 0; j < files1.length; j++) {
      var fileName = this.filesToUpload1[j]['name'];
      var filename1 = fileName.split('.');
      var lastValue = filename1.length - 1;
      var FileName8 = 'image.' + filename1[lastValue];
      formData.append("uploads[]", this.filesToUpload1[j], FileName8);
    }
    for (let k = 0; k < files2.length; k++) {
      var fileName5 = this.filesToUpload2[k]['name'];

      var filename2 = fileName5.split('.');
      var lastValue = filename2.length - 1;
      var FileName7 = 'imagesec.' + filename2[lastValue];
      formData.append("uploads[]", this.filesToUpload2[k], FileName7);
    }
    this.http.post(this.serviceHost+'uploadsmulti',formData)
    .map(files => files.json())
    .subscribe(files => {
      if (files.status) {
        for (var i = 0; i < files.value.length; i++) {
          var value = files.value[i]
          var urlSplit = value.split(',');
          if (urlSplit[0] == 'image') {
            // var image = value.Location;
            // this.editcms.image = value.Location;

              var image = urlSplit[1] ;
            this.editcms.image = image;

          }
          if (urlSplit[0] == 'imagesec') {
            var imagesec = value.Location;
           this.editcms.imagesec = value.Location;

          }
        }
         this.onSubmitData(); 
       
         }
        
        else {
          this.onSubmitData();
         }
      
    });
  }
}
