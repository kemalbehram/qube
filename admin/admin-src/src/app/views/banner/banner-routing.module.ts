import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: BannerComponent,
    data: {
      title: 'banner'
    }
  }];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
