import {Component, OnInit} from "@angular/core";
import {AdminService} from "../service";

@Component({
  templateUrl: "./html/admin.view.member.component.html"
})
export class AdminViewMemberComponent implements OnInit {

  memberdatalist: any[] = []

  constructor(private _adminService: AdminService) {
  }

  load() {
    this._adminService.fetchMember().subscribe(res => this.memberdatalist = res);
  }

  ngOnInit(): void {
    this.load();
  }

  activateMember(memberId: any, ref: any) {
    ref.disabled = true;
    this._adminService.activateMember(memberId).subscribe(ref => {
      this.load();
    });
  }

}
