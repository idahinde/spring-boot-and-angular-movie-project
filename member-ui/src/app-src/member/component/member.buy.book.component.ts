import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MemberService} from "../service";
import {HttpParams, HttpUrlEncodingCodec} from "@angular/common/http";

const bsDateConfig: Partial<BsDatepickerConfig> = {
  showClearButton: true, selectWeekDateRange: false,
  selectWeek: false, adaptivePosition: true,
  containerClass: 'theme-blue', showWeekNumbers: false,
  selectFromOtherMonth: true, showPreviousMonth: false,
  dateInputFormat: 'YYYY-MM-DD', useUtc: false
};

@Component({
  templateUrl: "./html/member.buy.book.component.html"
})
export class MemberBuyBookComponent implements OnInit {

  moviedata: any;
  frmGrp!: FormGroup;
  loading: boolean = false;
  bsConfig: Partial<BsDatepickerConfig> = bsDateConfig;

  constructor(private _router: Router, private _formBuilder: FormBuilder,
              private _toast: ToastrService, private _memberService: MemberService) {
    this.moviedata = sessionStorage.getItem("member.user.booking.data");
    if (!this.moviedata) {
      this._router.navigate(["member", "panel", "view-books"]);
    }
    this.moviedata = JSON.parse(this.moviedata);
  }

  ngOnInit(): void {
    this.frmGrp = this._formBuilder.group({
      cardtype: ["Master Card", [Validators.required]],
      cardnumber: ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      cardcvvnumber: ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  val(key: string, p: string): boolean {
    return this.frmGrp.controls[key].touched && this.frmGrp.controls[key].hasError(p);
  }

  saveMovie() {
    if (!this.frmGrp.invalid) {
      this.loading = true;
      let userId: any = sessionStorage.getItem("member.user.userid");
      const data = new HttpParams({encoder: new HttpUrlEncodingCodec()})
        .append("bookId", `${this.moviedata.bookId}`)
        .append("memberId", `${userId}`)
        .append("cardType", `${this.frmGrp.controls["cardtype"].value}`)
        .append("cardNumber", `${this.frmGrp.controls["cardnumber"].value}`)
        .append("cardCVVNumber", `${this.frmGrp.controls["cardcvvnumber"].value}`)

      this._memberService.savePurchaseBook(data).subscribe(res => {
          this.loading = false;
          this._toast.success(res.message, res.title);
          this.frmGrp.reset({
            bookingdate: ""
          });
          this._router.navigate(["member", "panel", "view-books"]);
        },
        err => {
          this.loading = false;
          this._toast.error(err.error.message, err.error.time);
        },
        () => this.loading = false);
    } else {
      this.frmGrp.markAllAsTouched();
    }
  }

}
