import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'taipower';

  token: string;

  constructor(private swPush: SwPush) { }
  ngOnInit() {
    let self = this;

    //init firebase
    firebase.initializeApp({
      messagingSenderId: environment.firebase.messagingSenderId
    });
    const messaging = firebase.messaging();


    navigator.serviceWorker.ready.then(registration => {
      if (
        !!registration &&
        registration.active &&
        registration.active.state &&
        registration.active.state === 'activated'
      ) {
        messaging.useServiceWorker(registration);
        messaging
          .requestPermission()
          .then(() => messaging.getToken())
          .then(token => {
            console.log('Permission granted!', token)
            self.token = token
          });
      } else {
        console.warn(
          'No active service worker found, not able to get firebase messaging'
        );
      }
    });

    this.swPush.messages.subscribe(msg => {
      console.log(msg);
    });

  }
}
