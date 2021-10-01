import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../../common.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-pattern',
  templateUrl: './reset-pattern.component.html',
  styleUrls: ['./reset-pattern.component.scss']
})
export class ResetPatternComponent implements OnInit {
	user: any = {};
	submitted = false;
	site;
	submitted_otp = false;
  	constructor(private commonService: CommonService,public toastr: ToastrManager,protected router:Router) {
  		this.commonService.getData('admin/siteinform').subscribe(resData => {
	        this.site=resData.data.site_logo
      	}) 
 	}

	ngOnInit() {
		this.commonService.ipcheck();
	}

  	requestPass(){
        var obj={
            "emailid":this.user.admin_emailid,
            "type":"pattern"
        }
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

  	Otpgenerate(){
       	var data = {
          'otp':this.user.otp,
          "emailid":this.user.admin_emailid
       	}
        this.submitted_otp = true;
        this.commonService.requestData('admin/forgetPtrnAdmin',data).subscribe(resdata=>{
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
    }

    descimalkey(evt){
      	var charCode = (evt.which) ? evt.which : evt.keyCode;
	    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;

	    return true;
      }
}
