import { environment } from "@env/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class server_url{
  private base = environment.apiServer;

  private lineInfo = "/api/lineinfo";
  private linePos = "/api/towerpos";

  private event = "/api/eventdata";
  private photo = "/api/photo";
  private result = "/api/calresult";
  private report = "/api/report";

  private upload = "/api/uploadfile";


  readonly lineInfoAPI = {
    get: this.base + this.lineInfo
  }

  readonly linePosAPI = {
    get: this.base + this.linePos
  }

  readonly historyAPI = {
    event: this.base + this.event,
    photo: this.base + this.photo,
    result: this.base + this.result
  }


  readonly reportAPI = {
    report: this.base + this.report
  }

  readonly uploadAPI = {
    post: this.base + this.upload
  }
}
