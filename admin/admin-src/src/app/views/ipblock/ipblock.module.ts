import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpblockRoutingModule } from './ipblock-routing.module';
import { IpblockComponent } from './ipblock.component';
import { FormsModule }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url:'' };

@NgModule({
  declarations: [IpblockComponent],
  imports: [
    CommonModule,
    IpblockRoutingModule,
     FormsModule,
    NgxDatatableModule,
	HttpModule,
	    SocketIoModule.forRoot(config),

  ]
})
export class IpblockModule { }
