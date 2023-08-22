import {Component, OnInit} from "@angular/core";
import {MemberService} from "../service";

@Component({
  templateUrl: "./html/member.view.purchase.book.component.html"
})
export class MemberViewPurchaseBookComponent implements OnInit {

  moviedataref: any

  constructor(private _userService: MemberService) {
  }

  ngOnInit(): void {
    this._userService.fetchPurchasedBooks().subscribe(res => this.moviedataref = res);
  }

}
