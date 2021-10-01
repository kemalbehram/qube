import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {EarningComponent} from './earning.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule }   from '@angular/forms';
const routes : Routes =  [
  {
      path     : '',
      component: EarningComponent,
  }
];

@NgModule({
  declarations: [EarningComponent],
  imports: [  	
      CommonModule,
      FormsModule,
      // BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      RouterModule.forChild(routes),
      TabsModule.forRoot(),
  ],
  exports     : [
    EarningComponent
  ],
  entryComponents : [EarningComponent]
})
export class EarningModule { }
