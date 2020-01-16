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

  async getReport(query){
    let a = await this.server.doGetRequest(this.url.reportAPI.report, query)
    return a
  }

  async getPhoto(query){
    let a = await this.server.doGetRequest(this.url.historyAPI.photo, query)
    return a
  }

  async postReport(data){
    let a = await this.server.doPostRequest(this.url.reportAPI.report, data)
    return a
  }

  async postPhoto(data){
    let a = await this.server.doPostRequest(this.url.historyAPI.photo, data)
    return a
  }
}
