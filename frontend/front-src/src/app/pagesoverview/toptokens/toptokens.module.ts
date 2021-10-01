import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ToptokensComponent} from './toptokens.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {NgxPaginationModule} from 'ngx-pagination';

const routes : Routes =  [
  {
      path     : '',
      component: ToptokensComponent,
  }
];

@NgModule({
  declarations: [ToptokensComponent],
  imports: [  	
      CommonModule,
      FormsModule,
      NgxPaginationModule,
      // BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      RouterModule.forChild(routes),
      TabsModule.forRoot(),
  ],
  exports     : [
    ToptokensComponent
  ],
  entryComponents : [ToptokensComponent]
})
export class ToptokensModule { }
