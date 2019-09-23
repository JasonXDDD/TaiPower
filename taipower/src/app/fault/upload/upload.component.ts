import { Component, OnInit } from '@angular/core';

declare var $;
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.init()
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

}
