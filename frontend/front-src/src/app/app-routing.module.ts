import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path        : '',
    loadChildren: './pages/pages.module#PagesModule'
  },
  {
    path        : '',
    loadChildren: './pagesoverview/pagesoverview.module#PagesoverviewModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
