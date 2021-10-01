import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from '../../common.service';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { NgbModal, ModalDismissReasons,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-ipblock',
  templateUrl: './ipblock.component.html',
  styleUrls: ['./ipblock.component.scss']
})
export class IpblockComponent implements OnInit {
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
      defsort: any = {dir: "desc", prop: "createddate"};
    defsearch = "";
    ipaddress = "";
    ipDatas:any={};
    ipFromSubmit:Boolean=false;
    closeResult:any;
     loading: boolean = false;
     rowLimits: Array<any> = this.limits;
    limit: number = this.limits[0].value;
     modalRef: NgbModalRef;
     currencyObj
  constructor(private socket: Socket,private toastr: ToastrManager,private modalService: NgbModal, private CommonService: CommonService,private cookieService: CookieService,private http:Http) { }

  ngOnInit() {
    //login check
      this.CommonService.sessioncheck();
      this.CommonService.ipcheck();
    //login check
  	this.loadbank();
  }

loadbank(){
	var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
this.loading = true;
this.CommonService.requestData('admin/IPblockhistory',lstinput)
.subscribe(resData => {
  this.page.totalElements = resData.currencycount;
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
      this.CommonService.requestData('admin/IPblockhistory',lstinput)
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
      this.CommonService.requestData('admin/IPblockhistory',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.currencycount;
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
      this.CommonService.requestData('admin/IPblockhistory',lstinput)
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

  bannersvalue = {};
  banner = "";
  changehost(content, bannerrow){
    this.bannersvalue = bannerrow;
     this.modalRef = this.modalService.open(content,{size:'sm'});
    
  }

  changebannerStatus(bannersvalue) {
         if(bannersvalue.status == 1){
        this.bannersvalue = 0;
      }
      else{
        this.bannersvalue = 1;
      }
      
      this.currencyObj = {"_id":bannersvalue._id,"status": this.bannersvalue,"user_ip":bannersvalue.user_ip};
     
      this.CommonService.requestData('admin/ipstatus', this.currencyObj).subscribe(resData => {
        if(resData)
        {
          var obj={
            "row_id":this.currencyObj._id,
            "status":this.currencyObj.status,
            "user_ip":this.currencyObj.user_ip
          }
          this.socket.emit('ipblock',obj)  
          
      this.toastr.successToastr('IP Address status changed Successfully!', 'Success');
      // if(this.cookieService.get('role') == 'admin'){
      //   this. loadbank();
           
      // }
      // else{
      //     this. loadbank();
          
      // }
      // }
      // else{
           this. loadbank();
      }
      })
  }
  openbannermodel(content) {
    this.ipDatas={}
    this.modalRef = this.modalService.open(content,{size:'lg'});
    this.modalRef.result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
  
  addIP(){
    
    this.ipFromSubmit=true;
  
    let length = this.ipDatas.user_ip.replace(/\s/g, "");
    if(length == 0) {
      this.toastr.errorToastr('Enter the valid IP address','Error !');
      return false;
    }

    var sendData = {
      user_ip:this.ipDatas.user_ip,
      status:1
    }
    this.CommonService.requestData('admin/addIpToBlock',sendData)
    .subscribe(resData => {
      if(resData.status){
      this.clearmodel()
      this.toastr.successToastr(resData.msg,'');
      this.ipFromSubmit=false;
      this.loadbank();
    }else{
      this.toastr.errorToastr(resData.msg, '');
      this.ipFromSubmit=false;
      this.loadbank();
      }
    });
  }

  clearmodel(){
      if(this.modalRef){
          this.modalRef.close()
      }
  }

  opendeletemodel(content,value)
    {
      this.modalRef = this.modalService.open(content,{size:'lg'});
      this.bannersvalue = value;
    }
    delete_ip(value)
    {
        this.CommonService.requestData('admin/deleteip',value)
        .subscribe(resData => {
            this.toastr.successToastr(resData.msg, 'Success!');
             this.loadbank();
             this.modalRef.close();
        });
    }
  // addIP(){
  //   if(this.ipaddress && this.ipaddress.trim() != ''){
  //     this.CommonService.requestData('admin/addIpToBlock',{user_ip:this.ipaddress}).subscribe((res)=>{
  //       if(res.status){
  //         this.toastr.successToastr('IP added Successfully!', 'Success');
  //         this.loadbank();
  //       }else{

  //         this.toastr.errorToastr(res.msg, 'Oops!');
  //       }
  //     })
  //   }
  // }

}

