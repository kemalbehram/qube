import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticRoutingModule } from './static-routing.module';
import { StaticComponent } from './static.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
 import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
  declarations: [StaticComponent],
  imports: [
    CommonModule,
    StaticRoutingModule,
    NgxDatatableModule,
    FormsModule,
    CKEditorModule,
    MyDatePickerModule
  ]
})
export class StaticModule { }
