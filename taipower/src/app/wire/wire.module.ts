import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WireRoutingModule } from './wire-routing.module';
import { ArgumentComponent } from './argument/argument.component';

@NgModule({
  declarations: [
    ArgumentComponent
  ],
  imports: [
    CommonModule,
    WireRoutingModule,
  ]
})
export class WireModule { }
