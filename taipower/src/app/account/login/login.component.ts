import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    let self = this
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
  }

  checkRoute(url){
    if(this.deviceService.isMobile() && url.split('/')[1] !== 'mobile'){
      this.router.navigate(['/mobile/index'])
    }
  }

}
