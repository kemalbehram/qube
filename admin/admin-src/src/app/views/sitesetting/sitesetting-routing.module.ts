import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesettingComponent } from './sitesetting.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SitesettingComponent,
    data: {
      title: 'sitesetting'
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
export class SitesettingRoutingModule { }


