import {Component, OnInit} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../service";
import {HttpParams} from "@angular/common/http";

@Component({
  templateUrl: "./html/member.login.components.html"
})
export class MemberLoginComponent implements OnInit {

  frmGroup!: FormGroup;
  loading: boolean = false;

  constructor(private _router: Router, private _toast: ToastrService,
              private _formBuilder: FormBuilder, private _memberService: MemberService) {
  }

  ngOnInit(): void {
    this.frmGroup = this._formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  loginEvent() {
    this.loading = true;
    const param = new HttpParams()
      .append("username", `${this.frmGroup.controls["username"].value}`)
      .append("password", `${this.frmGroup.controls["password"].value}`);

    this._memberService.login(param).subscribe(res => {
        this.loading = false;
        this._toast.success(res.message, res.title);
        sessionStorage.setItem("member.user.userid", res.userid);
        sessionStorage.setItem("member.user.fullname", res.fullname);
        sessionStorage.setItem("member.user.emailaddress", res.emailaddress);
        sessionStorage.setItem("member.user.phone", res.phone);
        this._router.navigate(['/member', 'panel', 'view-books']);
      },
      err => {
        this.loading = false;
        this._toast.error(err.error.message, err.error.title);
      },
      () => this.loading = false);
  }

}
