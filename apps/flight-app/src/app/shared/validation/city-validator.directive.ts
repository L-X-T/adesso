import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[city]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CityValidatorDirective,
      multi: true
    }
  ]
})
export class CityValidatorDirective implements Validator {
  @Input() city: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    const validCities = this.city.length ? this.city : ['Hamburg', 'Graz', 'Berlin', 'Wien'];

    if (control.value && validCities.indexOf(control.value) === -1) {
      return {
        city: {
          actualValue: control.value,
          validCities: validCities
        }
      };
    }

    return null;
  }
}
