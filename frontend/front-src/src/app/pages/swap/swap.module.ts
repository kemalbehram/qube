import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SwapComponent} from './swap.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

const routes : Routes =  [
  {
      path     : '',
      component: SwapComponent,
  }
];

@NgModule({
  declarations: [SwapComponent],
  imports: [  	
      CommonModule,
      FormsModule,
      // BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      RouterModule.forChild(routes),
  ],
  exports     : [
    SwapComponent
  ],
  entryComponents : [SwapComponent]
})
export class SwapModule { }
