import { Component, OnInit,ViewChild,ElementRef,ChangeDetectorRef,Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from '../../common.service';
import { environment } from '../../../environments/environment';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { Socket } from 'ngx-socket-io';
import PatternLock from '../../../assets/patternLock/patternLock';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-sitesetting',
  templateUrl: './sitesetting.component.html',
  styleUrls: ['./sitesetting.component.scss']
})
export class SitesettingComponent implements OnInit {
site:any={};
siteinfo:any={};
 isValid2:boolean=false
 isValid1:boolean=false

serviceHost=environment.BackendHost
sitesettings:any={};
numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  @ViewChild('sitelogo', {static: false}) myInputVariable: ElementRef;
    reset() {
    this.myInputVariable.nativeElement.value = '';
}

   @ViewChild('favicon', {static: false}) myInputVariables: ElementRef;
resets(){
      this.myInputVariables.nativeElement.value = '';

}   
@ViewChild('innerlogo', {static: false}) myInputVariablee: ElementRef;
reseta(){
      this.myInputVariablee.nativeElement.value = '';

}
  constructor(private commonService: CommonService,public toastr: ToastrManager,private http:Http,private mysocket: Socket) { }

  ngOnInit() {
    var lock = new PatternLock("#patternContainer",{
      onDraw:function(pattern){
        var pat = lock.getPattern();
        $("#patterncode").val(pat);
      }
    });
    //login check
      this.commonService.sessioncheck();
      this.commonService.ipcheck();
    //login check
   
    this.siteinfrom();
    this.siteinfroms();
    this.socialinfroms();
  }
  siteinfrom(){
  	this.commonService.getData('admin/siteinform')
      .subscribe(resData => {
      	this.site=resData.data
        console.log(this.site)
      });
  }
  siteinfroms(){
    this.commonService.getData('admin/siteinform')
      .subscribe(resData => {
        this.sitesettings=resData.data
      });
  }
   socialinfroms(){
    this.commonService.getData('admin/siteinform')
      .subscribe(resData => {
        this.siteinfo=resData.data
      });
  }
 
filepath: any;
filesToUpload1: Array<File> = [];
filesToUpload2: Array<File> = [];
filesToUpload3: Array<File> = [];
filename1 = "";
filename2 = "";
filename3 = "";
im;
value:any;
imageuploadprof = false;
fileChangeEvent(fileInput:any,im) {
  this.value =im;
  console.log("value",this.value);
  this.imageuploadprof = false;
  var path = fileInput.target.files[0].type;
  this.filepath = path;
  if (path == "image/jpeg" || path == "image/gif" || path == "image/jpg" || path == "image/png") {
    if (this.value == 'site_logo') {
      this.filename1 = fileInput.target.files[0].name;
      this.im = fileInput.target.im;
      this.filesToUpload1 = <Array<File>>fileInput.target.files;
      var reader:any,target:EventTarget;
      reader= new FileReader();
      reader.onload = (event) => {
        this.site.site_logo = event.target.result;  
      }
      reader.readAsDataURL(fileInput.target.files[0]);
      console.log("upload2",this.filesToUpload1);
    }
    if (this.value == 'site_favicon') {
      this.filename2 = fileInput.target.files[0].name;
      this.im = fileInput.target.im;
      this.filesToUpload2 = <Array<File>>fileInput.target.files;
      var reader:any,target:EventTarget;
      reader= new FileReader();
      reader.onload = (event) => {
        this.site.site_favicon = event.target.result;  
      }
      reader.readAsDataURL(fileInput.target.files[0]);
      console.log("upload3",this.filesToUpload2);
    }
    if (this.value == 'site_innerlogo') {
      this.filename3 = fileInput.target.files[0].name;
      this.im = fileInput.target.im;
      this.filesToUpload3 = <Array<File>>fileInput.target.files;
      var reader:any,target:EventTarget;
      reader= new FileReader();
      reader.onload = (event) => {
        this.site.site_logo = event.target.result;  
      }
      reader.readAsDataURL(fileInput.target.files[0]);
      console.log("upload4",this.filesToUpload3);
    }
  }else{
    this.toastr.errorToastr('Please choose a right file!', 'Error');
    this.resets();
    if (this.value == 'site_logo') {
      this.filename1 = '';
      this.im = '';
      this.filesToUpload1 = [];
    }
    this.reset();
    if (this.value == 'site_favicon') {
      this.filename2 = '';
      this.im = '';
      this.filesToUpload2 = [];
    }
    this.resets();
    if (this.value == 'site_innerlogo') {
      this.filename3 = '';
      this.im = '';
      this.filesToUpload3 = [];
    }
    this.reseta();
  }
}

uploadimage(){
  var formData: any = new FormData();
  var files1: Array<File> = this.filesToUpload1;
  var files2: Array<File> = this.filesToUpload2;
  var files3: Array<File> = this.filesToUpload3;   
  for (let j = 0; j < files1.length; j++) {
    var fileName = this.filesToUpload1[j]['name'];
    var filename1 = fileName.split('.');
    var lastValue = filename1.length - 1;
    var FileName8 = 'site_logo.' + filename1[lastValue];
    console.log("formget----site_logo---->",fileName)
    formData.append("uploads[]", this.filesToUpload1[j], FileName8);
  }
  for (let k = 0; k < files2.length; k++) {
    var fileName5 = this.filesToUpload2[k]['name'];

    var filename2 = fileName5.split('.');
    var lastValue = filename2.length - 1;
    var FileName7 = 'site_favicon.' + filename2[lastValue];
    formData.append("uploads[]", this.filesToUpload2[k], FileName7);
  }
  for (let i = 0; i < files3.length; i++) {
    var fileName4 = this.filesToUpload3[i]['name'];
    var filename3 = fileName4.split('.');
    var lastValue = filename3.length - 1;
    var FileName9 = 'pairimage.' + filename3[lastValue];
    formData.append("uploads[]", this.filesToUpload3[i], FileName9);
  }
  console.log(this.serviceHost+'uploadsmulti',"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  this.http.post(this.serviceHost+'uploadsmulti',formData).map(files => files.json())
  .subscribe(files => {
    console.log("files----------->");
    console.log(files);
    console.log("lengthhhhh",files.value);
    if (files.status) {
      for (var i = 0; i < files.value.length; i++) {
        var value = files.value[i]
        // var urlSplit = value.key.split('.');
        var urlSplit = value.split(',');
        if (urlSplit[0] == 'site_logo') {
          var site_logo = urlSplit[1];
          this.site.site_logo = urlSplit[1];
          console.log("rrrrrrrrrrrr",this.site.site_logo)
        }
        if (urlSplit[0] == 'site_favicon') {
          // var site_favicon = value.Location;
          // this.site.site_favicon = value.Location;
          var site_favicon = urlSplit[1];
          this.site.site_favicon = urlSplit[1];
        }
        if (urlSplit[0] == 'pairimage') {
          // var site_innerlogo = value.Location;
          // this.site.site_innerlogo = value.Location;
          var site_innerlogo = urlSplit[1];
          this.site.site_innerlogo = urlSplit[1];
        }
      }
      this.savesitesetting(); 
    }else {
      this.savesitesetting();
    }
  });
}


isValid = false;
savesitesetting(){
  this.isValid = true;
  // if(this.cookieService.get('role') == 'admin'){
  console.log("siteeeee",this.site)
  this.commonService.requestData('admin/sitesettingupdate',this.site).subscribe(resData => {
  	console.log("InFORm",resData)
  	if(resData.status==true){
      console.log(this.site,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       this.Emitsocket('sitesettings',this.site);
  	  this.toastr.successToastr('Site setting Information Updated ','Success');
      this.isValid = false;
  	}else{
  	 this.toastr.errorToastr('site Informationnot Updated', 'Error');
  	}           
  });
    // }
    // else{
    // //    this.commonService.requestData('api/subadminupdatesitesetting',this.admindetails)
    // //   .subscribe(resData => {
    // //     this.toastr.successToastr('Site setting Information Updated ','Success');
    // //     this.isValid1 = false;
             
    // // });
    // }
}

  Emitsocket(name,content) {
    this.mysocket.emit(name,content);
    console.log(name,content,"kkkkkkkkkkkkkkkkkkkkkkkkkkk")
  }

isValidsite=false
updatesite(){
    this.isValidsite = true;
        // if(this.cookieService.get('role') == 'admin'){
          var data={
            "address":this.siteinfo.address,
            "mail":this.siteinfo.mail,
            // "skype":this.siteinfo.skype,
            "phone":this.siteinfo.phone,
            "facebook":this.siteinfo.facebook,
            // "youtube":this.siteinfo.youtube,
            "twitter":this.siteinfo.twitter,
            "instagram":this.siteinfo.instagram,
            // "videolink":this.siteinfo.videolink,
            "page":"social"
          }
      console.clear();
      console.log("siteeeee",this.site);
      console.log("obj ----->",data);
      // console.log("siteform.valid ----->",this.siteform.valid);
      // return false;
    this.commonService.requestData('admin/sitesettingupdate',data)
      .subscribe(resData => {
        console.log("InFORm",resData)
        if(resData.status==true){
        this.toastr.successToastr('Site setting Information Updated ','Success');
        this.isValidsite = false;
        }
        else{
        this.toastr.errorToastr('site Informationnot Updated', 'Error');
        }
       
             
    });
  }


  savesitemaintanance(sitesettings){
    console.log("siteeeee",this.site)
    if(this.sitesettings.site_maintaince=="1"){
     	if(this.sitesettings.maintance_detail){
         var siteinput = {
          "site_maintaince":this.sitesettings.site_maintaince,
          "maintance_detail":this.sitesettings.maintance_detail,
          "page":"site"
        };
        this.commonService.requestData('admin/sitesettingupdate',siteinput).subscribe(resData => {
          console.log(siteinputs,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       this.Emitsocket('sitesettings',siteinputs);
          this.toastr.successToastr('Site status Updated Successfully','success');        
        });
     	}else{
        this.toastr.errorToastr('Please give the site status content','Error');  
      }
    }else{
    var siteinputs = {
      "site_maintaince":this.sitesettings.site_maintaince,
      "page":"site"
    };
    this.commonService.requestData('admin/sitesettingupdate',siteinputs).subscribe(resData => {
      console.log(siteinputs,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       this.Emitsocket('sitesettings',siteinputs);
      this.toastr.successToastr('Site status Updated Successfully','success');        
    });
  }
}

  savepattern(){
    let data = {
      "patternlock": $("#patterncode").val(),
      "page":"pattern"
    }
    this.commonService.requestData('admin/sitesettingupdate',data).subscribe(resData => {
      this.toastr.successToastr('Site status Updated Successfully','success');        
    });
  }

}
