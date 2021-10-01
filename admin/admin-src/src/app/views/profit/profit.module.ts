import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfitRoutingModule } from './profit-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProfitComponent } from './profit.component';

@NgModule({
  declarations: [ProfitComponent],
  imports: [
    CommonModule,
    ProfitRoutingModule,
    HttpModule,
    FormsModule,
    NgxDatatableModule
  ]
})
export class ProfitModule { }
