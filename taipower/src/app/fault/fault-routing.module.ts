import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [

  { path: "upload", component: UploadComponent },
  { path: "result", component: ResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaultRoutingModule { }
