import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExchangeComponent } from './exchange.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangeComponent,
    data: {
      title: 'exchange'
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
export class ExchangeRoutingModule { }
