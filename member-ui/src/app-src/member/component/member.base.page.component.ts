import {Component} from "@angular/core";

@Component({
  templateUrl: "./html/member.base.page.component.html"
})
export class MemberBasePageComponent {

  fullname: any = sessionStorage.getItem("member.user.fullname");

  constructor() {
  }

  logOut() {
    sessionStorage.removeItem("member.user.userid");
    sessionStorage.removeItem("member.user.fullname");
    sessionStorage.removeItem("member.user.emailaddress");
    sessionStorage.removeItem("member.user.phone");
  }

}
