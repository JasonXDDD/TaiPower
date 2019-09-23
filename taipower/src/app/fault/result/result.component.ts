import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styles: []
})
export class ResultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.init()
  }

  init() {
    $('.togglefaq').click(function (e) {
      e.preventDefault();
      var notthis = $('.activeCollapse').not(this);
      notthis.toggleClass('activeCollapse').next('.faqanswer').slideToggle(300);
      $(this).toggleClass('activeCollapse').next().slideToggle("fast");
    });
  }

}
