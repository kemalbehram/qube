import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendingComponent } from './lending.component';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { LendingRoutingModule } from './lending-routing.module';

@NgModule({
  declarations: [LendingComponent],
  imports: [
    CommonModule,
    LendingRoutingModule,
    HttpModule,
    NgxDatatableModule,
    FormsModule
  ],
  exports:[LendingComponent]
})
export class LendingModule { }
