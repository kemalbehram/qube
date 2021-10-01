import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [CmsComponent],
  imports: [
    CommonModule,
    CmsRoutingModule,
    NgxDatatableModule,
    FormsModule,
    CKEditorModule,
    TabsModule
  ]
})
export class CmsModule { }
