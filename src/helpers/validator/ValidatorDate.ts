import { Validator } from './Validator';

export class ValidatorDate extends Validator<Date> {
    constructor(name: string, isRequired?: boolean) {
        super(name, isRequired);
    }
}
