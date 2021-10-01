import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './static.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StaticComponent,
    data: {
      title: 'static'
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
export class StaticRoutingModule { }
