import { Component, OnInit,ElementRef,ViewChild,Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from '../../common.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
@ViewChild('fileinput',{static: false})myInputVariable:ElementRef;

  admindetails:any={};
  isValid = false;
  serviceHost = environment.BackendHost;
  adminfilesToUpload: Array<File> = [];
  adminfilename :any;

  constructor(private http:Http,private commonService: CommonService,public toastr: ToastrManager,private cookieService: CookieService,private mysocket: Socket) { }

resetsss() {
    this.myInputVariable.nativeElement.value ='';
}

ngOnInit() {
  //login check
  this.commonService.sessioncheck();
  this.commonService.ipcheck();
  //login check
  if(this.cookieService.get('role') == 'admin'){
   	this.commonService.getData('admin/adminDetails').subscribe(resData => {
      this.admindetails = resData.data;
    });
  }else{
    this.commonService.getData('admin/adminDetails').subscribe(resData => {
      this.admindetails = resData.data;
    });
  }
}


Emitsocket(name,content) {
  this.mysocket.emit(name,content);
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
        this.admindetails.admin_image = event.target.result;  
    }
    reader.readAsDataURL(fileInput.target.files[0]);
  }else{
      this.toastr.errorToastr('Please choose a right file!', 'Error');
      this.resetsss();
      this.adminfilesToUpload = [];
    }
}

uploadimage() {
  if(this.adminfilesToUpload.length==0){
    this.savebasicinfo();
  }else{
    const formData: any = new FormData();
    const files: Array<File> = this.adminfilesToUpload;
    for(let i =0; i < files.length; i++){
      formData.append("uploads", files[i], files[i]['name']);
    }
    this.http.post( this.serviceHost + 'uploadsing', formData).map(files => files.json())
    .subscribe(files => {
      if(files.status) {
        this.admindetails.admin_image =files.data.Location;
        this.savebasicinfo();
      } else {
        this.toastr.errorToastr("Error in Uploading Profile Image",'Oops');
      }
    });
  }
}

// document.addEventListener('DOMContentLoaded', function () {
//   var checkbox = document.querySelector('input[type="checkbox"]');

//   checkbox.addEventListener('change', function () {
//     if (checkbox.checked) {
//       // do this
//       console.log('Checked');
//     } else {
//       // do that
//       console.log('Not checked');
//     }
//   });
// });

check(event){
  if(event.target.checked==true){
    this.admindetails.otp_options=true
  }else if(event.target.checked==false){
    this.admindetails.otp_options=false
  }
}

savebasicinfo(){
  if(this.cookieService.get('role') == 'admin'){
    this.commonService.requestData('admin/adminprofilelist',this.admindetails)
    .subscribe(resData => {
      this.Emitsocket('admindetails',this.admindetails);
      this.toastr.successToastr('Basic Information Updated ','Success');
      this.isValid = false;
    });
  }else{
    this.commonService.requestData('admin/adminprofilelist',this.admindetails)
    .subscribe(resData => {
      this.Emitsocket('admindetails',this.admindetails);
      // this.imgsocket=resData.data;
      this.toastr.successToastr('Basic Information Updated ','Success');
      this.isValid = false;       
    });
  }
}
  /* End-Basic info*/



}
