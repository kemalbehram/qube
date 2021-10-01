import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfitComponent } from './profit.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProfitComponent,
    data: {
      title: 'profit'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
   exports: [RouterModule]
})
export class ProfitRoutingModule { }
