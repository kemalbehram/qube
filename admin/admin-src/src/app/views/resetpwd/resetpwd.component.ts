import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../../common.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss']
})
export class ResetpwdComponent implements OnInit {
	user: any = {};
submitted = false;
site;
submitted_otp = false;
  constructor(private commonService: CommonService,public toastr: ToastrManager,protected router:Router) {
  this.commonService.getData('admin/siteinform')
      .subscribe(resData => {
        this.site=resData.data.site_logo
      }) }

  ngOnInit() {
  this.commonService.ipcheck();
  }
    requestPass(){
          var obj={
            "emailid":this.user.admin_emailid,
             "type":"password"
          }
    	 // this.errors = this.messages = [];
        this.submitted = true;

        this.commonService.requestData('admin/send_otp',obj)
          .subscribe(resData => {
            if(resData.status == true) {
               this.submitted = false;
               //this.user = '';
              this.toastr.successToastr('OTP is sent to your mail', 'Success!');

              // setTimeout(() => {
              //     this.router.navigateByUrl('/GAM23dIXa1aZ/login');

              // }, 1000);
            } else {
              this.submitted = false;
              this.toastr.errorToastr(resData.message, 'Oops!');          
            }
        });
    }

    Otpgenerate()
    {
       var data = {
  
          'otp':this.user.otp,
          "emailid":this.user.admin_emailid
       }
        this.submitted_otp = true;
        this.commonService.requestData('admin/forgetPwdAdmin',data).subscribe(resdata=>{
                if(resdata.status==true){
                    this.submitted_otp = false;
                  this.toastr.successToastr('Success!')
                    setTimeout(() => {
                      this.router.navigateByUrl(environment.adminurl+'/login');
                   }, 1000);
                  //this.modalRef.close();   
                }
                else{
                   this.submitted_otp = false;
                  this.toastr.errorToastr(resdata.error, 'Oops!');
                }
               
       })

        //   var obj={
        //     "emailid":this.user.admin_emailid
        //   }
        // this.submitted = true;
        // this.commonService.requestData('admin/forgetPwdAdmin',obj)
        //   .subscribe(resData => {
        //     if(resData.status == true) {
        //        this.submitted = false;
        //        this.user = '';
        //       this.toastr.successToastr('OTP is sent to your mail', 'Success!');

        //       setTimeout(() => {
        //           this.router.navigateByUrl('/GAM23dIXa1aZ/login');

        //       }, 1000);
        //     } else {
        //       this.submitted = false;
        //       this.toastr.errorToastr(resData.message, 'Oops!');          
        //     }
        // });
    }
    descimalkey(evt)
       {
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if (charCode != 46 && charCode > 31 
            && (charCode < 48 || charCode > 57))
             return false;

          return true;
       }
  
}
