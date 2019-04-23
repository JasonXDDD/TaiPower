import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "/account/login"},
  { path: "account", loadChildren: "app/account/account.module#AccountModule" },
  { path: "fault", loadChildren: "app/fault/fault.module#FaultModule" },
  { path: "wire", loadChildren: "app/wire/wire.module#WireModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
