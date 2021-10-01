import { Component, OnDestroy, Inject } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  redirectDelay: number = 0;
  site="";
  copyright="";
  site_logo:any={};
  admindetails:any
admin_image;
admin_name;
adminbaseurl:any;
  constructor(private cookieService:CookieService,protected router:Router,private commonService:CommonService,private mysocket: Socket) {
    this.adminbaseurl = environment.adminurl;
    this.siteinfrom();
    this.admindetailsinfo();
     // var data = {"id" : this.cookieService.get('session')};
    if(this.cookieService.get('role') == 'subadmin') {
      this.commonService.getData('admin/adminDetails').subscribe(resData => {
        this.admindetails = resData.data;
        this.admindetails.access.push('Dashboard','Settings');
        this.navItems = navItems.filter(item => {
          return this.admindetails.access.indexOf(item.name) > -1 ;
        });

      });
    }
     this.mysocket.on('getdetails', function (data) {
      this.site=data.sitedetails.site_logo
      this.copyright=data.sitedetails.copyrights
    }.bind(this));

       this.mysocket.on('getadmin', function (data) {
      this.admin_name=data.admininfo.admin_name
      this.admin_image=data.admininfo.admin_image
    }.bind(this));
  }

  ngOnDestroy(): void {
    // this.changes.disconnect();
  }
    Emitsocket(name,content) {
    this.mysocket.emit(name,content);
  }
  admindetailsinfo(){
    this.commonService.getData('admin/adminDetails')
      .subscribe(resData => {
        this.admin_image=resData.data.admin_image
        this.admin_name=resData.data.admin_name
        // this.site=resData.data.site_logo
      })
  }
   siteinfrom(){
    this.commonService.getData('admin/siteinform')
      .subscribe(resData => {
        this.site=resData.data.site_logo
        this.copyright=resData.data.copyrights
      })
  }
    Logout(){

      this.router.navigateByUrl(environment.adminurl+'/login');
      localStorage.removeItem('bootManager')
      this.cookieService.delete('session');
      this.cookieService.delete('role');
    
  }
}
