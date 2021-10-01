import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    HttpModule,
    NgxDatatableModule,
    FormsModule,
    CKEditorModule

  ]
})
export class FaqModule { }
