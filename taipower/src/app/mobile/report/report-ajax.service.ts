import { Injectable } from '@angular/core';
import { server_url } from '@app/core/data/server_url';
import { ServerService } from '@app/core/services/server.service';

@Injectable({
  providedIn: 'root'
})
export class ReportAjaxService {

  constructor(
    private url: server_url,
    private server: ServerService
  ) { }

  async getReport(data){
    let a = await this.server.doGetRequest(this.url.reportAPI.report, data)
    return a
  }

  async getPhoto(data){
    let a = await this.server.doGetRequest(this.url.historyAPI.photo, data)
    return a
  }
}
