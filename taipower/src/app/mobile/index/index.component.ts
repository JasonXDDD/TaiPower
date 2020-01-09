import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.init()
  }

  init(){
    (function() {
      window.setTimeout(function() {
        $("#loading").remove();
        console.log("test");
      }, 3000);
    })();
  }

}
