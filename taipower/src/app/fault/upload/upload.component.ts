import { Component, OnInit } from '@angular/core'
import { UploadAjaxService } from './upload-ajax.service'
import { server_url } from '@app/core/data/server_url'
import { FormBuilder, FormGroup } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {
  // line
  isTTypeTerminal: boolean = false
  query: any = {
    terminal: 0,
    w: 0
  }

  lineList: string[] = [] // view for select line
  selectLine: string = ''

  subList: any[] = []

  // map
  map: any
  layerGroup: any

  // file
  brandList: any[] = [
    { name: 'Toshiba', file: [{ type: '.osc', isUpload: 'none', name: '' }] },
    {
      name: 'GE',
      file: [
        { type: '.hdr', isUpload: 'none', name: '' },
        { type: '.cfg', isUpload: 'none', name: '' },
        { type: '.dat', isUpload: 'none', name: '' }
      ]
    },
    { name: 'SEL', file: [{ type: '.cev', isUpload: 'none', name: '' }] }
  ]
  selectBrand: any = ''
  uploadForm: FormGroup

  // calculate
  showResult: boolean = false

  constructor (
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private ajax: UploadAjaxService,
    private url: server_url
  ) {}

  ngOnInit () {
    this.mapInit()

    this.uploadForm = this.formBuilder.group({
      file: [''],
      description: ['']
    })
  }

  // file submit
  onFileSelect (event, subId, fileId) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.uploadForm.get('file').setValue(file)
      this.uploadForm.get('description').setValue(file.name)
      this.subList[subId].file[fileId].name = file.name
    }
  }
  onSubmit (event, subId, fileId) {
    let self = this
    this.onFileSelect(event, subId, fileId)
    // change status
    this.subList[subId].file[fileId].isUpload = 'loading'

    const formData = new FormData()
    formData.append('file', this.uploadForm.get('file').value)
    formData.append('description', this.uploadForm.get('description').value)

    console.log(formData)
    this.http
      .post<any>('http://140.112.20.123:22810/api/uploadfile', formData)
      .subscribe(
        res => {
          console.log(res)
          self.subList[subId].file[fileId].isUpload = 'sucess'
        },
        err => {
          console.log(err)
          self.subList[subId].file[fileId].isUpload = 'error'
        }
      )
  }

  //AJAX
  async doGetLineByTerminal () {
    if (this.isTTypeTerminal) this.query.terminal = 3
    else this.query.terminal = 2

    //reset
    this.lineList = []
    this.selectLine = ''
    this.subList = []

    let data = { terminals: this.query.terminal }
    let res = await this.ajax.getLineInfo(data)

    // set line list
    this.lineList = res.data
      .map(ele => ele.linename)
      .filter((ele, id, arr) => {
        return arr.indexOf(ele) === id
      })

    console.log(this.lineList)
  }

  async doGetLineByLineName (name) {
    let res = await this.ajax.getLineInfo({ linename: name })
    return res.data
  }

  async doGetLinePos (num) {
    let data = { lineid: num }
    let res = await this.ajax.getLinePos(data)

    // show map
    this.addLinePosToMap(this.toLineLatLng(res.data))

    return res.data
  }

  async doGetLineParam (num) {
    let data = { lineid: num }
    let res = await this.ajax.getLineParam(data)
    return res.data
  }

  async doGetLineInfo (name) {
    let self = this
    console.log(name)

    // reset
    this.layerGroup.clearLayers() // clear map
    this.subList = []

    // get all line info by line name
    let line = await this.doGetLineByLineName(name)

    await line.forEach(async ele => {
      ele['pos'] = await this.doGetLinePos(ele.lineid)
      ele['param'] = await this.doGetLineParam(ele.lineid)
    })

    // set sub data
    line.forEach(ele => {
      self.subList.push({
        name: ele.startpos,
        lineid: ele.lineid,
        file: [],
        type: ''
      })
    })

    if (line[0].terminals == 2) {
      this.subList.push({
        name: line[0].stoppos,
        lineid: line[0].lineid,
        file: [],
        type: ''
      })
    }
  }

  doSetSubData (target) {
    this.subList.forEach(ele => {
      ele.type = _.cloneDeep(target.name)
      ele.file = _.cloneDeep(target.file)
    })

    console.log(this.subList, target)
  }

  // FORMATTER
  toLineLatLng (data) {
    return data
      .sort((a, b) => {
        return Number(a.towerN) - Number(b.towerN)
      })
      .map(ele => {
        return [Number(ele.cn), Number(ele.ce)]
      })
  }

  // VIEW
  counter (num) {
    return new Array(Math.round(Number(num)))
  }

  show (item) {
    console.log(JSON.stringify(item))
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

    this.layerGroup = L.layerGroup().addTo(this.map)
  }

  addLinePosToMap (line) {
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
