import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendingWithdrawComponent } from './lending-withdraw.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: LendingWithdrawComponent,
    data: {
      title: 'lending-withdraw'
    }
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
})
export class LendingWithdrawRoutingModule { }
