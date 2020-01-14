import { Component, OnInit } from '@angular/core'
import { UploadAjaxService } from './upload-ajax.service'
import { server_url } from '@app/core/data/server_url';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
    lineid: 0,
    numtower: 0,
    linename: '',
    terminals: 0,
    startpos: '',
    stoppos: ''
  }
  map: any;
  layerGroup: any;

  brandList: any[] = [
    { name: 'Toshiba', file: [
      { type: '.osc', isUpload: 'none' }
    ]},
    { name: 'GE', file: [
      { type: '.hdr', isUpload: 'none' },
      { type: '.cfg', isUpload: 'none' },
      { type: '.dat', isUpload: 'none' }
    ]},
    { name: 'SEL', file: [
      { type: '.cev', isUpload: 'none' }
    ]},
  ];

  calData: any = {
    file: []
  }

  selectBrand: string = "";

  showResult: boolean = false;
  apiUrl: any;

  uploadForm: FormGroup;

  constructor (private formBuilder: FormBuilder, private http: HttpClient, private ajax: UploadAjaxService, private url: server_url) {}

  ngOnInit () {
    // this.init()

    this.apiUrl = this.url
    this.mapInit()

    this.uploadForm = this.formBuilder.group({
      file: [''],
      description: ['']
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
      this.uploadForm.get('description').setValue(file.name);
    }
  }

  onSubmit(event, id, fileId) {
    let self = this
    this.changeFileName(event);
    this.onFileSelect(event)

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('description', this.uploadForm.get('description').value);


    console.log(formData)
    this.http.post<any>("http://140.112.20.123:22810/api/uploadfile", formData).subscribe(
      (res) => {
        console.log(res)
        self.calData.file[id].data[fileId].isUpload = 'sucess'
      },
      (err) => {
        console.log(err)
        self.calData.file[id].data[fileId].isUpload = 'error'
      }
    );
  }

  changeFileName(event){
    let target = $(event.target).parents('form').children('.file-name')[0]
    let filepath = event.target.value
    let m = filepath.match(/([^\/\\]+)$/)
    let filename = m[1]
    $(target).html(filename)
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
    let data = {lineid: num}
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
    console.log(JSON.stringify(item))
  }

  getFile(target){
    let item = this.brandList.filter(ele => ele.name === target)
    if(item.length > 0) return item[0].file
    else return []
  }

  setCalData(){
    for(let i = 0; i < this.terminal; i++){
      this.calData.file.push({
        terminal: i,
        data: _.cloneDeep(this.getFile(this.selectBrand))
      })
    }
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
