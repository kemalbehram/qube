import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendingAssetComponent } from './lending-asset.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: LendingAssetComponent,
    data: {
      title: 'lending-asset'
    }
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
})
export class LendingAssetRoutingModule { }
