import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../app-src/home";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "admin", loadChildren: () => import("../app-src/admin/index").then(m => m.AdminModule)},
  {path: "member", loadChildren: () => import("../app-src/member/index").then(m => m.MemberModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
