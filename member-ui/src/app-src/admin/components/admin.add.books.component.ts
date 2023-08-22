import {Component, OnInit} from "@angular/core";
import {AdminService} from "../service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {greaterThanZero} from "../../../app/app.functions";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {format} from "date-fns";
import {HttpParams, HttpUrlEncodingCodec} from "@angular/common/http";

const bsDateConfig: Partial<BsDatepickerConfig> = {
  showClearButton: true, selectWeekDateRange: false,
  selectWeek: false, adaptivePosition: true,
  containerClass: 'theme-blue', showWeekNumbers: false,
  selectFromOtherMonth: true, showPreviousMonth: false,
  dateInputFormat: 'YYYY-MM-DD', useUtc: false
};

@Component({
  templateUrl: "./html/admin.add.books.component.html"
})
export class AdminAddBooksComponent implements OnInit {

  frmGrp!: FormGroup;
  loading: boolean = false;
  imageBase64: string = "";
  maxDate: any = new Date();
  bsConfig: Partial<BsDatepickerConfig> = bsDateConfig;

  constructor(private _formBuilder: FormBuilder, private _toast: ToastrService,
              private _adminService: AdminService) {
  }

  ngOnInit(): void {
    this.frmGrp = this._formBuilder.group({
      bookName: ["", [Validators.required]],
      author: ["", [Validators.required]],
      rate: ["", [Validators.required, greaterThanZero]],
      tsbkimage: ["", [Validators.required]],
      publishDates: ["", [Validators.required]],
      image: ["", [Validators.required]],
    });
    this.maxDate = new Date(this.maxDate - 1);
  }

  req(key: string): boolean {
    return this.frmGrp.controls[key].touched && this.frmGrp.controls[key].hasError("required");
  }

  val(key: string, ref: string): boolean {
    return this.frmGrp.controls[key].touched && this.frmGrp.controls[key].hasError(ref);
  }

  public uploadImage(fileInput: any): any {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const allowed_types = ['image/png', 'image/jpeg'];
      const fileType: string = fileInput.target.files[0].type;

      if (!allowed_types.includes(fileType)) {
        this._toast.error('Only Images are allowed ( JPG | PNG )');
        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imagedata = e.target.result;
        this.imageBase64 = imagedata;
        this.frmGrp.patchValue({image: imagedata});
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  saveMovie() {
    if (!this.frmGrp.invalid) {
      this.loading = true;
      const pubdate = format(this.frmGrp.controls["publishDates"].value, "yyyy-MM-dd");
      const data = new HttpParams({encoder: new HttpUrlEncodingCodec()})
        .append("bookName", `${this.frmGrp.controls["bookName"].value}`)
        .append("author", `${this.frmGrp.controls["author"].value}`)
        .append("rate", `${this.frmGrp.controls["rate"].value}`)
        .append("image", `${this.frmGrp.controls["image"].value}`)
        .append("publishDates", `${pubdate}`)
      this._adminService.saveBook(data).subscribe(res => {
          this.loading = false;
          this._toast.success(res.message, res.title);
          this.frmGrp.reset({
            bookName: "", author: "",
            rate: "", tsbkimage: "",
            publishDates: "", image: ""
          });
          this.imageBase64 = "";
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
