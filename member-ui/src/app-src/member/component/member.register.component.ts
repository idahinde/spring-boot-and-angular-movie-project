import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../service";
import {ToastrService} from "ngx-toastr";
import {HttpParams} from "@angular/common/http";
import {passwordMatch} from "../../../app/app.functions";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {format} from "date-fns";

const bsDateConfig: Partial<BsDatepickerConfig> = {
  showClearButton: true, selectWeekDateRange: false,
  selectWeek: false, adaptivePosition: true,
  containerClass: 'theme-blue', showWeekNumbers: false,
  selectFromOtherMonth: true, showPreviousMonth: false,
  dateInputFormat: 'YYYY-MM-DD', useUtc: false
};

@Component({
  templateUrl: "./html/member.register.components.html"
})
export class MemberRegisterComponent implements OnInit {

  frmForm!: FormGroup;
  loading: boolean = false;
  maxDate: any = new Date();
  bsConfig: Partial<BsDatepickerConfig> = bsDateConfig;

  constructor(private _formBuilder: FormBuilder, private _toast: ToastrService,
              private _memberService: MemberService) {
  }

  ngOnInit(): void {
    this.frmForm = this._formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
      phoneNumber: ["", [Validators.required, Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      dateOfBirth: ["", [Validators.required]],
      emailAddress: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", [Validators.required, Validators.minLength(3)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(3)]],
    }, {validators: passwordMatch("password", "confirmPassword")});

    this.maxDate = new Date(this.maxDate - 1);
  }

  val(key: string, error: string): boolean {
    return this.frmForm.controls[key].hasError(error);
  }

  req(key: string): boolean {
    return this.frmForm.controls[key].touched && this.frmForm.controls[key].hasError("required");
  }

  register() {
    if (!this.frmForm.invalid) {
      this.loading = true;

      const leasedate = format(this.frmForm.controls["dateOfBirth"].value, "yyyy-MM-dd");
      const param = new HttpParams()
        .append("firstName", `${this.frmForm.controls["firstName"].value}`)
        .append("lastName", `${this.frmForm.controls["lastName"].value}`)
        .append("dateOfBirth", `${leasedate}`)
        .append("phoneNumber", `${this.frmForm.controls["phoneNumber"].value}`)
        .append("emailAddress", `${this.frmForm.controls["emailAddress"].value}`)
        .append("password", `${this.frmForm.controls["confirmPassword"].value}`);

      this._memberService.register(param).subscribe(res => {
          this.loading = false;
          this.frmForm.reset({
            firstName: "", lastName: "",
            phoneNumber: "", dateOfBirth: "",
            emailAddress: "", password: "", confirmPassword: ""
          });
          this._toast.success(res.message, res.title);
        },
        err => {
          this.loading = false;
          this._toast.error(err.error.message, err.error.title);
        },
        () => this.loading = false);
    } else {
      this.frmForm.markAllAsTouched();
    }
  }

}
