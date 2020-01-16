import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AccountAjaxService } from '../account-ajax.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  user: any = {
    username: "",
    password: ""
  }
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService,
    private ajax: AccountAjaxService
  ) { }

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

  //AJAX
  async doLogin(){
    this.isLoading = true;

    try {
      let res = await this.ajax.postLogin(this.user)

      //set sessionStorage
      sessionStorage.setItem("token", res.data.token)
      sessionStorage.setItem("user", this.user.username)
      sessionStorage.setItem("role", res.data.user_group)
      sessionStorage.setItem("user_id", res.data.user_id)

      if(res.data.user_group == "巡線人員"){
        this.router.navigate(['/mobile/history'])
      }
      else {
        this.router.navigate(['/fault/upload'])
      }
    }

    catch(error){
      this.isError = true
      this.isLoading = false
    }
  }

}
