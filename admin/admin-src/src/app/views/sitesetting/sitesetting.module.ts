import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesettingRoutingModule } from './sitesetting-routing.module';
import { SitesettingComponent } from './sitesetting.component';
import { FormsModule }   from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';

const config: SocketIoConfig = { url: '' };


@NgModule({
  declarations: [SitesettingComponent],
  imports: [
    CommonModule,
    SitesettingRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config),

  ]
})
export class SitesettingModule { }

