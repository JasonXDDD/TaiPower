import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  counter(num) {
    return new Array(parseInt(num));
  }
}
