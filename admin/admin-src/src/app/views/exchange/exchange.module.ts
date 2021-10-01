import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRoutingModule } from './exchange-routing.module';
import { ExchangeComponent } from './exchange.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';



@NgModule({
  declarations: [ExchangeComponent],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    NgxDatatableModule,
    FormsModule,
    HttpModule
  ]
})
export class ExchangeModule { }
