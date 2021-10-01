import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    RouterModule,
  ],
  exports     : [
    SidebarComponent
  ],
  entryComponents : [SidebarComponent]
})
export class SidebarModule { }
