import { Injectable } from '@angular/core';
import {
    Router,
    Event,
    NavigationStart, RoutesRecognized,RouteConfigLoadStart,
    RouteConfigLoadEnd, NavigationEnd, NavigationCancel, NavigationError
} from '@angular/router';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var google: any;
import { environment } from '../environments/environment';
// import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
// import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CommonService {

  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    display(value: boolean) {
        console.log('LoaderService.display ' + value);
        this.status.next(value);
    }
	headers: Headers;
  options: RequestOptions;
  host = window.location.hostname;
  proto = window.location.protocol;

  serviceHost = environment.BackendHost;
  usersrch: any;
  constructor(private http:Http,private router : Router,private cookieService: CookieService) {
  	this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append("Access-Control-Allow-Origin", '*');
    this.headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    this.headers.append("Access-Control-Allow-Headers", 'Origin, Content-Type, X-Auth-Token');
    this.headers.append("X-XSS-Protection","1; mode=block")
    this.headers.append("Cache-Control", "public, max-age=2592000");
    this.headers.append("Expires", new Date(Date.now() + 2592000000).toUTCString());
     if (this.headers.has('Authorization')) {

    } else {
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('bootManager'));
    }
    this.options = new RequestOptions({ headers: this.headers });

    this.sessioncheck();
  }

  requestData(url,values): Observable<any> {
    this.checkheaders();
    return this.http
    .post(this.serviceHost+url, values, this.options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getData(url): Observable<any> {
    var millis        = Date.now();
    var withdraw_id   =  millis;
    this.checkheaders();
    return this.http
    // .get(this.serviceHost+url, this.options)
    .get(this.serviceHost+url+"?var="+withdraw_id, this.options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  checkheaders(){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append("Access-Control-Allow-Origin", '*');
    this.headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    this.headers.append("Access-Control-Allow-Headers", 'Origin, Content-Type, X-Auth-Token');
    this.headers.append("X-XSS-Protection","1; mode=block")
    this.headers.append("Cache-Control", "public, max-age=2592000");
    this.headers.append("Expires", new Date(Date.now() + 2592000000).toUTCString());
     if (this.headers.has('Authorization')) {

    } else {
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('bootManager'));
    }
    this.options = new RequestOptions({ headers: this.headers });
    // this.sessioncheck();
  }

  setusersrchvalue(usrch): Observable<any> {
     this.usersrch = usrch;
     return this.usersrch;
  }
  
  rounds(value,length=8){
    return value.toFixed(length?length:value);
  }

  testrounds(n, decimal){
      n = parseFloat(n);
      n = n.toString();
      if(n.indexOf(".") == -1){
        n = (+n).toFixed(decimal);
        return n
      } else {
        n = n.slice(0, (n.indexOf(".")) + (decimal + 1));
        n = (+n).toFixed(decimal);
        return n
      }
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

  getData_externalurl(url): Observable<any> {
    return this.http
    .get(url)
    .map(this.extractData)
    .catch(this.handleError);
  }

  ipcheck(){
    // our api call
        this.getData('crons/getaccdetails')
        .subscribe(resData => {
          var ip_status = resData.data;
          if(ip_status == "not_ok"){
              this.router.navigateByUrl(environment.adminurl+'/404');
              return false;
          }else{

          }
          // this.site=resData.data.site_logo
        })
    // our api call
  }

  sessioncheck() {
    // getip();
    if (localStorage.getItem('bootManager')) {
      var date1 = new Date(+localStorage.getItem('datetime'));
      var date2 = new Date();
      if (date2 < date1) {
        date2.setDate(date2.getDate() + 1);
      }
      var diff = +date2 - +date1;
      if(+diff>3600000){
      // if(+diff>2124633){
        localStorage.removeItem('bootManager')
        localStorage.removeItem('datetime')
        // this.cookieService.delete('session');
        // this.cookieService.delete('role');
        this.router.navigateByUrl(environment.adminurl+'/login');
      }
    }
  }
}