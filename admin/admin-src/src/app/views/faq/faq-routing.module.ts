import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FaqComponent,
    data: {
      title: 'faq'
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
export class FaqRoutingModule { }
