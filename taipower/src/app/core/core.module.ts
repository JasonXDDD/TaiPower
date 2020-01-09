import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerService } from './services/server.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],

  providers: [
    ServerService
  ]
})
export class CoreModule { }
