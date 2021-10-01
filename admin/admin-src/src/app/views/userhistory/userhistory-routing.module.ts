import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserhistoryComponent } from './userhistory.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserhistoryComponent,
    data: {
      title: 'userhistory'
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
export class UserhistoryRoutingModule { }
