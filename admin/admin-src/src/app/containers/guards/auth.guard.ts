import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../user.service';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import { CommonService } from '../../common.service';
import { CacheService, CacheStoragesEnum } from 'ng2-cache';
declare var $: any;
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(private userService:UserService,private router: Router,private idle : Idle,private reqHelper:CommonService,private _cacheService: CacheService) {
	 
 }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	console.log(this.userService.userLogged());
  	if (this.userService.userLogged())
	{
		// this.idle_run();
      	return true;
    }
	else
	{
		//this.idle.stop();
		this.router.navigate([environment.adminurl+'/login'],{ queryParams: { returnUrl: state.url }});
	}
    return false;
  }

  idle_run() {
    window.addEventListener('scroll',(e: Event) => {
        this.idlereset();
    });
    window.onload = () => { this.idlereset(); };
    window.onmousemove = () => { this.idlereset(); };
    window.onmousedown = () => { this.idlereset(); };
    window.onclick = () => { this.idlereset(); };
    window.onscroll = () => { this.idlereset(); };
    window.onkeypress = () => { this.idlereset(); };
  }

loginhistory = {"ipaddress": "","location": "","browser": "",
  "deviceinfo": "","logindatetime": new Date(),"loginstatus": ""};


 idlereset() {

  	if (this.userService.userLogged()) {
	    // this.idle.watch();
	    this.idle.setIdle(100);
	    this.idle.setTimeout(300);
	    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

	    this.idle.onTimeoutWarning.subscribe((countdown:number) => {
	    });

	    this.idle.onTimeout.subscribe(() => {
	    this._cacheService.removeAll();
         this.router.navigate([environment.adminurl+'/login']);
        // });
	    });
	    this.idle.watch();
	}
	else{
		this.idle.stop();
	}
  }
}
