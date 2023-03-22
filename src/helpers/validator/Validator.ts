import { FieldRequiredError } from './ValidatorErrors';

export abstract class Validator<T> {
    private pipeline: ValidatorFunction<T>[];
    private readonly name: string;
    private readonly isRequired: boolean;

    protected constructor(name: string, isRequired?: boolean) {
        this.pipeline = [];
        this.name = name;
        this.isRequired = Boolean(isRequired);
    }

    public execute(value: any): T {
        value = value as T | undefined;
        if(value) {
            this.pipeline.forEach(func => func.execute(value));
        } else {
            if(this.isRequired) {
                throw new FieldRequiredError(this.name);
            }
        }
        return value;
    }

    protected addFunction(func: ValidatorFunction<T>): void {
        this.pipeline.push(func);
    }

    protected getName(): string {
        return this.name;
    }
}

export interface ValidatorFunction<T> {
    execute(value: T): void;
}
