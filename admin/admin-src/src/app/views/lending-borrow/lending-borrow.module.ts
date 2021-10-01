import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendingBorrowComponent } from './lending-borrow.component';
import { LendingBorrowRoutingModule } from './lending-borrow-routing.module';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [LendingBorrowComponent],
  imports: [
    CommonModule,
    LendingBorrowRoutingModule,
    HttpModule,
    NgxDatatableModule,
    FormsModule
  ],
  exports:[LendingBorrowComponent]
})
export class LendingBorrowModule { }
