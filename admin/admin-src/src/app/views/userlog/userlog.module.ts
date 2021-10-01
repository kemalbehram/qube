import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlogRoutingModule } from './userlog-routing.module';
import { UserlogComponent } from './userlog.component';
import { FormsModule }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [UserlogComponent],
  imports: [
    CommonModule,
    UserlogRoutingModule,
    FormsModule,
	NgxDatatableModule
  ]
})
export class UserlogModule { }
