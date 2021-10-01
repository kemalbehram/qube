import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';

const routes: Routes = [{
    path: '',
    component: CurrencyComponent,
    data: {
      title: 'lending-borrow'
    }
  }];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
