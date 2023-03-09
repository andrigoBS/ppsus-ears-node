import { InternalServerErrorError } from '../../AbstractHttpErrors';

export class NotFoundOrientationError extends InternalServerErrorError {
    constructor(message: string) {
        super('Orientação não encontrada!', message);
    }
}
