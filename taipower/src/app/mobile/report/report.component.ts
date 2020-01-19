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
    user_id: 1,
    eventid: 0,
    description: "",
    opinion: "",
    photo: []
  };
  isReport: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private ajax: ReportAjaxService) { }

  ngOnInit() {
    let self = this
    this.route.params.forEach(async params => {
      self.eventId = params["id"].split("_")[0];
      self.eventLine = decodeURI(params["id"].split("_")[1]);
      self.report.eventid = Number(self.eventId)
      self.report.user_id = Number(sessionStorage.getItem('user_id'))

      await self.doGetReport(self.eventId);
      await self.doGetPhoto(self.eventId)
    })
  }

  addImage(event){
    let self = this
    let reader = new FileReader()

    if (event.target.files && event.target.files.length > 0){
      let file = event.target.files[0]

      reader.readAsDataURL(file);
      reader.onload = async () => {
        self.report.photo.push({
          eventid: self.eventId,
          photoN: self.report.photo.length,
          photo: reader.result,
        });
      }
    }
  }

  async doSubmit(){
    let self = this
    Swal.fire({
      title: '提醒!',
      text: '確認送出後，無法再進行更改。',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消'
    })
    .then(async (result) => {
      if (result.value) {
        let res = await self.doPostReport()

        if(res){
          Swal.fire({
            title: '成功送出',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000
          })
          .then(result => {
            self.router.navigate(['/mobile/history'])
          })
        }
      }
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

  async doGetPhoto(id){
    let res = await this.ajax.getPhoto({eventid: id})
    this.report['photo'] = res.data
  }

  async doPostReport(){
    console.log(this.report, this.eventId)
    let reportData = _.cloneDeep(this.report)
    let photoList = _.cloneDeep(this.report.photo)
    delete(reportData.photo)

    photoList.forEach(async ele => {
      await this.ajax.postPhoto(ele)
    })
    await this.ajax.postReport(reportData)

    return true
  }

}
