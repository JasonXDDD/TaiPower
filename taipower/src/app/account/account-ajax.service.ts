import { Injectable } from '@angular/core';
import { server_url } from '@app/core/data/server_url';
import { ServerService } from '@app/core/services/server.service';

@Injectable({
  providedIn: 'root'
})
export class AccountAjaxService {

  constructor(
    private url: server_url,
    private server: ServerService
  ) { }

  async postLogin(data){
    let a = await this.server.doPostRequest(this.url.userAPI.login, data)
    return a
  }
}
