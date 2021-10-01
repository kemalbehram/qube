import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ArtdetailsComponent} from './artdetails.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';

const routes : Routes =  [
  {
      path     : '',
      component: ArtdetailsComponent,
  }
];

@NgModule({
  declarations: [ArtdetailsComponent],
  imports: [  	
      CommonModule,
      FormsModule,
      // BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      RouterModule.forChild(routes),
      ProgressbarModule.forRoot(),
      AccordionModule.forRoot(),
      TabsModule.forRoot(),
  ],
  exports     : [
    ArtdetailsComponent
  ],
  entryComponents : [ArtdetailsComponent]
})
export class ArtdetailsModule { }
