import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  admindetails:any={};	
  tfsqrcode = '';

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  constructor(private commonService: CommonService,public toastr: ToastrManager) { }

  ngOnInit() {
  	//login check
      this.commonService.sessioncheck();
      this.commonService.ipcheck();
    //login check

  	this.commonService.getData('admin/adminDetails').subscribe(resData => {
      this.admindetails = resData.data;
      // this.tfsqrcode = 'https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl='+this.admindetails.tfaurl+'';
      this.tfsqrcode = this.admindetails.tfaurl;
   	});

  }
 // oldpassword_check(){
 // 	this.CommonService.getData("admin/admin")
 //  }
 admin:any={};
 isValid2:boolean=false
	savepwd(){
		if(this.admin.newpwdval==this.admin.reenterpwdval){
		var data={
			"currentpwd":this.admin.currentpwdnew,
			"newpwd":this.admin.newpwdval,
			"confirmpwd":this.admin.reenterpwdval
		}
		this.commonService.requestData("admin/changepassword",data).subscribe(resdata=>{
		if(resdata.status==false){
			 this.toastr.errorToastr(resdata.error, 'Oops!');
		}
		else {
			 this.toastr.successToastr('password changed successfully', 'Success!')
		}
		
		})
		}
		else {
			this.toastr.errorToastr('password doesnt match', 'Oops!')

		}
		
	}

isValid3:boolean=false
	savetfa(){
		var data={
			"tfacode":this.admin.tfacode,
			"secret":this.admindetails.secret,
		}
		this.commonService.requestData("admin/tfaupdate",data).subscribe(resdata=>{
		if(resdata.status==false){
			 this.toastr.errorToastr(resdata.message, 'Oops!');
		} else {
			 this.toastr.successToastr(resdata.message, 'Success!')
		}
		
		})
	}
}
