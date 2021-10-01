import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendingWithdrawComponent } from './lending-withdraw.component';
import { LendingWithdrawRoutingModule } from './lending-withdraw-routing.module';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [LendingWithdrawComponent],
  imports: [
    CommonModule,
    LendingWithdrawRoutingModule,
    HttpModule,
    NgxDatatableModule,
    FormsModule
  ],
  exports:[LendingWithdrawComponent]
})
export class LendingWithdrawModule { }
