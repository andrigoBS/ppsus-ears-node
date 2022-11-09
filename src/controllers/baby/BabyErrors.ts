import { InternalServerErrorError } from '../AbstractHttpErrors';

export class OnFindBabyError extends InternalServerErrorError {
    constructor(message: string) {
        super('Ocorreu um erro ao consultar os bebês', message);
    }
}
