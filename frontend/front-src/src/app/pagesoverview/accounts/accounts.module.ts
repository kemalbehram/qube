import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AccountsComponent} from './accounts.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {NgxPaginationModule} from 'ngx-pagination';

const routes : Routes =  [
  {
      path     : '',
      component: AccountsComponent,
  }
];

@NgModule({
  declarations: [AccountsComponent],
  imports: [  	
      CommonModule,
      FormsModule,
      // BrowserAnimationsModule,
       NgxPaginationModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      RouterModule.forChild(routes),
      TabsModule.forRoot(),
  ],
  exports     : [
    AccountsComponent
  ],
  entryComponents : [AccountsComponent]
})
export class AccountsModule { }
