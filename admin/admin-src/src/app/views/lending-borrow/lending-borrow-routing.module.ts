import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendingBorrowComponent } from './lending-borrow.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: LendingBorrowComponent,
    data: {
      title: 'lending-borrow'
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
export class LendingBorrowRoutingModule { }
