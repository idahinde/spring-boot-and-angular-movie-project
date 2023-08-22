import * as c from "./component";
import {memberComp} from "./component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {MemberGuard, MemberService} from "./service";

const routes: Routes = [
  {path: "", component: c.MemberLoginComponent},
  {path: "login", component: c.MemberLoginComponent},
  {path: "register", component: c.MemberRegisterComponent},
  {
    path: "panel", component: c.MemberBasePageComponent, canActivate: [MemberGuard],
    children: [
      {path: "", component: c.MemberViewBooksComponent},
      {path: "view-books", component: c.MemberViewBooksComponent},
      {path: "buy-book/:ref", component: c.MemberBuyBookComponent},
      {path: "view-purchased-books", component: c.MemberViewPurchaseBookComponent},
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
    MemberGuard, MemberService
  ],
  declarations: [
    ...memberComp
  ]
})
export class MemberModule {
}
