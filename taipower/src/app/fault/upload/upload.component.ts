import { Component, OnInit } from '@angular/core'
import { UploadAjaxService } from './upload-ajax.service'

declare var $
declare var L
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {
  isTTypeTerminal: boolean = false
  terminal: number = 0
  towerList: any[] = []
  selectTower: any = {
    linenum: 0,
    numtower: 0,
    linename: '',
    terminals: 0,
    startpos: '',
    stoppos: ''
  }
  map: any;
  layerGroup: any;

  constructor (private ajax: UploadAjaxService) {}

  ngOnInit () {
    // this.init()
    this.mapInit()
  }

  init () {
    $('#file-upload1').change(function () {
      var filepath = this.value
      var m = filepath.match(/([^\/\\]+)$/)
      var filename = m[1]
      $('#filename1').html(filename)
    })
    $('#file-upload2').change(function () {
      var filepath = this.value
      var m = filepath.match(/([^\/\\]+)$/)
      var filename = m[1]
      $('#filename2').html(filename)
    })
    $('#file-upload3').change(function () {
      var filepath = this.value
      var m = filepath.match(/([^\/\\]+)$/)
      var filename = m[1]
      $('#filename3').html(filename)
    })
    $('#file-upload4').change(function () {
      var filepath = this.value
      var m = filepath.match(/([^\/\\]+)$/)
      var filename = m[1]
      $('#filename4').html(filename)
    })
    $('#file-upload5').change(function () {
      var filepath = this.value
      var m = filepath.match(/([^\/\\]+)$/)
      var filename = m[1]
      $('#filename5').html(filename)
    })
    $('#file-upload6').change(function () {
      var filepath = this.value
      var m = filepath.match(/([^\/\\]+)$/)
      var filename = m[1]
      $('#filename6').html(filename)
    })
    $('#file-upload7').change(function () {
      var filepath = this.value
      var m = filepath.match(/([^\/\\]+)$/)
      var filename = m[1]
      $('#filename7').html(filename)
    })
    $('#file-upload8').change(function () {
      var filepath = this.value
      var m = filepath.match(/([^\/\\]+)$/)
      var filename = m[1]
      $('#filename8').html(filename)
    })
    $('#file-upload9').change(function () {
      var filepath = this.value
      var m = filepath.match(/([^\/\\]+)$/)
      var filename = m[1]
      $('#filename9').html(filename)
    })
  }


  //AJAX
  async doSearchTower () {
    if (this.isTTypeTerminal) this.terminal = 3
    else this.terminal = 2

    let data = { terminals: this.terminal }

    let res = await this.ajax.getLineInfo(data)
    this.towerList = res.data
  }

  async doGetLinePos(num){
    let data = {linenum: num}
    let res = await this.ajax.getLinePos(data)
    let line = this.toLineLatLng(res.data)
    this.addLinePosToMap(line)
    console.log(line)
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


  // VIEW
  counter (num) {
    return new Array(Math.round(Number(num)))
  }

  show(item){
    console.log(this.selectTower)
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

    this.layerGroup = L.layerGroup().addTo(this.map);
  }


  addLinePosToMap(line){
    // clear
    this.layerGroup.clearLayers()

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
}
