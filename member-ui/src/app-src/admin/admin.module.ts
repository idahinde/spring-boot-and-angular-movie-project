import {NgModule} from "@angular/core";
import * as c from "./components";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {RouterModule, Routes} from "@angular/router";
import {AdminService} from "./service";
import {AdminGuard} from "./service/admin.guard";

const routes: Routes = [
  {path: "", component: c.AdminLoginComponent},
  {path: "login", component: c.AdminLoginComponent},
  {
    path: "panel", component: c.AdminBasePanelComponent, canActivate: [AdminGuard],
    children: [
      {path: "", component: c.AdminViewBookComponent},
      {path: "view-books", component: c.AdminViewBookComponent},
      {path: "add-books", component: c.AdminAddBooksComponent},
      {path: "view-member", component: c.AdminViewMemberComponent},
      {path: "view-purchased-books", component: c.AdminViewAllPurchaseBookComponent}
    ]
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule, HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [
    AdminService
  ],
  declarations: [
    ...c.adminComp
  ]
})
export class AdminModule {
}
