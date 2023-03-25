import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ButtonSubmitService {

  private buttonSubmit$ = new Subject();

  constructor() {
  }

  setButtonSubmit() {
    this.buttonSubmit$.next(true);
  }

  getButtonSubmit(): Observable<any> {
    return this.buttonSubmit$.asObservable()
  }

  /**
   * Fxn to check form control validity
   * @param controlToCheck : Form Control to validate
   * @param form : Form to validate
   */
  public checkFormControlInvalid(controlToCheck: any, form: any) {
    const field = form.get(controlToCheck);
    return field != null && field.invalid && (field.touched || field.dirty);
  }

  /**
   * Checks validity after form submit
   * Just loop over all the formControl by making dirty as true
   * @param currentForm
   */
  public validateAllFormFields(currentForm: FormGroup) {
    let firstInvalidElement: any = null;
    Object.keys(currentForm.controls).forEach((field) => {
      const control:any = currentForm.get(field);
      if (control.status == 'INVALID' && firstInvalidElement == null) {
        firstInvalidElement = field;
      }

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });

    if (firstInvalidElement) {
      const element: any = document.querySelector(
        "[formControlName='" + firstInvalidElement + "']"
      );
      if (element) {
        element.focus();
      }
    }
  }

  /**
   * to focus reactive form text field
   * @param inputField
   */
  focusFormControlById(inputField:any) {
    const element: any = document.querySelector(
      "[id='" + inputField + "']"
    );

    if (element) {
      element.focus();
    }
  }

  /**
   * Find Invalid fields in a form
   * @param currentForm
   */
  public displayInvalidFormControls(currentForm: FormGroup) {
    const invalid = [];
    const controls = currentForm.controls;
    for (const name in controls) {
      if (controls[name].status == 'INVALID') {
        invalid.push(name);
      }
    }
  }



}
