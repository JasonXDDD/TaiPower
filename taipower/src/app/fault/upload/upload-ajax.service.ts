import { Injectable } from '@angular/core';
import { server_url } from '@app/core/data/server_url';
import { ServerService } from '@app/core/services/server.service';

@Injectable({
  providedIn: 'root'
})
export class UploadAjaxService {

  constructor(
    private url: server_url,
    private server: ServerService
  ) { }

  async getLineInfo(){
    let a = await this.server.doGetRequest(this.url.lineInfoAPI.get)
    console.log(a)
  }
}
