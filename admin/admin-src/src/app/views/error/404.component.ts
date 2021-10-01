import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component {
	adminbaseurl:any;
  constructor() {
  	this.adminbaseurl = environment.adminurl;
   
  }

}
