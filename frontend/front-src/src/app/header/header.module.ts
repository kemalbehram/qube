import { NgModule } from '@angular/core';
import { RouterModule ,Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

const routes : Routes =  [
  {
      path     : '',
      component: HeaderComponent,
  }
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [  	
      CommonModule,
      // BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule,
      ModalModule.forRoot(),
  ],
  exports     : [
    HeaderComponent
  ],
  entryComponents : [HeaderComponent]
})
export class HeaderModule { }
