import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {OverviewComponent} from './overview.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HighchartsChartModule } from 'highcharts-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { TimeagoModule } from 'ngx-timeago';

const routes : Routes =  [
  {
      path     : '',
      component: OverviewComponent,
  }
];

@NgModule({
  declarations: [OverviewComponent],
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
    OverviewComponent
  ],
  entryComponents : [OverviewComponent]
})
export class OverviewModule { }
