import {Component, OnInit} from "@angular/core";
import {AdminService} from "../service";

@Component({
  templateUrl: "./html/admin.view.all.purchase.book.component.html"
})
export class AdminViewAllPurchaseBookComponent implements OnInit {

  purchasedataref: any[] = [];

  constructor(private _adminService: AdminService) {
  }

  ngOnInit(): void {
    this._adminService.fetchPurchaseBooks().subscribe(res => this.purchasedataref = res);
  }

}
