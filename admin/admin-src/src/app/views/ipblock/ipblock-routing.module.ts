import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpblockComponent } from './ipblock.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: IpblockComponent,
    data: {
      title: 'ipblock'
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
export class IpblockRoutingModule { }
