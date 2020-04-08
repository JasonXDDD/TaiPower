import { Component, OnInit } from '@angular/core';
import { UploadAjaxService } from './upload-ajax.service';
import { server_url } from '@app/core/data/server_url';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {

  // 這裡亂的不忍直視，

  // line
  isTTypeTerminal = false;
  query: any = {
    terminal: 0,
    w: 0
  };

  lineList: string[] = []; // view for select line
  selectLine = '';

  subList: any[] = []; // select line's sub data
  lineInfo: any[] = []; // set all data to select line
  // map
  map: any;
  layerGroup: any;

  // file
  brandList: any[] = [
    { id: 1, name: 'SEL', file: [{ type: '.cev', isUpload: 'none', name: '' }] },
    {
      id: 2,
      name: 'GE',
      file: [
        { type: '.hdr', isUpload: 'none', name: '' },
        { type: '.cfg', isUpload: 'none', name: '' },
        { type: '.dat', isUpload: 'none', name: '' }
      ]
    },
    { id: 3, name: 'Toshiba', file: [{ type: '.osc', isUpload: 'none', name: '' }] }
  ];
  selectBrand: any = '';
  uploadForm: FormGroup;

  // taipower filed
  dis_to_sub_taiS_original = 0;
  dis_to_sub_taiR_original = 0;
  dis_to_sub_taiT_original = 0;

  // calculate
  showResult = true;
  isCalc = false;
  result: any = {
    ref_sub: 0,
    dis_to_sub: 0,
    est_lati: 0,
    est_long: 0,
    towerN: 0,
    towerN_2: 0,
    faulttime: 0,
    ref_length: 0,

    dis_to_sub_it: 0,
    est_lati_it: 0,
    est_long_it: 0,
    towerN_it: 0,
    towerN_2_it: 0,

    dis_to_sub_taiS: 0,
    dis_to_sub_taiR: 0,
    dis_to_sub_taiT: 0,
    est_lati_tai: 0,
    est_long_tai: 0,
    towerN_tai: 0,
    towerN_2_tai: 0,
    ref_sub_for_tai_tower: 0,
    dis_to_sub_tai: 0,
    dis_to_sub_taiS_original: 0,
    dis_to_sub_taiR_original: 0,
    dis_to_sub_taiT_original: 0,
  };

  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private ajax: UploadAjaxService,
    private url: server_url
  ) {}

  ngOnInit () {
    this.mapInit();

    this.uploadForm = this.formBuilder.group({
      file: [''],
      description: ['']
    });
  }

  // file submit
  onFileSelect (event, subId, fileId) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
      this.uploadForm.get('description').setValue(file.name);
      this.subList[subId].file[fileId].name = file.name;
    }
  }
  async onSubmit (event, subId, fileId) {
    const self = this;
    this.onFileSelect(event, subId, fileId);
    // change status
    this.subList[subId].file[fileId].isUpload = 'loading';

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('description', this.uploadForm.get('description').value);

    const res = await this.ajax.postFile(formData);
    // console.log(res.status)

    if (res.status == 200) {
      this.subList[subId].file[fileId].isUpload = 'success';
    } else {
      this.subList[subId].file[fileId].isUpload = 'error';
    }
  }

  // AJAX
  async doGetLineByTerminal () {
    if (this.isTTypeTerminal) { this.query.terminal = 3; } else { this.query.terminal = 2; }

    // reset
    this.layerGroup.clearLayers(); // clear map
    this.lineList = [];
    this.selectLine = '';
    this.subList = [];
    this.selectBrand = '';

    const data = { terminals: this.query.terminal };
    const res = await this.ajax.getLineInfo(data);

    // set line list
    this.lineList = res.data
      .map(ele => ele.linename)
      .filter((ele, id, arr) => {
        return arr.indexOf(ele) === id;
      });

    // console.log(this.lineList)
  }

  async doGetLineByLineName (name) {
    const res = await this.ajax.getLineInfo({ linename: name });
    return res.data;
  }

  async doGetLinePos (num, index) {
    const data = { lineid: num };
    const res = await this.ajax.getLinePos(data);

    // show map
    this.addLinePosToMap(this.toLineLatLng(res.data), index);

    return res.data;
  }

  async doGetLineParam (num) {
    const data = { lineid: num };
    const res = await this.ajax.getLineParam(data);
    return res.data;
  }

  async doGetLineInfo (name) {
    const self = this;
    // console.log(name)

    // reset
    this.layerGroup.clearLayers(); // clear map
    this.subList = [];
    this.selectBrand = '';


    // get all line info by line name
    const line = await this.doGetLineByLineName(name);

    await line.forEach(async (ele, id) => {
      ele['pos'] = await this.doGetLinePos(ele.lineid, id);
      ele['param'] = await this.doGetLineParam(ele.lineid);
    });

    // set sub data
    line.forEach(ele => {
      self.subList.push({
        name: ele.startpos,
        lineid: ele.lineid,
        file: [],
        type: ''
      });
    });

    if (line[0].terminals == 2) {
      this.subList.push({
        name: line[0].stoppos,
        lineid: line[0].lineid,
        file: [],
        type: ''
      });
    }

    this.lineInfo = line;
  }

  doSetSubData (target) {
    this.subList.forEach(ele => {
      ele.type = _.cloneDeep(target.name);
      ele.file = _.cloneDeep(target.file);
    });
  }

  async doPostCalc() {
    const self = this;
    const data = this.toGenCalcData();

    Swal.fire({
      title: '資料計算中',
      text: self.selectLine,
      icon: 'info',
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
    });

    try {
      const res = await self.ajax.postCalc(data);

      // let test = {
      //   SRT: 1,
      //   Dist: 3.8777499091205336,
      //   SR: 8.281,
      //   towerN: 25.088114326657983,
      //   towerE: 121.43783594156213,
      //   tower_num1: 12,
      //   tower_num2: 13
      // }

      self.result = self.toAnsResult(res.data);
      // console.log(self.result)
      self.addMarkerEvent(self.result.est_lati, self.result.est_long);

      Swal.close();
    } catch (error) {
      // console.log(error)
      Swal.fire({
        title: 'Error',
        icon: 'error'
      });
      self.isCalc = false;
    }
  }

  async doPostEvent() {
    const data = this.toGenEvent();
    const res = await this.ajax.postEventData(data);
    return res.data;
  }

  async doPostResult(eventid) {
    const res = await this.ajax.postResult(_.assign({eventid: eventid}, this.result));
    // console.log(res)
  }

  async doSendNotification(event) {
    const eventid = event;
    const lineid = this.lineInfo[0].lineid;
    const lineid2 = this.lineInfo[1] ? this.lineInfo[1].lineid : 0;
    const lineid3 = this.lineInfo[2] ? this.lineInfo[2].lineid : 0;
    const create_date = '';
    const linename = this.selectLine;
    const report = [];

    await this.ajax.postNotification(
      '故障通知',
      `${create_date} ${linename} 有故障發生`,
      `/mobile/history/${eventid}_${lineid},${lineid2},${lineid3}_${create_date}_${linename}_${report.length}`
    );
  }

  async doSubmitEvent() {
    const event = await this.doPostEvent();
    await this.doPostResult(event.eventid);

    await this.doSendNotification(event.eventid);
    this.router.navigate(['/fault/result']);
  }


  // FORMATTER
  toLineLatLng (data) {
    return data
      .sort((a, b) => {
        return Number(a.towerN) - Number(b.towerN);
      })
      .map(ele => {
        return [Number(ele.cn), Number(ele.ce)];
      });
  }

  toGenCalcData() {
    const self = this;
    // raw data
    const lineInfo = _.cloneDeep(this.lineInfo);
    const subList = _.cloneDeep(this.subList);
    const query = _.cloneDeep(this.query);
    const selectBrand = _.cloneDeep(this.selectBrand);

    const data = this.toCalcBasic(query, selectBrand);
    data['filename'] = this.toCalcFile(self.subList);
    this.lineInfo.forEach((ele, id, arr) => {
      const s_numsegm = arr[0].param[0].numsegm;
      const r_numsegm = arr[1] ? arr[1].param[0].numsegm : 0;
      const t_numsegm = arr[2] ? arr[2].param[0].numsegm : 0;

      data['parameter'] = _.assign(data['parameter'], self.toCalcParam(ele.param, query.terminal, id, s_numsegm, r_numsegm, t_numsegm));
      data['tower'] = _.assign(data['tower'], self.toCalcTower(ele.pos, id));
    });

    // set taipower data
    data['dis_to_sub_tai_original'] = {
      dis_to_sub_taiS_original: this.dis_to_sub_taiS_original,
      dis_to_sub_taiR_original: this.dis_to_sub_taiR_original,
      dis_to_sub_taiT_original: this.dis_to_sub_taiT_original,
    };

    return data;
  }

  toCalcBasic(data, brand) {

    return { // parameter is gen by another formatter fn
      terminal: data.terminal,
      w: brand.id,
    };
  }

  toCalcParam(oneLine, terminal, id, s_numsegm?, r_numsegm?, t_numsegm?) {
    const data = {
      SRorSRT_N: [terminal, s_numsegm ? s_numsegm : 0, r_numsegm ? r_numsegm : 0, t_numsegm ? t_numsegm : 0], // terminal_type, s_numsegm, r_numsegm, t_numsegm
    };

    if (terminal == 2) {
      // reset data
      data['SRLine_L'] = [];
      data['SRLine_R1'] = [];
      data['SRLine_X1'] = [];
      data['SRLine_Ro'] = [];
      data['SRLine_Xo'] = [];
      data['SRLine_B1'] = [];
      data['SRLine_Bo'] = [];

      oneLine.forEach(ele => {
        data['SRLine_L'].push(Number(ele.linelen));
        data['SRLine_R1'].push(Number(ele.r1));
        data['SRLine_X1'].push(Number(ele.x1));
        data['SRLine_Ro'].push(Number(ele.r0));
        data['SRLine_Xo'].push(Number(ele.x0));
        data['SRLine_B1'].push(Number(ele.b1));
        data['SRLine_Bo'].push(Number(ele.b0));
      });
    } else {
      const t = ['S', 'R', 'T'];

      data[t[id] + 'J_L'] = [];
      data[t[id] + 'J_R1'] = [];
      data[t[id] + 'J_X1'] = [];
      data[t[id] + 'J_Ro'] = [];
      data[t[id] + 'J_Xo'] = [];
      data[t[id] + 'J_B1'] = [];
      data[t[id] + 'J_Bo'] = [];

      oneLine.forEach(ele => {
        data[t[id] + 'J_L'].push(Number(ele.linelen));
        data[t[id] + 'J_R1'].push(Number(ele.r1));
        data[t[id] + 'J_X1'].push(Number(ele.x1));
        data[t[id] + 'J_Ro'].push(Number(ele.r0));
        data[t[id] + 'J_Xo'].push(Number(ele.x0));
        data[t[id] + 'J_B1'].push(Number(ele.b1));
        data[t[id] + 'J_Bo'].push(Number(ele.b0));
      });
    }


    return data;
  }

  toCalcTower(oneLine, id) {
    const data = {};
    data['towerN' + (id == 0 ? '' : id - 1)] = oneLine.map(ele => ele.cn),
    data['towerE' + (id == 0 ? '' : id - 1)] = oneLine.map(ele => ele.ce);

    return data;
  }

  toCalcFile(subList) {
    function genData(sub) {
      if (!sub) { return ['', '', '']; } else { return [
        sub.file.filter(ele => ele.type == '.hdr' || ele.type == '.cev' || ele.type == '.osc')[0].name,
        sub.type != 'GE' ? '' : sub.file.filter(ele => ele.type == '.cfg')[0].name,
        sub.type != 'GE' ? '' : sub.file.filter(ele => ele.type == '.dat')[0].name,
      ];
      }
    }
    return {
      f1: genData(subList[0])[0],
      f2: genData(subList[0])[1],
      f3: genData(subList[0])[2],
      f4: genData(subList[1])[0],
      f5: genData(subList[1])[1],
      f6: genData(subList[1])[2],
      f7: genData(subList[2])[0],
      f8: genData(subList[2])[1],
      f9: genData(subList[2])[2],
    };
  }

  toAnsResult(ans) {
    return {
      ref_sub: ans.SRT ? this.subList[ans.SRT - 1].name : '不知',
      ref_length: ans.SR ? ans.SR : 0,
      dis_to_sub: ans.dis_to_sub ? ans.dis_to_sub : 0,
      est_long: ans.est_long ? ans.est_long : 0,
      est_lati: ans.est_lati ? ans.est_lati : 0,
      towerN: ans.towerN ? ans.towerN : 0,
      towerN_2: ans.towerN_2 ? ans.towerN_2 : 0,
      faulttime: ans.faulttime ? ans.faulttime : '',

      dis_to_sub_it: ans.dis_to_sub_it ? ans.dis_to_sub_it : '',
      est_lati_it: ans.est_lati_it ? ans.est_lati_it : '',
      est_long_it: ans.est_long_it ? ans.est_long_it : '',
      towerN_it: ans.towerN_it ? ans.towerN_it : 0,
      towerN_2_it: ans.towerN_2_it ? ans.towerN_2_it : 0,

      dis_to_sub_taiS: ans.dis_to_sub_taiS ? ans.dis_to_sub_taiS : '',
      dis_to_sub_taiR: ans.dis_to_sub_taiR ? ans.dis_to_sub_taiR : '',
      dis_to_sub_taiT: ans.dis_to_sub_taiT ? ans.dis_to_sub_taiT : '',
      est_lati_tai: ans.est_lati_tai ? ans.est_lati_tai : '',
      est_long_tai: ans.est_long_tai ? ans.est_long_tai : '',
      towerN_tai: ans.towerN_tai ? ans.towerN_tai : 0,
      towerN_2_tai: ans.towerN_2_tai ? ans.towerN_2_tai : 0,
      ref_sub_for_tai_tower: ans.ref_sub_for_tai_tower ? ans.ref_sub_for_tai_tower : '',
      dis_to_sub_tai: ans.dis_to_sub_tai ? ans.dis_to_sub_tai : '',
      dis_to_sub_taiS_original: ans.dis_to_sub_taiS_original ? ans.dis_to_sub_taiS_original : '',
      dis_to_sub_taiR_original: ans.dis_to_sub_taiR_original ? ans.dis_to_sub_taiR_original : '',
      dis_to_sub_taiT_original: ans.dis_to_sub_taiT_original ? ans.dis_to_sub_taiT_original : '',

    };
  }

  toGenEvent() {
    return {
      linename: this.selectLine,
      lineid: this.lineInfo.map(ele => ele.lineid)[0],
      lineid2: this.query.terminal == 3 ? this.lineInfo.map(ele => ele.lineid)[1] : 0,
      lineid3: this.query.terminal == 3 ? this.lineInfo.map(ele => ele.lineid)[2] : 0,
      terminals: this.query.terminal,
    };
  }

  checkCanCalc() {
    return (
      this.selectBrand !== ''
      &&
      this.subList.map(sub => {
        return sub.file.filter(ele => ele.name == '').length;
      }).reduce((a, b) => a + b) == 0
    );
  }

  // VIEW
  counter (num) {
    return new Array(Math.round(Number(num)));
  }

  async show () {
    await this.ajax.postNotification(
      '測試測試',
      `爽拉`,
      `/mobile/history`
    );
  }

  // MAP
  mapInit () {
    this.map = L.map('mapid').setView([25.0799179, 121.4042816], 13);

    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      {
        maxZoom: 18,
        id: 'mapbox.streets'
      }
    ).addTo(this.map);

    this.layerGroup = L.featureGroup().addTo(this.map);
  }

  addLinePosToMap (line, id) {
    // [line demo]
    // var latlngs = [
    //   [25.0799179, 121.4042816],
    //   [25.0815487, 121.4078751]
    // ]

    // [draw things]
    // var marker = L.marker([25.0799179, 121.4042816]).addTo(this.layerGroup)

    // var circle = L.circle([51.508, -0.11], {
    //   color: 'red',
    //   fillColor: '#f03',
    //   fillOpacity: 0.5,
    //   radius: 500
    // }).addTo(this.layerGroup)

    // var polygon = L.polygon([
    //   [51.509, -0.08],
    //   [51.503, -0.06],
    //   [51.51, -0.047]
    // ]).addTo(this.layerGroup)

    const myIcon = L.icon({
      iconUrl: 'assets/images/tower.png',
      iconSize: [12, 16],
      iconAnchor: [6, 8],
      // popupAnchor: [-3, -76],
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
    });

    const color1 = ['red', 'green', 'blue'];
    const color2 = ['#f03', '#0f3', '#30f'];

    line.forEach(ele => {
      // L.circle(ele, {
      //   color: color1[id%3],
      //   fillColor: color2[id%3],
      //   fillOpacity: 0.5,
      //   radius: 20
      // }).addTo(this.layerGroup)

      L.marker(ele, {icon: myIcon}).addTo(this.layerGroup);
    });
    const polyline = L.polyline(line, { color: color1[id % 3] }).addTo(this.layerGroup);

    // zoom the this.map to the polyline
    // this.map.fitBounds(polyline.getBounds())
    this.map.fitBounds(this.layerGroup.getBounds());
  }

  addMarkerEvent(lat, lng) {
    const marker = L.marker([lat, lng]).addTo(this.layerGroup);
    this.map.fitBounds(this.layerGroup.getBounds());
  }
}
