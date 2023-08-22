import {Component, OnInit} from "@angular/core";
import {AdminService} from "../service";

@Component({
  templateUrl: "./html/admin.view.book.component.html"
})
export class AdminViewBookComponent implements OnInit {

  bookListData: any[] = [];

  constructor(private _adminService: AdminService) {
  }

  ngOnInit(): void {
    this._adminService.fetchBooks().subscribe(res => this.bookListData = res);
  }

}
