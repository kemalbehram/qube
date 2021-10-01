import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { CurrencyRoutingModule } from './currency-routing.module';


@NgModule({
  declarations: [CurrencyComponent],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    HttpModule,
    NgxDatatableModule,
    FormsModule
  ],
  exports:[CurrencyComponent]
})

export class CurrencyModule { }
