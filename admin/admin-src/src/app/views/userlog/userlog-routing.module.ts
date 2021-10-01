import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlogComponent } from './userlog.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserlogComponent,
    data: {
      title: 'userlog'
    }
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     RouterModule.forChild(routes)

  ],
    exports: [RouterModule]

})
export class UserlogRoutingModule { }
