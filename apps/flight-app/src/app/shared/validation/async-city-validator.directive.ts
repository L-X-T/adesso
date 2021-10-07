import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { FlightService } from '@flight-workspace/flight-lib';
import { delay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Directive({
  selector: '[asyncCity]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncCityValidatorDirective,
      multi: true
    }
  ]
})
export class AsyncCityValidatorDirective {
  constructor(private flightService: FlightService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.flightService.find(control.value, '').pipe(
      map((flights) => (flights.length > 0 ? {} : { asyncCity: true })),
      delay(3000) // <-- delay; can be removed later...
    );
  }
}
