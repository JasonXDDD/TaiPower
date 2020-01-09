import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "/account/login"},
  { path: "account", loadChildren: () => import('app/account/account.module').then(m => m.AccountModule) },
  { path: "fault", loadChildren: () => import('app/fault/fault.module').then(m => m.FaultModule) },
  { path: "wire", loadChildren: () => import('app/wire/wire.module').then(m => m.WireModule) },
  { path: "mobile", loadChildren: () => import('app/mobile/mobile.module').then(m => m.MobileModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
