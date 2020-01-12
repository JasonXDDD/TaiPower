import { Injectable } from '@angular/core';
import { server_url } from '@app/core/data/server_url';
import { ServerService } from '@app/core/services/server.service';


@Injectable({
  providedIn: 'root'
})
export class HistoryAjaxService {

  // TODO: I hate those api, this is so many repuest for one function

  constructor(
    private url: server_url,
    private server: ServerService
  ) { }


  async getResult(data){
    let a = await this.server.doGetRequest(this.url.historyAPI.result, data)
    return a
  }

  async getEvent(){
    let a = await this.server.doGetRequest(this.url.historyAPI.event)
    return a
  }

  async getPhoto(){
    let a = await this.server.doGetRequest(this.url.historyAPI.photo)
    return a
  }

  async getReport(){
    let a = await this.server.doGetRequest(this.url.reportAPI.report)
    return a
  }

  async getLinePos(data){
    let a = await this.server.doGetRequest(this.url.linePosAPI.get, data)
    return a
  }
}
