import { Component, OnInit } from '@angular/core';
import { ReportAjaxService } from './report-ajax.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  eventId: number = 0
  eventLine: string = ""
  report: any = {
    description: "",
    opinion: ""
  };
  isReport: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private ajax: ReportAjaxService) { }

  ngOnInit() {
    let self = this
    this.route.params.forEach(params => {
      self.eventId = params["id"].split("_")[0];
      self.eventLine = decodeURI(params["id"].split("_")[1]);

      self.doGetReport(self.eventId);
    })
  }

  // AJAX
  async doGetReport(id){
    let res = await this.ajax.getReport({eventid: id})
    if(res.data.length > 0){
      this.report = res.data[0]
      this.isReport = true
    }
  }
}
