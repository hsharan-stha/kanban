import { AbstractControl, FormControl, Validators } from '@angular/forms';

export class MobileNumberValidator {
  static commaSepNumber = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    let mobilenum: Array<any> = [];
    if (control.value) {
      mobilenum = control.value.split(',').map((e: any) => e.trim());
    }
    const forbidden = mobilenum.some((mobilenumber: any) =>
      Validators.pattern('^9\\d{9}$')(new FormControl(mobilenumber))
    );
    return forbidden ? { mobilenumber: { value: control.value } } : null;
  };
}
