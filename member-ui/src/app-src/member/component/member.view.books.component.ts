import {Component, OnInit} from "@angular/core";
import {MemberService} from "../service";
import {Router} from "@angular/router";

@Component({
  templateUrl: "./html/member.view.books.component.html"
})
export class MemberViewBooksComponent implements OnInit {

  moviesListData: any[] = [];

  constructor(private _router: Router, private _memberService: MemberService) {
  }

  ngOnInit(): void {
    this._memberService.fetchMovies().subscribe(res => this.moviesListData = res);
  }

  goto(ref: any) {
    ref = JSON.stringify(ref);
    sessionStorage.setItem("member.user.booking.data", ref);
    this._router.navigate(['/member', 'panel', 'buy-book', new Date().getTime()])
  }

}
