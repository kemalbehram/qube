import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NftComponent implements OnInit {
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
