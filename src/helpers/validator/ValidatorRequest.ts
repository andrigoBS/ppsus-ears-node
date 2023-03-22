import { ValidatorObject } from './ValidatorObject';

export interface ValidatorRequestInterface {
    body?: ValidatorObject,
    query?: ValidatorObject,
    params?: ValidatorObject,
}
