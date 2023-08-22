import {format} from "date-fns";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";

export function passwordMatch(newPassword: string, confirmPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    let pswd = formGroup.get(newPassword);
    let comfpswd = formGroup.get(confirmPassword);
    return pswd?.value === comfpswd?.value ? null : {notmatched: true};
  }
}

export function greaterThanZero(formControl: AbstractControl): ValidationErrors | null {
  const value: number = parseFloat(formControl.value);
  if (value > 0) {
    return null;
  } else {
    return {"greaterthanzero": true};
  }
}

export function notEqualTo(value: any): ValidatorFn {
  return (formControl: AbstractControl): ValidationErrors | null => {
    let cval: string = formControl.value;
    if (cval === null) {
      return {'notequalto': true, 'rejectvalue': value};
    } else {
      if (!(cval.length > 0)) {
        return {'notequalto': true, 'rejectvalue': value};
      } else if (cval.toLowerCase() === value.toLowerCase()) {
        return {'notequalto': true, 'rejectvalue': value};
      } else {
        return null;
      }
    }
  };
}

export const bsDateConfig: Partial<BsDatepickerConfig> = {
  showClearButton: true, selectWeekDateRange: false,
  selectWeek: false, adaptivePosition: true,
  containerClass: 'theme-blue', showWeekNumbers: false,
  selectFromOtherMonth: true, showPreviousMonth: false,
  dateInputFormat: 'YYYY-MM-DD', useUtc: false
};

export const dateFormatterFn = (date: any): string => {
  return format(date, "yyyy-MM-dd");
}

export function pad2(str: any) {
  return String(str).padStart(2, '0');
}
