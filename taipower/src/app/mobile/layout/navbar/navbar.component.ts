import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  nowRoute: string = ""
  nowTitle: string = "回報系統"
  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    let self = this
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
    switch (url) {
      case "/mobile/notion":        this.nowRoute = "notion";        this.nowTitle = "通知";      break;
      case "/mobile/notification":  this.nowRoute = "notification";  this.nowTitle = "北投-深坑";  break;
      case "/mobile/history":       this.nowRoute = "history";       this.nowTitle = "歷史資料";   break;
      case "/mobile/history-item":  this.nowRoute = "history-item";  this.nowTitle = "北投-深坑";  break;
      case "/mobile/report":        this.nowRoute = "report";        this.nowTitle = "回報";      break;
      default:                      this.nowRoute = "";              this.nowTitle = "回報系統";   break;
    }
  }

  goBack(){
    this.location.back()
  }
}
