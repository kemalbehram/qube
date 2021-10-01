import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoggedGuard implements CanActivate {

	constructor(private userService:UserService,private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
if (!this.userService.userLogged())
{
      return true;
    }
else
{
	this.router.navigate([environment.adminurl+'/dashboard']);
		}
    return false;
  }
}
