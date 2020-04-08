import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ResultAjaxService } from './result-ajax.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styles: []
})
export class ResultComponent implements OnInit {

  eventList: any[] = [];
  layerGroup: any;

  eventResult = {
    eventid: 0,
    photo: [],

    ref_sub: '',
    dis_to_sub: '',
    est_lati: '',
    est_long: '',
    towerN: 0,
    towerN_2: 0,
    faulttime: '',
    ref_length: '',

    dis_to_sub_it: '',
    est_lati_it: '',
    est_long_it: '',
    towerN_it: 0,
    towerN_2_it: 0,

    dis_to_sub_taiS: '',
    dis_to_sub_taiR: '',
    dis_to_sub_taiT: '',
    est_lati_tai: '',
    est_long_tai: '',
    towerN_tai: 0,
    towerN_2_tai: 0,
    ref_sub_for_tai_tower: '',
    dis_to_sub_tai: '',
    dis_to_sub_taiS_original: '',
    dis_to_sub_taiR_original: '',
    dis_to_sub_taiT_original: '',
  };

  constructor(private ajax: ResultAjaxService) { }

  async ngOnInit() {
    await this.doGetEventAndReport();
  }



  // MAP
  openMap(index) {
    this.eventList.forEach((ele, id) => {
      if (!(_.isEqual(ele.map, {}))) { this.mapDestroy(id) }
    });

    this.mapInit(index);
  }

  mapInit(id) {
    const mymap = L.map('mapid' + id).setView([25.0799179, 121.4042816], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      id: 'mapbox.streets'
    }).addTo(mymap);


    this.layerGroup = L.featureGroup().addTo(mymap);
    this.eventList[id].map = mymap;
  }

  mapDestroy(id) {
    this.eventList[id].map.remove();
    this.eventList[id].map = {};
  }

  addSomething() {
    let circle = L.circle([25.0799179, 121.4042816], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(this.layerGroup);
  }

  addMarkerEvent(lat, lng) {
    let marker = L.marker([lat, lng]).addTo(this.layerGroup);
  }

  addLinePosToMap(line, id) {
    let myIcon = L.icon({
      iconUrl: 'assets/images/tower.png',
      iconSize: [12, 16],
      iconAnchor: [6, 8],
      // popupAnchor: [-3, -76],
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
    });
    const color1 = ['red', 'green', 'blue'];

    line.forEach(ele => {
      // L.circle(ele, {
      //     color: 'red',
      //     fillColor: '#f03',
      //     fillOpacity: 0.5,
      //     radius: 20
      //   }).addTo(this.layerGroup)
      L.marker(ele, {icon: myIcon}).addTo(this.layerGroup);
    });
    let polyline = L.polyline(line, { color: color1[id % 3] }).addTo(this.layerGroup);
  }

  // FORMATTER
  toLineLatLng(data) {
    return data
    .sort((a, b) => {
      return Number(a.towerN) - Number(b.towerN);
    })
    .map(ele => {
      return [Number(ele.cn) , Number(ele.ce)];
    });
  }



  // VIEW
  async openPane(item, index, event) {
    this.resetResult();

    // do AJAX
    const isResult = await this.doGetEventResult(item.eventid);
    const line1 = await this.ajax.getLinePos({lineid: item.lineid});
    let line2 = {data: []};
    let line3 = {data: []};
    if (item.lineid2 !== 0) { line2 = await this.ajax.getLinePos({lineid: item.lineid2}) }
    if (item.lineid3 !== 0) { line3 = await this.ajax.getLinePos({lineid: item.lineid3}) }

    await this.doGetPhoto(item.eventid);
    // do VIEW

    this.openCollapse(event);
    this.openMap(index);
    if (isResult) {
      // clear
      this.layerGroup.clearLayers();
      this.addMarkerEvent(this.eventResult.est_lati, this.eventResult.est_long);
      this.addLinePosToMap(this.toLineLatLng(line1.data), 0);
      if (item.lineid2 !== 0) { this.addLinePosToMap(this.toLineLatLng(line2.data), 1) }
      if (item.lineid3 !== 0) { this.addLinePosToMap(this.toLineLatLng(line3.data), 2) }
      this.eventList[index].map.fitBounds(this.layerGroup.getBounds());
    }
  }

  counter(num) {
    return new Array(parseInt(num));
  }

  openCollapse(event) {
    let notthis = $('.activeCollapse').not(event.target);
    notthis.toggleClass('activeCollapse').next('.faqanswer').slideToggle(300);
    $(event.target).toggleClass('activeCollapse').next().slideToggle('fast');
  }

  resetResult() {
    this.eventResult = {
      eventid: 0,
      photo: [],

      ref_sub: '',
      dis_to_sub: '',
      est_lati: '',
      est_long: '',
      towerN: 0,
      towerN_2: 0,
      faulttime: '',
      ref_length: '',

      dis_to_sub_it: '',
      est_lati_it: '',
      est_long_it: '',
      towerN_it: 0,
      towerN_2_it: 0,

      dis_to_sub_taiS: '',
      dis_to_sub_taiR: '',
      dis_to_sub_taiT: '',
      est_lati_tai: '',
      est_long_tai: '',
      towerN_tai: 0,
      towerN_2_tai: 0,
      ref_sub_for_tai_tower: '',
      dis_to_sub_tai: '',
      dis_to_sub_taiS_original: '',
      dis_to_sub_taiR_original: '',
      dis_to_sub_taiT_original: '',

    };
  }

  // AJAX
  async doGetPhoto(id) {
    const res = await this.ajax.getPhoto({eventid: id});
    this.eventResult['photo'] = res.data;
  }

  async doGetEventAndReport() {
    let res = await this.ajax.getEvent();
    let reportRes = await this.ajax.getReport();

    this.eventList = _.cloneDeep(res.data.reverse());
    this.eventList.forEach(ele => {
      ele['map'] = {};
      ele['report'] = reportRes.data.filter(report => report.eventid === ele.eventid);
    });

    // console.log(this.eventList)
  }

  async doGetEventResult(id) {
    const res = await this.ajax.getResult({eventid: id});

    if (res.data.length > 0) {
      this.eventResult = res.data[0];
      return true;
    } else { return false }
  }

}
