import { InternalServerErrorError } from '../../helpers/http/AbstractHttpErrors';

export class OnFindTherapistError extends InternalServerErrorError {
    constructor(message: string) {
        super('Já existe um usuário com esse login', message);
    }
}

export class NotFoundTherapistError extends InternalServerErrorError {
    constructor(message: string) {
        super('Usuário não encontrado!', message);
    }
}
