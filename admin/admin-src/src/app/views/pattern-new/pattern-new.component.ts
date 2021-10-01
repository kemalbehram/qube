import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as $ from 'jquery/dist/jquery.min.js';
import PatternLock from '../../../assets/patternLock/patternLock';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../../common.service';
import * as CryptoJS from 'crypto-js';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pattern-new',
  templateUrl: './pattern-new.component.html',
  styleUrls: ['./pattern-new.component.scss']
})
export class PatternNewComponent implements OnInit {
  site;
  submitted: boolean = false;
  captchavalue = 0;
  captchakey:any = environment.Googlecaptcha_key;
  key = CryptoJS.enc.Base64.parse("#base64Key#");
  iv  = CryptoJS.enc.Base64.parse("#base64IV#");
  resolved(captchaResponse: string) {
    if(captchaResponse){
      this.captchavalue = 1;
    } else {
      this.captchavalue = 0;  
    }
  }
  constructor(private commonService: CommonService,public toastr: ToastrManager,protected router:Router,private route: ActivatedRoute,private idle : Idle) { 
    this.commonService.ipcheck();
    this.commonService.getData('admin/siteinform').subscribe(resData => {
      this.site=resData.data.site_logo
    })
  }

  ngOnInit() {
  var lock = new PatternLock("#patternContainer",{
      onDraw:function(pattern){
        var pat = lock.getPattern();
        $("#patterncode").val(pat);
      }
    });

   var lock1 = new PatternLock("#patternContainer1",{
      onDraw:function(pattern){
        var pat1 = lock1.getPattern();
        $("#patterncode1").val(pat1);
      }
    });
  }

  onSubmit(){
    this.submitted = true;
    if($("#patterncode").val() !== "") {
      let pattern =$("#patterncode").val()
      if($("#patterncode1").val() !== "") {
        let confirmpattern =$("#patterncode1").val()
        if(pattern==confirmpattern){
          const userId: string = this.route.snapshot.queryParamMap.get('dfd');
          var outs =userId.replace(/\s/g, "");
          var yes_decrypt  = CryptoJS.AES.decrypt(outs, this.key, {iv: this.iv});
          var datas = {
            pattern : pattern,
            session : outs,
            type:"resetuser"
          };
          this.commonService.requestData('admin/reset_newptrn', datas).subscribe(resData => {
            if(resData.status==true) {
              this.toastr.successToastr('Your Pattern have been updated. Login to continue.');
              this.submitted = false;
              this.router.navigateByUrl(environment.adminurl+'/login');
            }else{
              this.toastr.errorToastr(resData.errMsg,"Error")
            }
          });
        }else{
          this.toastr.errorToastr('Pattern does not match',"Error")
        }
      }else if($("#patterncode1").val() == ""){
        this.toastr.errorToastr('Please Verify Confirm Pattern Lock', 'Error!');
        this.submitted = false; 
      } 
    }else if($("#patterncode").val() == ""){
      this.toastr.errorToastr('Please Verify Pattern Lock', 'Error!');
      this.submitted = false; 
    }  
  }


}
