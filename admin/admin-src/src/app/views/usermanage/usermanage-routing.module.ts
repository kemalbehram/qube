import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsermanageComponent } from './usermanage.component';

const routes: Routes = [
  {
    path: '',
    component: UsermanageComponent,
    data: {
      title: 'usermanage'
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
export class UsermanageRoutingModule { }
