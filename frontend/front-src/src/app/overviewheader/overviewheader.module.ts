import { NgModule } from '@angular/core';
import { RouterModule ,Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {OverviewheaderComponent} from './overviewheader.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

const routes : Routes =  [
  {
      path     : '',
      component: OverviewheaderComponent,
  }
];

@NgModule({
  declarations: [OverviewheaderComponent],
  imports: [  	
      CommonModule,
      // BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule,
      ModalModule.forRoot(),
  ],
  exports     : [
    OverviewheaderComponent
  ],
  entryComponents : [OverviewheaderComponent]
})
export class OverviewheaderModule { }
