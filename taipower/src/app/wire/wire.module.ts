import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WireRoutingModule } from './wire-routing.module';
import { ArgumentComponent } from './argument/argument.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArgumentComponent
  ],
  imports: [
    CommonModule,
    WireRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WireModule { }
