import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule
  ]
})
export class AccountModule { }
