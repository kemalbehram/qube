import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NftComponent} from './nft.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';

const routes : Routes =  [
  {
      path     : '',
      component: NftComponent,
  }
];

@NgModule({
  declarations: [NftComponent],
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
    NftComponent
  ],
  entryComponents : [NftComponent]
})
export class NftModule { }
