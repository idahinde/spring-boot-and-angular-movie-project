import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpParams} from "@angular/common/http";
import {AdminService} from "../service";

@Component({
  templateUrl: "./html/admin.login.component.html"
})
export class AdminLoginComponent implements OnInit {

  frmGroup!: FormGroup;
  loading: boolean = false;

  constructor(private _router: Router, private _toast: ToastrService,
              private _formBuilder: FormBuilder, private _adminService: AdminService) {
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

    this._adminService.login(param).subscribe(res => {
        this.loading = false;
        this._toast.success(res.message, res.title);
        sessionStorage.setItem("movie.admin.userid", res.userid);
        sessionStorage.setItem("movie.admin.fullname", res.fullname);
        sessionStorage.setItem("movie.admin.emailaddress", res.emailaddress);
        sessionStorage.setItem("movie.admin.phone", res.phone);
        this._router.navigate(['/admin', 'panel', 'view-books']);
      },
      err => {
        this.loading = false;
        this._toast.error(err.error.message, err.error.title);
      },
      () => this.loading = false);
  }

}
