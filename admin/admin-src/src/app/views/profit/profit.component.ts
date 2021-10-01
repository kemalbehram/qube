import { Component, OnInit} from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss']
})
export class ProfitComponent implements OnInit {
  submitted = false;
  privKeys;
  imported = false;
  recentlyAdded = false;

  constructor(private CommonService:CommonService, private toastr:ToastrManager){
    
  }

  ngOnInit(){
    this.checkStatus();
  }

  checkStatus(){
    this.CommonService.getData('admin/getPrivatekeyStatus').subscribe((res:any)=>{
      if(res.status){
        let data = res.data;
        if(data.adminPrivatekey_status){
          this.imported = true;
        }
      }
    })
  }

  requestKey(){
    this.CommonService.requestData('admin/importPrivKey',{key:this.privKeys}).subscribe((res:any)=>{
      if(res.status){
        this.toastr.successToastr(res.msg, "Success!!");
        this.recentlyAdded = true;
      }
    })
  }
}
