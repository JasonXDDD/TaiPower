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
  lineNum: number = 0;
  eventLine: string = "";
  eventDate: string = "";

  map: any;
  layerGroup: any;

  ngOnInit() {
    let self = this

    this.route.params.forEach(params => {
      self.eventId = params["id"].split("_")[0];
      self.lineNum = params["id"].split("_")[1];
      self.eventDate = params["id"].split("_")[2];
      self.eventLine = decodeURI(params["id"].split("_")[3]);

      self.doGetResult(self.eventId, self.lineNum);
    });
  }

  // AJAX
  async doGetResult(eventId, lineNum){
    var res = await this.ajax.getResult({eventid: eventId})
    var line = await this.ajax.getLinePos({linenum: lineNum})
    this.resultList = res.data

    if(this.resultList.length > 0){
      setTimeout(() => {
        this.mapInit()
        this.addLinePosToMap(this.toLineLatLng(line.data))
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

  addLinePosToMap(line){
    // clear
    this.layerGroup.clearLayers()

    line.forEach(ele => {
      L.circle(ele, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 20
        }).addTo(this.layerGroup)
    })
    var polyline = L.polyline(line, { color: 'red' }).addTo(this.layerGroup)
    // zoom the this.map to the polyline
    this.map.fitBounds(polyline.getBounds())
  }

  addMarkerEvent(lat, lng){
    var marker = L.marker([lat, lng]).addTo(this.layerGroup)
    this.map.fitBounds(this.layerGroup.getBounds())
  }

}
