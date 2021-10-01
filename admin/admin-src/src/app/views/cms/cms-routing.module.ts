import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CmsComponent } from './cms.component';

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    data: {
      title: 'cms'
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
export class CmsRoutingModule { }

