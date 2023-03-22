import { Validator, ValidatorFunction } from './Validator';

export class ValidatorObject extends Validator<object>{
    constructor(name: string, isRequired?: boolean) {
        super(name, isRequired);
    }

    public fromObject(schema: object): ValidatorObject {
        super.addFunction(new class implements ValidatorFunction<object> {
            execute(value: object): void {
                for (const valueKey in schema) {
                    let valueObj = undefined;
                    try {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        valueObj = value[valueKey];
                        // eslint-disable-next-line no-empty
                    }catch (ignore) {}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    schema[valueKey].execute(valueObj);
                }
            }
        });

        return this;
    }
}
