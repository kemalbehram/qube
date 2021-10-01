import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {PairviewComponent} from './pairview.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {NgxPaginationModule} from 'ngx-pagination';
import { HighchartsChartModule } from 'highcharts-angular';
import { TimeagoModule } from 'ngx-timeago';

const routes : Routes =  [
  {
      path     : '',
      component: PairviewComponent,
  }
];

@NgModule({
  declarations: [PairviewComponent],
  imports: [  	
      CommonModule,
      FormsModule,
      NgxPaginationModule,
      // BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      TimeagoModule.forRoot(),
      RouterModule.forChild(routes),
      TabsModule.forRoot(),
      HighchartsChartModule
  ],
  exports     : [
    PairviewComponent
  ],
  entryComponents : [PairviewComponent]
})
export class PairviewModule { }
