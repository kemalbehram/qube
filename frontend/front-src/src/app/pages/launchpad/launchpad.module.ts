import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {LaunchpadComponent} from './launchpad.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';

const routes : Routes =  [
  {
      path     : '',
      component: LaunchpadComponent,
  }
];

@NgModule({
  declarations: [LaunchpadComponent],
  imports: [  	
      CommonModule,
      FormsModule,
      // BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      RouterModule.forChild(routes),
      ProgressbarModule.forRoot(),
      AccordionModule.forRoot(),
  ],
  exports     : [
    LaunchpadComponent
  ],
  entryComponents : [LaunchpadComponent]
})
export class LaunchpadModule { }
