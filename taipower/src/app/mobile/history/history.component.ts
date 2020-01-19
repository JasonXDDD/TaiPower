import { Component, OnInit } from '@angular/core';
import { HistoryAjaxService } from './history-ajax.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  eventList: any[] = [];
  constructor(private router: Router, private ajax: HistoryAjaxService) {

  }

  ngOnInit() {
    this.doGetEventAndReport()
  }

  counter(num) {
    return new Array(parseInt(num));
  }

  routeToItem(item){
    this.router.navigate([`/mobile/history/${item.eventid}_${item.lineid},${item.lineid2},${item.lineid3}_${item.create_date}_${item.linename}_${item.report.length}`])
  }

  // AJAX
  async doGetEventAndReport(){
    var res = await this.ajax.getEvent()
    var reportRes = await this.ajax.getReport()

    this.eventList = _.cloneDeep(res.data.reverse())
    this.eventList.forEach(ele => {
      ele['report'] = reportRes.data.filter(report => report.eventid === ele.eventid)
    })

    console.log(this.eventList)
  }
}
