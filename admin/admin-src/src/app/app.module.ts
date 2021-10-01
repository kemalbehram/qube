import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpModule } from '@angular/http';
import { CommonService } from './common.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './containers/guards/auth.guard';
import { UserService } from './containers/user.service';
import { LoggedGuard } from './containers/guards/logged.guard';
import {NgIdleModule} from '@ng-idle/core';
import { CacheService } from 'ng2-cache';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/login/login.component';
import { CookieService } from 'ngx-cookie-service';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { ToastrModule } from 'ng6-toastr-notifications';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from 'ng2-ckeditor';
import { ResetpwdComponent } from './views/resetpwd/resetpwd.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ResetNewComponent } from './views/reset-new/reset-new.component';
import { UserhistoryComponent } from './views/userhistory/userhistory.component';
import { AdminloghistoryComponent } from './views/adminloghistory/adminloghistory.component';
import { SetipComponent } from './views/setip/setip.component';
// import { ProfitComponent } from './views/profit/profit.component';
import { MyDatePickerModule } from 'mydatepicker';
import { LoaderComponent } from './views/loader/loader.component';
import { ResetPatternComponent } from './views/reset-pattern/reset-pattern.component';
import { PatternNewComponent } from './views/pattern-new/pattern-new.component';

import { environment } from '../environments/environment';
import { LendingAssetModule } from './views/lending-asset/lending-asset.module';
import { LendingModule } from './views/lending/lending.module';
import { LendingWithdrawModule } from './views/lending-withdraw/lending-withdraw.module';
import { LendingBorrowModule } from './views/lending-borrow/lending-borrow.module';
import { CurrencyModule } from './views/currency/currency.module';
import { BannerModule } from './views/banner/banner.module';
import { ProfitModule } from './views/profit/profit.module';

// import { CategoryComponent } from './views/category/category.component';
// import { NewsComponent } from './views/news/news.component';
// import { AnnounceComponent } from './views/announce/announce.component';
// import { DisposalComponent } from './views/disposal/disposal.component';
// import { IpblockComponent } from './views/ipblock/ipblock.component';
// import { UserlogComponent } from './views/userlog/userlog.component';
// import { ContactComponent } from './views/contact/contact.component';

const serviceHost:string = environment.BackendHost;
const socketdata:{} ={secure: true, transports: ['websocket']}
const config:SocketIoConfig = { url:serviceHost, options:{}=socketdata  };

@NgModule({
  imports: [
    BrowserModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RecaptchaModule,
    FormsModule,
    HttpModule,
    NgIdleModule.forRoot(),
    // NgbModule.forRoot(),
    ToastrModule.forRoot(),
    LendingAssetModule,
    LendingWithdrawModule,
    LendingBorrowModule,
    LendingModule,
    CurrencyModule,
    BannerModule,
    NgbModule,
    ProfitModule,
    ChartsModule,
    CKEditorModule,
    SocketIoModule.forRoot(config),
    MyDatePickerModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
 
    LoginComponent,
 
   ResetpwdComponent,
 
   ResetNewComponent,
 
   SetipComponent,
    
   // ProfitComponent,
    
   LoaderComponent,
    
   ResetPatternComponent,
    
   PatternNewComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },CommonService,CookieService,AuthGuard,UserService,LoggedGuard,CacheService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
