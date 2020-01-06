import { environment } from "@env/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class server_url{
  private base = environment.apiServer;

  private lineInfo = "/api/lineinfo";
  private linePos = "/api/towerpos";

  private photo = "/api/photo";

  readonly lineInfoAPI = {
    get: this.base + this.lineInfo
  }

  readonly linePosAPI = {
    get: this.base + this.linePos
  }

  readonly photoAPI = {
    get: this.base + this.photo
  }
}
