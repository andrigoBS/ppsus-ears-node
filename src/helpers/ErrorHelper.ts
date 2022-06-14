import {ValidationError} from 'class-validator';
import {HttpStatus} from './HttpStatus';
import {RestResponse} from './ComposedTypes';

export default class ErrorHelper {

    public static validationError(e: any): RestResponse | undefined {
        if (Array.isArray(e) && e.every((err) => err instanceof ValidationError)) {
            const message = e.flatMap((field) => {
                if (field.children.length === 0) return[{name: field.property, rules: field.constraints}];
                return field.children.map((child: ValidationError) => ({
                    name: `${field.property}.${child.property}`,
                    rules: child.constraints,
                }));
            });
            return [HttpStatus.BAD_REQUEST, message];
        }
        return undefined;
    }
}
