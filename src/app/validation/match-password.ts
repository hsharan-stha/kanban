import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswordConfirmedValidator(
    matchTo: string // name of the control to match to
): (controlName: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.parent?.get(matchTo)?.value == control.value) {
            return null;
        } else {
            return { mustMatch: true };
        }
    };
}
