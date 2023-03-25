import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return {};
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const hasSpecialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);

    const minLength = value.length >= 8

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialCharacter && minLength;

    return !passwordValid ? {
      hasSpecialCharacter: hasSpecialCharacter,
      hasUpperCase: hasUpperCase,
      hasLowerCase: hasLowerCase,
      hasNumeric: hasNumeric,
      passwordValid: passwordValid,
      minLength: minLength,
      passwordStrength: !passwordValid
    } : null;
  };
}
