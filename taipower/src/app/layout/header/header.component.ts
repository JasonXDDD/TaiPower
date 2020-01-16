import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  url: string = ""
  env: any;
  username: string = ""
  role: string = ""

  constructor(private router: Router) { }

  ngOnInit() {
    this.env = environment
    let self = this

    this.router.events.subscribe(async evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      else {
        self.url = evt.url
        self.username = sessionStorage.getItem('user')
        self.role = sessionStorage.getItem('role')
      }
    })
  }

  logout(){
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("role")
    sessionStorage.removeItem("user_id")

    this.router.navigate(['/account/login'])
  }
}
