import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './containers/guards/auth.guard';
import { ResetpwdComponent } from './views/resetpwd/resetpwd.component';
import { LoggedGuard } from './containers/guards/logged.guard';
import { UserService } from './containers/user.service';
import { ResetNewComponent } from './views/reset-new/reset-new.component';
import { SetipComponent } from './views/setip/setip.component';
import { ProfitComponent } from './views/profit/profit.component';
import { ResetPatternComponent } from './views/reset-pattern/reset-pattern.component';
import { PatternNewComponent } from './views/pattern-new/pattern-new.component';
import { environment } from '../environments/environment';

export const routes: Routes = [
  // { path: 'views', loadChildren: 'app/views/views.module#PagesModule',canActivate:[AuthGuard] },
  {
    path: '',
    redirectTo: environment.adminurl+'/login',
    pathMatch: 'full',
  },
  {
    path: environment.adminurl+'/404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },

  {
    path: environment.adminurl+'/login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
      userActivation : false,clearSession : true
    },
    canActivate:[LoggedGuard]
  },
  {
    path: environment.adminurl+'/resetpwd',
    component: ResetpwdComponent,
    data: {
      title: 'Reset pwd'
    }
  },
  {
    path: environment.adminurl+'/resetpattern',
    component: ResetPatternComponent,
    data: {
      title: 'Reset pattern'
    }
  },
   {
    path: environment.adminurl+'/reset-new',
    component: ResetNewComponent,
    data: {
      title: 'Reset new'
    }
  },
   {
    path: environment.adminurl+'/pattern-new',
    component: PatternNewComponent,
    data: {
      title: 'Reset new'
    }
  },
 
  {
    path: environment.adminurl+'/VLjGeg0mzr',
    component: SetipComponent,
    data: {
      title: 'Set IP'
    }
  },
  {
    path: environment.adminurl+'/2pKFsw93BO', //set privatekey
    component: ProfitComponent,
    data: {
      title: 'Set Key'
    }
  },
  
 {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: environment.adminurl+'/dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate:[AuthGuard]
      },
      {
        path: environment.adminurl+'/settings',
        loadChildren: './views/settings/settings.module#SettingsModule',
        canActivate:[AuthGuard]
        
      },
      {
        path: environment.adminurl+'/changepassword',
        loadChildren: './views/changepassword/changepassword.module#ChangepasswordModule',
        canActivate:[AuthGuard]
        
      },
      {
        path: environment.adminurl+'/sitesetting',
        loadChildren: './views/sitesetting/sitesetting.module#SitesettingModule',
        canActivate:[AuthGuard]
        
      },
       {
        path: environment.adminurl+'/static',
        loadChildren: './views/static/static.module#StaticModule',
        canActivate:[AuthGuard]
        
      },
      {
        path: environment.adminurl+'/pairs',
        loadChildren: './views/pairs/pairs.module#PairsModule',
        canActivate:[AuthGuard]
        
      },
      {
        path: environment.adminurl+'/faq',
        loadChildren: './views/faq/faq.module#FaqModule',
        canActivate:[AuthGuard]
        
      },
      {
        path: environment.adminurl+'/banner',
        loadChildren: './views/banner/banner.module#BannerModule',
        canActivate:[AuthGuard]
        
      },
      {
        path: environment.adminurl+'/lending-assets',
        loadChildren: './views/lending-asset/lending-asset.module#LendingAssetModule',
        canActivate:[AuthGuard]
      },
      {
        path: environment.adminurl+'/lending', 
        loadChildren: './views/lending/lending.module#LendingModule',
        canActivate:[AuthGuard]
      },
      {
        path: environment.adminurl+'/lending-borrow', 
        loadChildren: './views/lending-borrow/lending-borrow.module#LendingBorrowModule',
        canActivate:[AuthGuard]
      },
      {
        path: environment.adminurl+'/lending-withdraw', 
        loadChildren: './views/lending-withdraw/lending-withdraw.module#LendingWithdrawModule',
        canActivate:[AuthGuard]
      },
      {
        path: environment.adminurl+'/removepool',
        loadChildren: './views/cms/cms.module#CmsModule',
        canActivate:[AuthGuard]
        
      },
      {
        path: environment.adminurl+'/exchangehistory',
        loadChildren: './views/exchange/exchange.module#ExchangeModule',
        canActivate:[AuthGuard]
        
      },
      {
        path: environment.adminurl+'/withdrawhistory',
        loadChildren: './views/withdraw/withdraw.module#WithdrawModule',
        canActivate:[AuthGuard]
        
      },
      {
        path: environment.adminurl+'/harvesthistory',
        loadChildren: './views/userhistory/userhistory.module#UserhistoryModule',
        canActivate:[AuthGuard]
      },
      {
        path: environment.adminurl+'/deposithistory',
        loadChildren: './views/usermanage/usermanage.module#UsermanageModule',
        canActivate:[AuthGuard]
      },
      {
        path: environment.adminurl+'/poollog',
        loadChildren: './views/userlog/userlog.module#UserlogModule',
        canActivate:[AuthGuard]
      },
      {
        path: environment.adminurl+'/adminlog',
        loadChildren: './views/adminloghistory/adminloghistory.module#AdminloghistoryModule',
        canActivate:[AuthGuard]
      },
      {
        path: environment.adminurl+'/ipblock',
        loadChildren: './views/ipblock/ipblock.module#IpblockModule',
        canActivate:[AuthGuard]
      },
      {
        path: environment.adminurl+'/currency',
        loadChildren: './views/currency/currency.module#CurrencyModule',
        canActivate:[AuthGuard]
      },
    ]
  },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full',canActivate:[LoggedGuard] },

  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

