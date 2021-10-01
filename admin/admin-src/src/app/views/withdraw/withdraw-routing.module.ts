import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawComponent } from './withdraw.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WithdrawComponent,
    data: {
      title: 'withdraw'
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
export class WithdrawRoutingModule { }
