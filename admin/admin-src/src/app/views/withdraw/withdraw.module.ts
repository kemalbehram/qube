import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawRoutingModule } from './withdraw-routing.module';
import { WithdrawComponent } from './withdraw.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [WithdrawComponent],
  imports: [
    CommonModule,
    WithdrawRoutingModule,
    FormsModule,
    NgxDatatableModule
  ]
})
export class WithdrawModule { }
