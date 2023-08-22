import {Component} from "@angular/core";

@Component({
  templateUrl: "./html/admin.base.panel.component.html"
})
export class AdminBasePanelComponent {

  fullname: any = sessionStorage.getItem("movie.admin.fullname");

  constructor() {
  }

  logOut() {
    sessionStorage.removeItem("movie.admin.userid");
    sessionStorage.removeItem("movie.admin.fullname");
    sessionStorage.removeItem("movie.admin.emailaddress");
    sessionStorage.removeItem("movie.admin.phone");
  }

}
