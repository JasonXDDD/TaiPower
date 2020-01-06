import { Component, OnInit } from '@angular/core';
import { ResultAjaxService } from './result-ajax.service';

declare var $;
declare var L;
declare var _;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styles: []
})
export class ResultComponent implements OnInit {

  eventList: any[] = []
  layerGroup: any;

  constructor(private ajax: ResultAjaxService) { }

  ngOnInit() {
    this.doGetEvent()
  }

  openCollapse(event){
    var notthis = $('.activeCollapse').not(event.target);
    notthis.toggleClass('activeCollapse').next('.faqanswer').slideToggle(300);
    $(event.target).toggleClass('activeCollapse').next().slideToggle("fast");
  }

  // openMap(index){
  //   this.mapList.forEach((ele, id) => {
  //     if(!(_.isEqual(ele, {}))) this.mapDestroy(id)
  //   })

  //   this.mapInit(index)
  // }

  mapInit(id) {
    var mymap = L.map('mapid'+id).setView([51.505, -0.09], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      id: 'mapbox.streets'
    }).addTo(mymap);

    this.layerGroup = L.layerGroup().addTo(mymap);

    return mymap
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
    let res = await this.ajax.getEvent()
    console.log(res.data)
    this.eventList = res.data.map((ele, id) => ele['map'] = this.mapInit(id))
  }

}
