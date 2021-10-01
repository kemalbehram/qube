import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-setip',
  templateUrl: './setip.component.html',
  styleUrls: ['./setip.component.scss']
})
export class SetipComponent implements OnInit {

  constructor(private toastr: ToastrManager,private CommonService: CommonService,protected router: Router) { 
  		// alert("return");
  		this.CommonService.getData('VYbe2FnA2L')
      	.subscribe(resData => {
        	this.toastr.successToastr('You are request has been processed', 'Success!')
          	this.router.navigateByUrl(environment.adminurl+'/login');
      })
  }

  ngOnInit() {
  }

}
