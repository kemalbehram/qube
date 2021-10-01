import { Component,Inject, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService } from '../../common.service';
import { NgbModal, ModalDismissReasons, NgbTabChangeEvent,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import PatternLock from '../../../assets/patternLock/patternLock';
import * as $ from 'jquery/dist/jquery.min.js';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
submitted: boolean = false;
user: any = {};
loginsession:any;
loginrole:any;
closeResult: string;
modalRef: NgbModalRef;
random_code;
seesiondet;
roledet;
site;
captchavalue = 0;
captchakey:any = environment.Googlecaptcha_key;
resolved(captchaResponse: string) {
    if(captchaResponse){
      this.captchavalue = 1;
    } else {
      this.captchavalue = 0;  
    }
  }
// @ViewChild('loaderModal') loaderModal: ElementRef;
constructor(private toastr: ToastrManager,private CommonService: CommonService,private modalService: NgbModal,private cookieService: CookieService,protected router: Router,private route: ActivatedRoute){
  this.CommonService.ipcheck();
  this.CommonService.getData('admin/siteinform').subscribe(resData => {
    this.site=resData.data.site_logo
  })
  this.urlcheck();
}
ngOnInit(){
	  var lock = new PatternLock("#patternContainer",{
      onDraw:function(pattern){
        var pat = lock.getPattern();
        $("#patterncode").val(pat);
      }
    });
 }
  openLoadermodel(loader){
        // this.otpcode = '';
        this.modalRef = this.modalService.open(loader,{});
        this.modalRef.result.then((result) => {
             this.closeResult = `Closed with: ${result}`;
         }, (reason) => {
             this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

      }
  openOTPmodel(mymodel){
    // this.user.otp ="";
    this.modalRef = this.modalService.open(mymodel,{ backdrop  : 'static',
   keyboard  : false});
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

  tfa = false;
 onSubmit(content){
 	 if($("#patterncode").val() !== "") {
 	 	this.submitted = true;
    var data={
      "emailid":this.user.emailid,
      "password":this.user.password,
      "patternlock": $("#patterncode").val()
    }
    this.CommonService.requestData('admin/admin_login',data).subscribe(resdata=>{
    if(resdata.status==true){
      if(resdata.tfa){
        this.tfa = true;
        this.openOTPmodel(content);
      }else{
        this.tfa = false;
        // if(resdata.data.otp_options==false){
        if(resdata.otp_options==false){
          localStorage.setItem('bootManager', resdata.session)
          // this.cookieService.set('role',resdata.data.role)    
          this.cookieService.set('role',resdata.role)    
          this.toastr.successToastr('You are logged in', 'Success!')
          this.router.navigateByUrl(environment.adminurl+'/dashboard');
        } else {
          // this.random_code=resdata.random_code
          this.toastr.successToastr('Your OTP sent to your mail id successfully!', 'Success!');
          this.openOTPmodel(content);
        }
      }
  }
  else{
    this.toastr.errorToastr(resdata.error, 'Oops!');
    if(resdata.count_ip>=5){
      this.router.navigateByUrl(environment.adminurl+'/404');
    }
  }
      })
        
  }
   else if($("#patterncode").val() == ""){
      this.toastr.errorToastr('Please Verify Pattern Lock', 'Error!');
      this.submitted = false; 
    } 
 }

SaveOTP(loaderModal){
        // code for otp send
            if(this.captchavalue == 1) {
            if(1 == 1) {
              var data={
                'otp':this.user.otp,
                "emailid":this.user.emailid
              }
              this.CommonService.requestData('admin/otpvalidate',data).subscribe(resdata=>{
                if(resdata.status==true){
                localStorage.setItem('bootManager', resdata.session)
                localStorage.setItem('datetime', resdata.date)
                this.cookieService.set('role',resdata.data.role)    
                this.modalRef.close();
                this.toastr.successToastr('You are logged in', 'Success!')
                        setTimeout(() => {
                          // this.modalRef.close();
                        }, 2000);           
                          this.router.navigateByUrl(environment.adminurl+'/dashboard');


                }
                else{
                  this.toastr.errorToastr(resdata.error, 'Oops!');
                }
               
                })
            }
            else{
                this.toastr.errorToastr('Please Verify Captcha', 'Oops!');
                this.submitted = false;
            }
        // code for otp send
      }

}
ResendOTP(){
   var data={
      "emailid":this.user.emailid,
      "password":this.user.password,
      "patternlock": $("#patterncode").val()
    }
this.CommonService.requestData('admin/admin_login',data).subscribe(resdata=>{
// this.random_code=resdata.random_code
this.toastr.successToastr('Otp send to your mail', 'Success!')
  })
}

SaveTFA(loaderModal){
        // code for tfa
          if(this.captchavalue == 1) {
          if(1 == 1) {
            var data={
              'otp':this.user.otp,
              "emailid":this.user.emailid
            }
            this.CommonService.requestData('admin/tfavalidate',data).subscribe(resdata=>{
              if(resdata.status==true){
                localStorage.setItem('bootManager', resdata.session)
                localStorage.setItem('datetime', resdata.date)
                this.cookieService.set('role',resdata.data.role)  
                this.modalRef.close();
                this.toastr.successToastr('You are logged in', 'Success!')
                  setTimeout(() => {
                    // this.modalRef.close();
                  }, 2000);           
                    this.router.navigateByUrl(environment.adminurl+'/dashboard');
              } else {
                this.toastr.errorToastr(resdata.error, 'Oops!');
              }
            })
          }
          else{
              this.toastr.errorToastr('Please Verify Captcha', 'Oops!');
              this.submitted = false;
          }
        }
        // code for tfa
}

resetpwd(){
    this.router.navigateByUrl(environment.adminurl+'/resetpwd'); 
}
urlcheck(){
  let path= this.route.snapshot.queryParamMap.get('ipkcolbnu');
  if(+path){
    this.CommonService.requestData('admin/Unblock_Ip',{random:path}).subscribe(resdata=>{
      if(resdata.status==false){
        this.toastr.errorToastr(resdata.Msg, 'Oops!');
        this.router.navigateByUrl(environment.adminurl+'/404');
      }
    })
  }
}

resetpattern(){
    this.router.navigateByUrl(environment.adminurl+'/resetpattern'); 
}

}
