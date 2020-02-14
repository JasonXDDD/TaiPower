import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexAjaxService } from './index-ajax.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  user: any = {
    username: "",
    password: ""
  }
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private ajax: IndexAjaxService) { }

  ngOnInit() {
    this.init()
  }

  init(){
    (function() {
      window.setTimeout(function() {
        $("#loading").remove();
        // console.log("test");
      }, 3000);
    })();
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

      this.router.navigate(['/mobile/history'])
    }

    catch(error){
      this.isError = true
      this.isLoading = false
    }
  }

}
