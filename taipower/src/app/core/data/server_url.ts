import { environment } from "@env/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class server_url{
  private base = environment.apiServer;

  private lineInfo = "/api/lineinfo/";
  private linePos = "/api/towerpos/";
  private lineParam = "/api/linepar/";
  private lineCalc = "/api/calculate_new/"

  private event = "/api/eventdata/";
  private photo = "/api/photo/";
  private result = "/api/calresult/";
  private report = "/api/report/";

  private upload = "/api/uploadfile/";
  private token = "/token/";

  private uploadLinePar = "/api/test_upload_linepar/";
  private uploadTowerPos = "/api/test_upload_towerpos/";
  private uploadLineInfo = "/api/test_upload_lineinfo/";

  readonly lineAPI = {
    info: this.base + this.lineInfo,
    pos: this.base + this.linePos,
    param: this.base + this.lineParam,
    calc: this.base + this.lineCalc
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
    post: this.base + this.upload,
    linePar: this.base + this.uploadLinePar,
    towerPos: this.base + this.uploadTowerPos,
    lineInfo: this.base + this.uploadLineInfo
  }

  readonly fsmAPI = 'https://fcm.googleapis.com/fcm/send'
  readonly userAPI = {
    login: this.base + this.token
  }
}
