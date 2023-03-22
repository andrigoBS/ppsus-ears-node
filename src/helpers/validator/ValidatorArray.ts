import { Validator, ValidatorFunction } from './Validator';

export class ValidatorArray<T> extends Validator<T[]> {
    constructor(name: string, validatorItems: Validator<T>, isRequired?: boolean) {
        super(name, isRequired);

        super.addFunction(new class implements ValidatorFunction<T[]> {
            execute(value: T[]): void {
                value.forEach(v => validatorItems.execute(v));
            }
        });
    }
}
