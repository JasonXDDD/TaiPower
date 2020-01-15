import { Injectable } from '@angular/core';
import { server_url } from '@app/core/data/server_url';
import { ServerService } from '@app/core/services/server.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadAjaxService {

  constructor(
    private url: server_url,
    private server: ServerService
  ) { }

  async getLineInfo(query){
    let a = await this.server.doGetRequest(this.url.lineAPI.info, query)
    return a
  }

  async getLinePos(query){
    let a = await this.server.doGetRequest(this.url.lineAPI.pos, query)
    return a
  }

  async getLineParam(query){
    let a = await this.server.doGetRequest(this.url.lineAPI.param, query)
    return a
  }

  async postFile(data){
    let a = await this.server.doPostFileRequest(this.url.uploadAPI.post, data)
    return a
  }

  async postCalc(data){
    let a = await this.server.doPostRequest(this.url.lineAPI.calc, data)
    return a
  }

  async postEventData(data){
    let a = await this.server.doPostRequest(this.url.historyAPI.event, data)
    return a
  }

  async postResult(data){
    let a = await this.server.doPostRequest(this.url.historyAPI.result, data)
    return a
  }

  async postNotification(title, body?, router?){
    let data = {
      to: "/topics/taipower",
      collapse_key: "type_a",
      notification: {
        title: title,
        body: body?body:"",
        icon: ""
      },
      data: {
        url: router? environment.domain + router: ""
      }
    }

    let a = await this.server.doPostRequest(this.url.fsmAPI, data, {}, {Authorization: environment.fcm_key})
    return a
  }
}
