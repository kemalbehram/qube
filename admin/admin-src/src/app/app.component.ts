import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonService } from './common.service';
declare var changeFavicon: Function;
import { environment } from '../environments/environment';

import { Socket } from 'ngx-socket-io';


@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  admindetails:any
  menu=[];
  favicon:any;
  sitename;
  constructor(private router: Router,private dbHelper:CommonService,public socket: Socket) {
    this.dbHelper.getData('admin/siteinform').subscribe(resData => {      
      this.favicon = resData.data.site_favicon;
      this.sitename=resData.data.site_name
      changeFavicon(this.favicon,this.sitename);
    });  
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.socket.on('emit_achangepassword', function (data) {
      this.router.navigateByUrl(environment.adminurl+'/login');
      localStorage.removeItem('bootManager')
      this.cookieService.delete('session');
      this.cookieService.delete('role');
    
    }.bind(this));

    // this.socket.on('getdeactivetfa', function (data) {  
    // }.bind(this));
      
  }
}
