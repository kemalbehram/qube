import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import{SettingsComponent} from './settings.component';
import { FormsModule }   from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';

const config: SocketIoConfig = { url:'' };


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config),

  ]
})
export class SettingsModule { }


