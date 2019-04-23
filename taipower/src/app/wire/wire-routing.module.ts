import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArgumentComponent } from './argument/argument.component';

const routes: Routes = [
  { path: "argument", component: ArgumentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WireRoutingModule { }
