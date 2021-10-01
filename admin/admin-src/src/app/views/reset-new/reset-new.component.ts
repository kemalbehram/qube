import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../../common.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-new',
  templateUrl: './reset-new.component.html',
  styleUrls: ['./reset-new.component.scss']
})
export class ResetNewComponent implements OnInit {
user: any = {};
submitted = false;
site;
response;
captchakey:any = environment.Googlecaptcha_key;
captcha="";
  key = CryptoJS.enc.Base64.parse("#base64Key#");
  iv  = CryptoJS.enc.Base64.parse("#base64IV#");

  captchavalue = 0;
 resolved(captchaResponse: string) {
    if(captchaResponse){
      this.captchavalue = 1;
    } else {
      this.captchavalue = 0;  
    }
  }
  constructor(private commonService: CommonService,public toastr: ToastrManager,protected router:Router,private route: ActivatedRoute,private idle : Idle) {
    this.commonService.ipcheck();
  	this.commonService.getData('admin/siteinform')
      .subscribe(resData => {
        this.site=resData.data.site_logo
      })
   }

  ngOnInit() {
  }
onSubmit()
{
 // if(this.response){
 this.submitted = true;
const userId: string = this.route.snapshot.queryParamMap.get('dfd');
  

 var outs =userId.replace(/\s/g, "");
  var yes_decrypt  = CryptoJS.AES.decrypt(outs, this.key, {iv: this.iv});
var datas = 
{
   password : this.user.password,
   session : outs,
   type:"resetuser"
 };
 if((this.user.password!=null && this.user.password!="" && this.user.password.trim()!="" ) &&(this.user.confirmPassword!=null && this.user.confirmPassword!="" && this.user.confirmPassword.trim()!="")){
  if(this.user.password==this.user.confirmPassword)
{

    this.commonService.requestData('admin/reset_newpwd', datas).subscribe(resData => {
  if(resData.status==true) {
     this.toastr.successToastr('Your password have been updated. Login to continue.');
       // resetform.reset();
       this.submitted = false;
         // setTimeout(()=>{
         // this.idle.stop();
         // this.userService.setUser(false);
        this.router.navigateByUrl(environment.adminurl+'/login');
          // }, 1000);
    }
    else{
      this.toastr.errorToastr(resData.errMsg,"Error")
    }
  });
}
else{
  this.toastr.errorToastr('password does not match',"Error")
}
 }
 else{
  this.toastr.errorToastr('Please Fill the field properly');
 }

// }
// else{
// // 	 this.toastr.errorToastr('Please Verify Captcha');
// }
}
}
