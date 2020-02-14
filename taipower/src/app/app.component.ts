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
  hide: boolean = false;

  token: string;
  deviceInfo: any;
  openHeader: boolean = true;

  constructor(private swPush: SwPush, private http: HttpClient, private deviceService: DeviceDetectorService, private router: Router) {
  }
  ngOnInit() {
    let self = this;

    // do route if mobile
    this.checkRoute(this.router.url)
    this.router.events.subscribe(async evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      else {
        self.checkRoute(evt.url)
      }
    })

    //init firebase
    firebase.initializeApp(environment.firebase);
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
      window.location.href = msg['data']['url']
    });

    this.swPush.notificationClicks.subscribe( event => {
      console.log('Received notification: ', event);
      const url = event.notification.data.url;
      window.open(url, '_blank');
    });
  }

  checkRoute(url){

    if(url === '/') return;

    if(this.deviceService.isMobile() && url.split('/')[1] !== 'mobile'){
      this.openHeader = false
      this.router.navigate(['/mobile/index'])
    }
    else {
      if(url.split('/')[1] !== 'mobile'){
        this.openHeader = true
      }
      else {
        this.openHeader = false
      }
    }
  }

  addToTopic(token) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': environment.fcm_key
    })
    this.http.post("https://iid.googleapis.com/iid/v1:batchAdd",
      JSON.stringify({
        "to": "/topics/taipower",
        "registration_tokens": [token]
      }),
      { headers }).subscribe(
        res => {
          // console.log(res)
        },

        error => {
          // console.log(error)
        }
      )
  }

}
