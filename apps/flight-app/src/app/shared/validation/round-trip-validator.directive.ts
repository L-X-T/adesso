import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: 'form[roundTrip]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RoundTripValidatorDirective,
      multi: true
    }
  ]
})
export class RoundTripValidatorDirective {
  validate(control: AbstractControl): ValidationErrors | null {
    const group: FormGroup = control as FormGroup; // type cast
    const fromCtrl = group.controls['from'];
    const toCtrl = group.controls['to'];

    if (!fromCtrl || !toCtrl) return {};

    if (fromCtrl.value === toCtrl.value) {
      return {
        roundTrip: true
      };
    }
  }
}
