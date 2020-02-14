import { Component, OnInit } from '@angular/core'
import { WireAjaxService } from '../wire-ajax.service'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-argument',
  templateUrl: './argument.component.html',
  styles: []
})
export class ArgumentComponent implements OnInit {
  select: string = ''
  lineList: any[] = [
    { name: '線路資訊', type: 'lineInfo' },
    { name: '線路參數', type: 'linePar' },
    { name: '鐵塔座標', type: 'towerPos' },
  ]
  userid: number = 0
  uploadForm: FormGroup
  isCalc: boolean = false
  file: any = {
    type: '.csv',
    isUpload: 'none',
    name: ''
  }

  constructor (
    private formBuilder: FormBuilder,
    private ajax: WireAjaxService
  ) {}

  ngOnInit () {
    this.userid = Number(sessionStorage.getItem('user_id'))
    this.uploadForm = this.formBuilder.group({
      file: [''],
      description: ['']
    })
  }

  // file submit
  onFileSelect (event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.uploadForm.get('file').setValue(file)
      this.uploadForm.get('description').setValue(file.name)
      this.file.name = file.name
    }
  }
  async onSubmit (event) {
    let self = this
    this.onFileSelect(event)
    // change status
    this.file.isUpload = 'loading'

    const formData = new FormData()
    formData.append('file', this.uploadForm.get('file').value)
    formData.append('description', this.uploadForm.get('description').value)

    let res = await this.ajax.postFile(formData)
    // console.log(res.status)

    if (res.status == 200) {
      this.file.isUpload = 'success'
    } else {
      this.file.isUpload = 'error'
    }
  }

  async postData () {
    let data = {
      userid: this.userid,
      filename: this.file.name
    }

    this.isCalc = true
    let res

    switch (this.select) {
      case 'linePar':
        res = await this.ajax.postLinePar(data)
        break

      case 'towerPos':
        res = await this.ajax.postTowerPos(data)
        break

      case 'lineInfo':
        res = await this.ajax.postLineInfo(data)
        break

      default:
        this.isCalc = false
        return
    }

    if (res.status == 200) {
      Swal.fire({
        title: '上傳成功',
        icon: 'success'
      })

      this.file = {
        type: '.csv',
        isUpload: 'none',
        name: ''
      }
      this.isCalc = false
    } else {
      Swal.fire({
        title: 'Error',
        icon: 'error'
      })
      this.isCalc = false
    }
  }
}
