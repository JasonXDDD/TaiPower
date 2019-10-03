import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private swUpdate: SwUpdate) {
    if (swUpdate.isEnabled) {
      swUpdate.available.subscribe(() => {
        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
  }
}
