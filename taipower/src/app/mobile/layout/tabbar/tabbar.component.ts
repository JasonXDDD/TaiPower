import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.sass']
})
export class TabbarComponent implements OnInit {

  nowRoute: string = ""
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
      case "/mobile/notion":        this.nowRoute = "notion";       break;
      case "/mobile/notification":  this.nowRoute = "notification"; break;
      case "/mobile/history":       this.nowRoute = "history";      break;
      case "/mobile/history-item":  this.nowRoute = "history-item"; break;
      case "/mobile/report":        this.nowRoute = "report";       break;
      default:                      this.nowRoute = "";             break;
    }
  }

}
