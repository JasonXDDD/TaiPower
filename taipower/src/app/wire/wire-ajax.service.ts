import { Injectable } from '@angular/core';
import { server_url } from '@app/core/data/server_url';
import { ServerService } from '@app/core/services/server.service';

@Injectable({
  providedIn: 'root'
})
export class WireAjaxService {

  constructor(
    private url: server_url,
    private server: ServerService
  ) { }

  async postFile(data){
    let a = await this.server.doPostFileRequest(this.url.uploadAPI.post, data)
    return a
  }

  async postLinePar(data){
    let a = await this.server.doPostRequest(this.url.uploadAPI.linePar, data)
    return a
  }

  async postTowerPos(data){
    let a = await this.server.doPostRequest(this.url.uploadAPI.towerPos, data)
    return a
  }

  async postLineInfo(data){
    let a = await this.server.doPostRequest(this.url.uploadAPI.linePar, data)
    return a
  }
}
