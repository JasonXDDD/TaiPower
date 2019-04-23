import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { UploadComponent } from './fault/upload/upload.component';
import { ResultComponent } from './fault/result/result.component';
import { ArgumentComponent } from './wire/argument/argument.component';
import { ManageComponent } from './account/manage/manage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    ResultComponent,
    ArgumentComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
