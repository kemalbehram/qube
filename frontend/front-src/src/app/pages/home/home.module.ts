import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HomeComponent } from './home.component';

const routes : Routes =  [
  {
      path     : '',
      component: HomeComponent,
  }
];
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MalihuScrollbarModule.forRoot(),
    TabsModule.forRoot(),
  ]
})
export class HomeModule { }
