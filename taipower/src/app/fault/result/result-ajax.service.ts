import { Injectable } from '@angular/core';
import { server_url } from '@app/core/data/server_url';
import { ServerService } from '@app/core/services/server.service';

@Injectable({
  providedIn: 'root'
})
export class ResultAjaxService {

  constructor(
    private url: server_url,
    private server: ServerService
  ) { }

  async getEvent(){
    let a = await this.server.doGetRequest(this.url.histroyAPI.event)
    return a
  }


  async getPhoto(){
    let a = await this.server.doGetRequest(this.url.histroyAPI.photo)
    return a
  }
}
