import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminloghistoryComponent } from './adminloghistory.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminloghistoryComponent,
    data: {
      title: 'adminlog'
    }
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     RouterModule.forChild(routes)

  ],
    exports: [RouterModule]

})
export class AdminloghistoryRoutingModule { }
