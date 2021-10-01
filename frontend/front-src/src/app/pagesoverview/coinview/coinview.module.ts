import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {CoinviewComponent} from './coinview.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {NgxPaginationModule} from 'ngx-pagination';
import { TimeagoModule } from 'ngx-timeago';
import { HighchartsChartModule } from 'highcharts-angular';

const routes : Routes =  [
  {
      path     : '',
      component: CoinviewComponent,
  }
];

@NgModule({
  declarations: [CoinviewComponent],
  imports: [  	
      CommonModule,
      FormsModule,
      NgxPaginationModule,
      // BrowserAnimationsModule,
      TimeagoModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      RouterModule.forChild(routes),
      TabsModule.forRoot(),
      HighchartsChartModule
  ],
  exports     : [
    CoinviewComponent
  ],
  entryComponents : [CoinviewComponent]
})
export class CoinviewModule { }
