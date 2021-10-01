import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainoverviewComponent } from './mainoverview/mainoverview.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { OverviewheaderModule } from '../overviewheader/overviewheader.module';
import { FooterModule } from '../footer/footer.module';
const routes : Routes = [
  {
    path : "",
    component : MainoverviewComponent,

    children : [
      {
        path : 'overview',
        loadChildren : 'src/app/pagesoverview/overview/overview.module#OverviewModule'
      },
      {
        path : 'toptokens',
        loadChildren : 'src/app/pagesoverview/toptokens/toptokens.module#ToptokensModule'
      },
      {
        path : 'toppairs',
        loadChildren : 'src/app/pagesoverview/toppairs/toppairs.module#ToppairsModule'
      },
      
      {
        path : 'accounts',
        loadChildren : 'src/app/pagesoverview/accounts/accounts.module#AccountsModule'
      },
      {
        path : 'accountsview/:id',
        loadChildren : 'src/app/pagesoverview/accountsview/accountsview.module#AccountsviewModule'
      },
      {
        path : 'pairview/:id',
        loadChildren : 'src/app/pagesoverview/pairview/pairview.module#PairviewModule'
      },
      {
        path : 'coinview/:id',
        loadChildren : 'src/app/pagesoverview/coinview/coinview.module#CoinviewModule'
      },
    ]
  }
]
@NgModule({
  declarations: [MainoverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidebarModule,
    OverviewheaderModule,
    FooterModule,
  ]
})
export class PagesoverviewModule { }
