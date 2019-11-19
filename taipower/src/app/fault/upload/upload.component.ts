import { Component, OnInit } from '@angular/core';

declare var $;
declare var L;
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.init()
    this.mapInit()
  }

  init() {
    $('#file-upload1').change(function () {
      var filepath = this.value;
      var m = filepath.match(/([^\/\\]+)$/);
      var filename = m[1];
      $('#filename1').html(filename);
    });
    $('#file-upload2').change(function () {
      var filepath = this.value;
      var m = filepath.match(/([^\/\\]+)$/);
      var filename = m[1];
      $('#filename2').html(filename);
    });
    $('#file-upload3').change(function () {
      var filepath = this.value;
      var m = filepath.match(/([^\/\\]+)$/);
      var filename = m[1];
      $('#filename3').html(filename);
    });
    $('#file-upload4').change(function () {
      var filepath = this.value;
      var m = filepath.match(/([^\/\\]+)$/);
      var filename = m[1];
      $('#filename4').html(filename);
    });
    $('#file-upload5').change(function () {
      var filepath = this.value;
      var m = filepath.match(/([^\/\\]+)$/);
      var filename = m[1];
      $('#filename5').html(filename);
    });
    $('#file-upload6').change(function () {
      var filepath = this.value;
      var m = filepath.match(/([^\/\\]+)$/);
      var filename = m[1];
      $('#filename6').html(filename);
    });
    $('#file-upload7').change(function () {
      var filepath = this.value;
      var m = filepath.match(/([^\/\\]+)$/);
      var filename = m[1];
      $('#filename7').html(filename);
    });
    $('#file-upload8').change(function () {
      var filepath = this.value;
      var m = filepath.match(/([^\/\\]+)$/);
      var filename = m[1];
      $('#filename8').html(filename);
    });
    $('#file-upload9').change(function () {
      var filepath = this.value;
      var m = filepath.match(/([^\/\\]+)$/);
      var filename = m[1];
      $('#filename9').html(filename);
    });
  }

  mapInit() {
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(mymap);


    var marker = L.marker([51.5, -0.09]).addTo(mymap);

    var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(mymap);

    var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
    ]).addTo(mymap);

		{"towerE": [], "towerN": []

    // create a red polyline from an array of LatLng points
    var latlngs = [
      [121.4042816, 25.0799179],
      [121.4078751, 25.0815487],
      [121.4106598, 25.0824013],
      [121.411499, 25.083704],
      [121.4131775, 25.0862808],
      [121.417923, 25.0862598],
      [121.4189606, 25.086216],
      [121.4237061, 25.08601],
      [121.4237061, 25.08601],
      [121.430397, 25.0857506],
      [121.431572, 25.0860806],
      [121.4364166, 25.0881805],
      [121.4397583, 25.0880394],
      [121.442617, 25.086593],
      [121.446654, 25.085669],
      [121.4497833, 25.0844612],
      [121.453186, 25.0830288],
      [121.4566345, 25.081583],
      [121.4595566, 25.080267],
      [121.462326, 25.0792141],
      [121.4645309, 25.0783348],
      [121.4662552, 25.0776691],
      [121.46875, 25.0769291],
      [121.4723053, 25.0774174],
      [121.4762192, 25.0779629],
      [121.4768295, 25.0781155]
    ];
    var polyline = L.polyline(latlngs, { color: 'red' }).addTo(mymap);
    // zoom the mymap to the polyline
    mymap.fitBounds(polyline.getBounds());
  }

}
