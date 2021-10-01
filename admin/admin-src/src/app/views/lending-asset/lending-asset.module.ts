import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendingAssetComponent } from './lending-asset.component';
import { LendingAssetRoutingModule } from './lending-asset-routing.module';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [LendingAssetComponent],
  imports: [
    CommonModule,
    LendingAssetRoutingModule,
    HttpModule,
    NgxDatatableModule,
    FormsModule,
    CKEditorModule
  ],
  exports:[LendingAssetComponent]
})
export class LendingAssetModule { }
