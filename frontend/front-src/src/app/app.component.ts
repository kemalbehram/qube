import { Component } from '@angular/core';
import { DataService } from './common/services/api/data.service';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
// import { Socket } from 'ngx-socket-io';
declare var changeFavicon: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Qube';
// title = 'frontend';
favicon:any;
output:any={};

constructor(private router : Router,public CommonService :DataService) {
	this.siteinfo();
  this.checkIP();
  // this.socket.on('getdetails', function(data) {
  //   alert("Socket Listened")
  // }.bind(this))
  
}
 
 ngOnInit(){
 }
siteinfo() {
  this.CommonService.getUrl('crons/siteinform').subscribe((result:any)=>{
    this.output = result.data;
    this.favicon = (this.output.site_favicon) ? this.output.site_favicon : '';
    var siteName = (this.output.site_name) ? this.output.site_name : '';
    changeFavicon(this.favicon, siteName);
    if(this.output.site_maintaince == '1' ){
      this.router.navigate(['/underconstruction']);
    }else if(this.output.site_maintaince == '0') {
      // this.router.navigate(['/']);
    }
  });
}

checkIP() {
  this.CommonService.postUrl('admin/chkipaddress',{}).subscribe((resData:any)=>{ 
    if(resData.status==false){
      if(resData.data[0].status==0){
        this.router.navigate(['/pagenotfound']);
        localStorage.clear();
      }
    }
  })
}


}