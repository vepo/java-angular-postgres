import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export declare interface ControlSupplier {
    (): AbstractControl | null;
}

export declare interface FormGrouplSupplier {
    (): FormGroup;
}

export class CustomValidators {
    static confirmation(referenceControlName: string, formSupplier: FormGrouplSupplier): ValidatorFn {
        return (control: AbstractControl) => {
            let form = formSupplier();
            if (form) {
                let refValue = form.controls[referenceControlName].value;
                let value = control.value;
                if (value && refValue && value != refValue) {
                    return {
                        'confirm': false,
                        'refValue': refValue,
                        'value': value
                    };
                }
            }
            return null;
        }
    }
}