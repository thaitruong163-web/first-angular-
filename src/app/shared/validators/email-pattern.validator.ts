import { AbstractControl, ValidationErrors } from '@angular/forms';

export function EmailPatternValidator(
  control: AbstractControl
): ValidationErrors | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!control.value) return { required: true };

  return emailRegex.test(control.value)
    ? null
    : { emailPattern: true };
}
