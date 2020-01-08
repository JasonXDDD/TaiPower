import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ResultAjaxService } from './result-ajax.service';

declare var $;
declare var L;
declare var _;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styles: []
})
export class ResultComponent implements OnInit, AfterViewInit {

  eventList: any[] = []
  layerGroup: any;

  @ViewChildren('history') history: any;

  constructor(private ajax: ResultAjaxService) { }

  async ngOnInit() {
    await this.doGetEvent()

  }

  ngAfterViewInit(): void {
    let self = this

    // this.history.changes.subscribe(t => {
      // self.eventList.forEach((ele, id) => {
      //   self.mapInit(id)
      // })
      // self.mapInit(0)
    // })
  }

  openCollapse(event){
    var notthis = $('.activeCollapse').not(event.target);
    notthis.toggleClass('activeCollapse').next('.faqanswer').slideToggle(300);
    $(event.target).toggleClass('activeCollapse').next().slideToggle("fast");
  }

  openMap(index){
    this.eventList.forEach((ele, id) => {
      if(!(_.isEqual(ele.map, {}))) this.mapDestroy(id)
    })

    this.mapInit(index)
  }

  mapInit(id) {
    let maymap = L.map('mapid'+id).setView([25.0799179, 121.4042816], 13)

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      id: 'mapbox.streets'
    }).addTo(maymap);


    this.layerGroup = L.layerGroup().addTo(maymap);

    this.eventList[id].map = maymap
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

  counter(num) {
    return new Array(parseInt(num));
  }


  // AJAX
  src: string = "";

  async doGetPhoto(){
    let res = await this.ajax.getPhoto()
    this.src = res.data[0].photo
  }

  async doGetEvent(){
    let self = this
    var res = await this.ajax.getEvent()

    this.eventList = _.cloneDeep(res.data)
    this.eventList.forEach(ele => ele['map']={})
  }

}
