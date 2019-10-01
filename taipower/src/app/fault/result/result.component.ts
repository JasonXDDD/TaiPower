import { Component, OnInit } from '@angular/core';

declare var $;
declare var L;
declare var _;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styles: []
})
export class ResultComponent implements OnInit {

  mapList: any[] = [{}, {}, {}, {}]

  constructor() { }

  ngOnInit() {
  }

  openCollapse(event){
    var notthis = $('.activeCollapse').not(event.target);
    notthis.toggleClass('activeCollapse').next('.faqanswer').slideToggle(300);
    $(event.target).toggleClass('activeCollapse').next().slideToggle("fast");
  }

  openMap(index){
    this.mapList.forEach((ele, id) => {
      if(!(_.isEqual(ele, {}))) this.mapDestroy(id)
    })

    this.mapInit(index)
  }

  mapInit(id) {
    this.mapList[id] = L.map('mapid' +  id).setView([51.505, -0.09], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      id: 'mapbox.streets'
    }).addTo(this.mapList[id]);


    var marker = L.marker([51.5, -0.09]).addTo(this.mapList[id]);

    var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(this.mapList[id]);

    var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
    ]).addTo(this.mapList[id]);


    // create a red polyline from an array of LatLng points
    var latlngs = [
      [45.51, -122.68],
      [37.77, -122.43],
      [34.04, -118.2]
    ];
    var polyline = L.polyline(latlngs, { color: 'red' }).addTo(this.mapList[id]);
    // zoom the this.mapList[id] to the polyline
    this.mapList[id].fitBounds(polyline.getBounds());
  }

  mapDestroy(id){
    this.mapList[id].remove()
    this.mapList[id] = {}
  }

  counter(num) {
    return new Array(parseInt(num));
  }


}
