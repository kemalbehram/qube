import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AccountsviewComponent} from './accountsview.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {ActivatedRoute,NavigationEnd, Router} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { TimeagoModule } from 'ngx-timeago';
import { HighchartsChartModule } from 'highcharts-angular';

const routes : Routes =  [
  {
      path     : '',
      component: AccountsviewComponent,
  }
];

@NgModule({
  declarations: [AccountsviewComponent],
  imports: [  	
      CommonModule,
      FormsModule,
      NgxPaginationModule,
      // BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      TimeagoModule.forRoot(),
      RouterModule.forChild(routes),
      HighchartsChartModule,
      TabsModule.forRoot(),
  ],
  exports     : [
    AccountsviewComponent
  ],
  entryComponents : [AccountsviewComponent]
})
export class AccountsviewModule { }
