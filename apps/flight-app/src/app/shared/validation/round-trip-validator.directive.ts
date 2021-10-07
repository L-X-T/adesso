import { Directive, Input } from '@angular/core';
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
  @Input() roundTrip: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    const group: FormGroup = control as FormGroup; // type cast
    const fromCtrl = this.roundTrip.length > 0 ? group.controls[this.roundTrip[0]] : group.controls['from'];
    const toCtrl = this.roundTrip.length > 1 ? group.controls[this.roundTrip[1]] : group.controls['to'];

    if (!fromCtrl || !toCtrl) return {};

    if (fromCtrl.value === toCtrl.value) {
      return {
        roundTrip: true
      };
    }
  }
}
