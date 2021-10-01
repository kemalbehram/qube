import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CommonService } from '../../common.service';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { NgbModal, ModalDismissReasons,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';

declare let window;
declare var require: any;

let token_abi_details   = require('../../shared/files/token_abi.json');


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

@ViewChild(DatatableComponent,{static: false}) usertable:DatatableComponent;
@ViewChild('fileinput',{static: false})myInputVariable:ElementRef;

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
  closeResult:any;
  modalRef: NgbModalRef;
  FromSubmit:Boolean=false;
  ipDatas:any={};
  adminfilesToUpload: Array<File> = [];
  adminfilename :any;
  web3;
  serviceHost = environment.BackendHost;
  constructor(private CommonService: CommonService,public toastr: ToastrManager,private cookieService: CookieService,private http:Http,private modalService: NgbModal) { }

	ngOnInit() {
		this.loadcms()
    this.enable_metamask()
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
      this.CommonService.requestData('currency/currency_list',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.datacount;
        this.page.totalPages = this.page.totalElements / this.page.size;
        this.userlist = resData.data;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
      });
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
	//filter of search
  	updateFilter() {
      this.loading = true;
      var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
      this.CommonService.requestData('currency/currency_list',lstinput)
      .subscribe(resData => {
        this.page.totalElements = resData.datacount;
        this.page.totalPages = this.page.totalElements / this.page.size;
        this.userlist = resData.data;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
      });
    }

     // enable metamask
      enable_metamask(){
        console.clear();
        console.log("enable ---> metamask ");
        if (typeof window.web3 !== 'undefined') {
          this.web3 = window.web3.currentProvider;
        } else {
          this.web3 = new window.Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ace26df5eee341b3ab52f89fd7f56d49');
        }
          window.web3 = new window.Web3(window.ethereum);
          // window.ethereum.enable();
          window.ethereum;
      }

    // enable metamask

    resetsss() {
      this.myInputVariable.nativeElement.value ='';
    }

    //Filechange Event
    fileChangeEvent(fileInput: any) {
      var path = fileInput.target.files[0].type;
      if(path == "image/jpeg" || path == "image/gif" || path == "image/jpg" || path == "image/png"){
        this.adminfilesToUpload = <Array<File>>fileInput.target.files;
        this.adminfilename = fileInput.target.files[0].name;
        var reader:any,target:EventTarget;

        reader= new FileReader();
        reader.onload = (event) => {
            this.ipDatas.currency_image = event.target.result;  
        }
        reader.readAsDataURL(fileInput.target.files[0]);
      }else{
          this.toastr.errorToastr('Please choose a right file!', 'Error');
          this.resetsss();
          this.adminfilesToUpload = [];
        }
    }

    uploadimage() {
      this.FromSubmit=true;
      if(this.adminfilesToUpload.length==0){
        this.addcurrency();
      }else{
        const formData: any = new FormData();
        const files: Array<File> = this.adminfilesToUpload;
        for(let i =0; i < files.length; i++){
          formData.append("uploads", files[i], files[i]['name']);
        }
        this.http.post( this.serviceHost + 'uploadsing', formData).map(files => files.json())
        .subscribe(files => {
          if(files.status) {
            this.ipDatas.currency_image =files.data.Location;
            this.addcurrency();
          } else {
            this.toastr.errorToastr("Error in Uploading Profile Image",'Oops');
          }
        });
      }
    }

    addcurrency(){
      var sendData = {
        currencyName:this.ipDatas.currencyName,
        currency_image:this.ipDatas.currency_image,
        currencySymbol:this.ipDatas.currencySymbol,
        currency_type:this.ipDatas.currency_type,
        contract_address:this.ipDatas.contract_address,
        currency_decimal:this.ipDatas.currency_decimal,
        status:this.ipDatas.status,
      }
      this.CommonService.requestData('currency/insert_currency',sendData)
      .subscribe(resData => {
        if(resData.status){
          this.toastr.successToastr(resData.msg, 'Success!')
          this.FromSubmit=false;
          this.loadcms();
        }else{
          this.toastr.errorToastr(resData.msg, 'Oops!');
          this.FromSubmit=false;
          this.loadcms();
        }
      });
      this.modalRef.close();
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

    async setdecimal(event){
      let abiArray        = token_abi_details;
      let contract        = new window.web3.eth.Contract(abiArray, event);
      let name        = await contract.methods.name().call();
      let decimals        = await contract.methods.decimals().call();
      let symbol        = await contract.methods.symbol().call();
      this.ipDatas.currency_decimal = decimals;
      this.ipDatas.currencySymbol = symbol;
      this.ipDatas.currencyName =name;
      this.ipDatas.status ="Active";
    }

  	loadcms(){
  		this.table_loader = true;
  		this.dataLoader = true;
		var lstinput = {"page":this.page,"sorting":this.defsort,"search": this.defsearch};
		this.loading = true;
		this.CommonService.requestData('currency/currency_list',lstinput)
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
      this.CommonService.requestData('currency/currency_list',lstinput)
      .subscribe(resData => {
        this.userlist = resData.data;
        this.usertemp = this.userlist;
        this.userrows = this.userlist;
        this.loading = false;
      });
    }

openmodel(content,row) {
    this.ipDatas=row
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
}
