import { Component, OnInit } from '@angular/core';
import { HistoryAjaxService } from '../history-ajax.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.sass']
})
export class HistoryItemComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private ajax: HistoryAjaxService) { }

  eventId: number = 0;
  resultList: any[] = [];
  lineId1: number = 0;
  lineId2: number = 0;
  lineId3: number = 0;
  eventLine: string = "";
  eventDate: string = "";

  map: any;
  layerGroup: any;

  ngOnInit() {
    let self = this

    this.route.params.forEach(params => {
      self.eventId = params["id"].split("_")[0];
      self.lineId1 = params["id"].split("_")[1].split(',')[0];
      self.lineId2 = params["id"].split("_")[1].split(',')[1];
      self.lineId3 = params["id"].split("_")[1].split(',')[2];
      self.eventDate = params["id"].split("_")[2];
      self.eventLine = decodeURI(params["id"].split("_")[3]);

      self.doGetResult(self.eventId, self.lineId1, self.lineId2, self.lineId3);
    });
  }

  // AJAX
  async doGetResult(eventId, id1, id2, id3){
    // clear
    this.layerGroup.clearLayers()

    var res = await this.ajax.getResult({eventid: eventId})
    var line1 = await this.ajax.getLinePos({lineid: id1})
    let line2 = {data: []}
    let line3 = {data: []}
    if(id2 !== 0) line2 = await this.ajax.getLinePos({lineid: id2})
    if(id3 !== 0) line3 = await this.ajax.getLinePos({lineid: id3})
    this.resultList = res.data

    if(this.resultList.length > 0){
      setTimeout(() => {
        this.mapInit()
        this.addLinePosToMap(this.toLineLatLng(line1.data), 0)
        if(id2 !== 0) this.addLinePosToMap(this.toLineLatLng(line2.data), 1)
        if(id3 !== 0) this.addLinePosToMap(this.toLineLatLng(line3.data), 2)
        this.addMarkerEvent(this.resultList[0].est_lati, this.resultList[0].est_long)
      }, 100);
    }
  }


  // FORMATTER
  toLineLatLng(data){
    return data
    .sort((a,b)=> {
      return Number(a.towerN) - Number(b.towerN)
    })
    .map(ele => {
      return [Number(ele.cn) , Number(ele.ce)]
    })
  }


  // MAP
  mapInit () {
    this.map = L.map('mapid').setView([25.0799179, 121.4042816], 13)

    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      {
        maxZoom: 18,
        id: 'mapbox.streets'
      }
    ).addTo(this.map)

    this.layerGroup = L.featureGroup().addTo(this.map);
  }

  addLinePosToMap(line, id){
    var myIcon = L.icon({
      iconUrl: 'assets/images/tower.png',
      iconSize: [12, 16],
      iconAnchor: [6, 8],
      // popupAnchor: [-3, -76],
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
    });
    let color1 = ['red', 'green', 'blue']

    line.forEach(ele => {
      // L.circle(ele, {
      //     color: 'red',
      //     fillColor: '#f03',
      //     fillOpacity: 0.5,
      //     radius: 20
      //   }).addTo(this.layerGroup)
      L.marker(ele, {icon: myIcon}).addTo(this.layerGroup);
    })
    var polyline = L.polyline(line, { color: color1[id%3] }).addTo(this.layerGroup)
  }

  addMarkerEvent(lat, lng){
    var marker = L.marker([lat, lng]).addTo(this.layerGroup)
    this.map.fitBounds(this.layerGroup.getBounds())
  }

}
