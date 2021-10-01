import { Injectable } from '@angular/core';
import {
    Router,
    Event,
    NavigationStart,ActivatedRoute, RoutesRecognized,RouteConfigLoadStart,
    RouteConfigLoadEnd, NavigationEnd, NavigationCancel, NavigationError
} from '@angular/router';

// new service
	import { HttpClient, HttpHeaders } from '@angular/common/http';
// new service
	import { Observable } from 'rxjs';
	import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

	headers: HttpHeaders;
	host 			= window.location.hostname;
	proto 			= window.location.protocol;
	serviceHost 	= environment.BackendHost;
  	constructor(private http: HttpClient,private router : Router,private route:ActivatedRoute) { 
  		this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	    this.headers.append("Access-Control-Allow-Origin", '*');
	    this.headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
	    this.headers.append("Access-Control-Allow-Headers", 'Origin, Content-Type, X-Auth-Token');
	    this.headers.append("X-XSS-Protection","1; mode=block")
	    this.headers.append("Cache-Control", "public, max-age=2592000");
	    this.headers.append("Expires", new Date(Date.now() + 2592000000).toUTCString());
  	}

    postUrl(uri, data) {
		this.checkheaders();
		return this.http.post(this.serviceHost + uri, data, { headers: this.headers });
	}

	getUrl(uri) {
		this.checkheaders();
		return this.http.get(this.serviceHost + uri, { headers: this.headers });
	}

	getData_externalurl(uri) {
		return this.http.get(uri);
	}

	checkheaders(){
		this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		this.headers.append("Access-Control-Allow-Origin", '*');
		this.headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
		this.headers.append("Access-Control-Allow-Headers", 'Origin, Content-Type, X-Auth-Token');
		this.headers.append("X-XSS-Protection","1; mode=block")
		this.headers.append("Cache-Control", "public, max-age=2592000");
		this.headers.append("Expires", new Date(Date.now() + 2592000000).toUTCString());
	}

}
