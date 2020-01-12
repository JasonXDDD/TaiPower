import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  nowRoute: string = ''
  nowTitle: string = '回報系統'

  eventId: number = 0

  constructor (private router: Router, private location: Location) {}

  ngOnInit () {
    let self = this
    this.checkRoute(this.router.url)
    this.router.events.subscribe(async evt => {
      if (!(evt instanceof NavigationEnd)) {
        return
      } else {
        self.checkRoute(evt.url)
      }
    })
  }

  checkRoute (url) {
    let token = url.split('/')

    if (token.length == 3 && token[2] == 'history') {
      this.nowRoute = 'history'
      this.nowTitle = '歷史資料'
      sessionStorage.clear()
    } else if (token.length == 4 && token[2] == 'history') {
      this.nowRoute = 'history-item'
      this.nowTitle = decodeURI(token[3].split("_")[3]);
      this.eventId = token[3].split("_")[0];
    } else if (token.length == 4 && token[2] == 'report') {
      this.nowRoute = 'report'
      this.nowTitle = '回報: ' + decodeURI(token[3].split("_")[1]);
      this.eventId = token[3].split("_")[0];
    } else {
      this.nowRoute = ''
      this.nowTitle = '台電回報系統'
    }

    // switch (token[1]) {
    // case "/mobile/notion":        this.nowRoute = "notion";        this.nowTitle = "通知";      break;
    // case "/mobile/notification":  this.nowRoute = "notification";  this.nowTitle = "北投-深坑";  break;
    // }
  }

  goBack () {
    this.location.back()
  }
}
