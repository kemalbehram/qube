import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FooterComponent} from './footer.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [FooterComponent],
  imports: [  	
      CommonModule,
      // BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
  ],
  exports     : [
    FooterComponent
  ],
  entryComponents : [FooterComponent]
})
export class FooterModule { }
