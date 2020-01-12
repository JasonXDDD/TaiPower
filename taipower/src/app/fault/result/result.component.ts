import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ResultAjaxService } from './result-ajax.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styles: []
})
export class ResultComponent implements OnInit {

  eventList: any[] = []
  layerGroup: any;

  eventResult = {
    eventid: 0,
    ref_sub: "",
    ref_length: "",
    dis_to_sub: "",
    est_long: "",
    est_lati: "",
    towerN: 0,
    towerN_2: 0,
    report: {
      eventid: 0,
      description: "",
      opinion: ""
    }
  }

  constructor(private ajax: ResultAjaxService) { }

  async ngOnInit() {
    await this.doGetEvent()

  }



  // MAP
  openMap(index){
    this.eventList.forEach((ele, id) => {
      if(!(_.isEqual(ele.map, {}))) this.mapDestroy(id)
    })

    this.mapInit(index)
  }

  mapInit(id) {
    let mymap = L.map('mapid'+id).setView([25.0799179, 121.4042816], 13)

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      id: 'mapbox.streets'
    }).addTo(mymap);


    this.layerGroup = L.featureGroup().addTo(mymap);
    this.eventList[id].map = mymap
  }

  mapDestroy(id){
    this.eventList[id].map.remove()
    this.eventList[id].map = {}
  }

  addSomething(){
    var circle = L.circle([25.0799179, 121.4042816], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(this.layerGroup)
  }

  markerEvent(lat, lng){
    var marker = L.marker([lat, lng]).addTo(this.layerGroup)
  }


  // VIEW
  async openPane(item, index, event){
    this.resetResult()

    // do AJAX
    let isResult = await this.doGetEventResult(item.eventid)

    // do VIEW

    this.openCollapse(event)
    this.openMap(index)
    if(isResult){
      this.markerEvent(this.eventResult.est_lati, this.eventResult.est_long)
      this.eventList[index].map.fitBounds(this.layerGroup.getBounds())
    }
  }

  counter(num) {
    return new Array(parseInt(num));
  }

  openCollapse(event){
    var notthis = $('.activeCollapse').not(event.target);
    notthis.toggleClass('activeCollapse').next('.faqanswer').slideToggle(300);
    $(event.target).toggleClass('activeCollapse').next().slideToggle("fast");
  }

  resetResult(){
    this.eventResult = {
      eventid: 0,
      ref_sub: "",
      ref_length: "",
      dis_to_sub: "",
      est_long: "",
      est_lati: "",
      towerN: 0,
      towerN_2: 0,
      report: {
        eventid: 0,
        description: "",
        opinion: ""
      }
    }
  }

  // AJAX
  src: string = "";

  async doGetPhoto(){
    let res = await this.ajax.getPhoto()
    this.src = res.data[0].photo
  }

  async doGetEvent(){
    var res = await this.ajax.getEvent()

    this.eventList = _.cloneDeep(res.data)
    // console.log(this.eventList)
    this.eventList.forEach(ele => ele['map']={})

    // console.log(this.eventList)
  }

  async doGetEventResult(id){
    let res = await this.ajax.getResult({eventid: id})
    var reportRes = await this.ajax.getReport({eventid: id})

    if(res.data.length > 0){
      this.eventResult = res.data[0]
      if(reportRes.data.length > 0) this.eventResult.report = reportRes.data[0]
      else this.eventResult.report =  {
        eventid: 0,
        description: "",
        opinion: ""
      }

      return true
    }
    else return false
  }

}
