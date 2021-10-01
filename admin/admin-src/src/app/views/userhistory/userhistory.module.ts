import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserhistoryRoutingModule } from './userhistory-routing.module';
import { UserhistoryComponent } from './userhistory.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';



@NgModule({
  declarations: [UserhistoryComponent],
  imports: [
    CommonModule,
    UserhistoryRoutingModule,
    NgxDatatableModule,
    FormsModule,
    HttpModule
  ]
})
export class UserhistoryModule { }
