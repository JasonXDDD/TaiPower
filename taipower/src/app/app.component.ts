import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'taipower';

  token: string;
  deviceInfo: any;
  openHeader: boolean = true;

  constructor(private swPush: SwPush, private http: HttpClient, private deviceService: DeviceDetectorService, private router: Router) { }
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
            self.addToTopic(token)
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

    // do route if mobile
    if(this.deviceService.isMobile()){
      this.router.navigate(['/mobile/index'])
    }
    this.router.events.subscribe(async evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      else {
        if(this.deviceService.isMobile() && evt.url.split('/')[1] !== 'mobile'){
          this.openHeader = false
          this.router.navigate(['/mobile/index'])
        }
        else {
          if(evt.url.split('/')[1] !== 'mobile'){
            this.openHeader = true
          }
          else {
            this.openHeader = false
          }
        }
      }
    })
  }

  addToTopic(token) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': environment.firebase.fcm_key
    })
    this.http.post("https://iid.googleapis.com/iid/v1:batchAdd",
      JSON.stringify({
        "to": "/topics/taipower",
        "registration_tokens": [token]
      }),
      { headers }).subscribe(
        res => {
          console.log(res)
        },

        error => {
          console.log(error)
        }
      )
  }

}
