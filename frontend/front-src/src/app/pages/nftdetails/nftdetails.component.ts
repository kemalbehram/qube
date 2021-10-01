import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nftdetails',
  templateUrl: './nftdetails.component.html',
  styleUrls: ['./nftdetails.component.scss']
})
export class NftdetailsComponent implements OnInit {
	downDrop:Boolean=false;
  	constructor() { }

  	ngOnInit() {
  	}

  	downSec(){
	  	if(this.downDrop){
	  		this.downDrop=false;
	  	}else{
	  		this.downDrop=true;
	  	}
  	}
}
