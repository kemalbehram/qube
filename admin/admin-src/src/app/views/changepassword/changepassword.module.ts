import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangepasswordRoutingModule } from './changepassword-routing.module';
import { ChangepasswordComponent } from './changepassword.component';
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [ChangepasswordComponent],
  imports: [
    CommonModule,
    ChangepasswordRoutingModule,
    FormsModule

  ]
})
export class ChangepasswordModule { }
