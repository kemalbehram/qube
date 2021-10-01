import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/common/services/api/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	site:any={}
  constructor(private dataservice:DataService) { }

  ngOnInit() {
  this.siteinfo();
  }

  siteinfo() {
	   	this.dataservice.getUrl('crons/siteinform').subscribe((result:any)=>{
	   		this.site=result.data;
		});
	}
}
