import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [BannerComponent],
  imports: [
   CommonModule,
    NgxDatatableModule,
    FormsModule,
    CKEditorModule,
    MyDatePickerModule,
    CommonModule,
    BannerRoutingModule
  ]
})
export class BannerModule { }
