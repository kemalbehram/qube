import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminloghistoryRoutingModule } from './adminloghistory-routing.module';
import { AdminloghistoryComponent } from './adminloghistory.component';
import { FormsModule }   from '@angular/forms';
import { environment } from '../../../environments/environment';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [AdminloghistoryComponent],
  imports: [
    CommonModule,
    AdminloghistoryRoutingModule,
    FormsModule,
	NgxDatatableModule
  ]
})
export class AdminloghistoryModule { }
