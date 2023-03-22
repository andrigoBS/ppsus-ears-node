import { Validator } from './Validator';

export class ValidatorBoolean extends Validator<boolean> {
    constructor(name: string, isRequired?: boolean) {
        super(name, isRequired);
    }
}
