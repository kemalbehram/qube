import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsermanageRoutingModule } from './usermanage-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';
import { UsermanageComponent } from './usermanage.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: '' };

@NgModule({
  declarations: [UsermanageComponent],
  imports: [
    CommonModule,
    UsermanageRoutingModule,
    FormsModule,
    NgxDatatableModule
  ]
})
export class UsermanageModule { }
