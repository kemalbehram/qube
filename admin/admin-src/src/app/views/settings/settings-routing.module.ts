import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{SettingsComponent} from './settings.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: {
      title: 'settings'
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
export class SettingsRoutingModule { }


