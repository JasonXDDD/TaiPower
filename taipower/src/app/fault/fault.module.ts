import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaultRoutingModule } from './fault-routing.module';

import { UploadComponent } from './upload/upload.component';
import { ResultComponent } from './result/result.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    UploadComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    FaultRoutingModule,
    FormsModule,
  ]
})
export class FaultModule { }
