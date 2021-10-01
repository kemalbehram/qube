import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PairsRoutingModule } from './pairs-routing.module';
import { PairsComponent } from './pairs.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';



@NgModule({
  declarations: [PairsComponent],
  imports: [
    CommonModule,
    PairsRoutingModule,
    NgxDatatableModule,
    FormsModule,
    HttpModule
  ]
})
export class PairsModule { }
