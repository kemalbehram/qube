import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LendingComponent } from './lending.component';

const routes: Routes = [{
    path: '',
    component: LendingComponent,
    data: {
      title: 'lending'
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
export class LendingRoutingModule { }
