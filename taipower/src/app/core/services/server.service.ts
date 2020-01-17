import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  async doGetRequest(url, params?, header?) {

    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      // .set("X-MPG-Language", sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : '')
      .set("authorization", sessionStorage.getItem("token") ? 'token ' + sessionStorage.getItem("token") : '');

    if (header) {
      _.forEach(header, (value, key) => {
        headers = headers.append(key, value);
      });
    }

    try {
      let a = await this.http.get(url, { headers: headers, params: params }).toPromise();
      return { status: 200, data: a };
    }
    catch (error) {
      return error;
    }

  }

  async doPostFileRequest(url, data, params?, header?) {

    let headers = new HttpHeaders()
      // .set("Content-Type", "application/json")
      // .set("X-MPG-Language", sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : '')
      .set("authorization", sessionStorage.getItem("token") ? 'token ' + sessionStorage.getItem("token") : '');

    if (header) {
      _.forEach(header, (value, key) => {
        headers = headers.append(key, value);
      });
    }

    try {
      const response = await this.http.post(url, data, { headers: headers, params: params }).toPromise();
      return { status: 200, data: response };
    } catch (error) {
      return error;
    }
  }

  async doPostRequest(url, data, params?, header?) {

    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      // .set("X-MPG-Language", sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : '')
      .set("authorization", sessionStorage.getItem("token") ? 'token ' + sessionStorage.getItem("token") : '');

    if (header) {
      _.forEach(header, (value, key) => {
        headers = headers.append(key, value);
      });
      console.log(headers)
    }

    try {
      const response = await this.http.post(url, JSON.stringify(data), { headers: headers, params: params }).toPromise();
      return { status: 200, data: response };
    } catch (error) {
      return error;
    }
  }

  async doPostNoHeaderRequest(url, data, params?, header?) {

    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      // .set("X-MPG-Language", sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : '')
      // .set("authorization", sessionStorage.getItem("token") ? 'token ' + sessionStorage.getItem("token") : '');

    if (header) {
      _.forEach(header, (value, key) => {
        headers = headers.append(key, value);
      });
      console.log(headers)
    }

    try {
      const response = await this.http.post(url, JSON.stringify(data), { headers: headers, params: params }).toPromise();
      return { status: 200, data: response };
    } catch (error) {
      return error;
    }
  }

  async doPatchRequest(url, data, params?, header?) {

    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      // .set("X-MPG-Language", sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : '')
      .set("authorization", sessionStorage.getItem("token") ? 'token ' + sessionStorage.getItem("token") : '');

    if (header) {
      _.forEach(header, (value, key) => {
        headers = headers.append(key, value);
      });
    }

    try {
      const response = await this.http.patch(url, JSON.stringify(data), { headers: headers, params: params }).toPromise();
      return { status: 200, data: response };
    } catch (error) {
      return error;
    }
  }


}
