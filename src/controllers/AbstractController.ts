import { HttpError, HttpStatus } from './AbstractHttpErrors';
import { Request,Response } from 'express';
import GenericLogger from '../helpers/GenericLogger';
import { ValidatorRequestInterface } from '../helpers/validator/ValidatorRequest';

export default abstract class AbstractController {
    protected async genericProcess<T>(
        req: Request,
        res: Response,
        validateParams: ValidatorRequestInterface,
        onFinish: (params: T)=> Promise<any>
    ): Promise<Response> {
        let code, result;

        const logger = new GenericLogger();
        let path = req.originalUrl;
        const pathIntIndex = path.indexOf('?');
        if(pathIntIndex > 0) {
            path = path.substring(0, pathIntIndex);
        }
        const userId = req.body.jwtObject?.id;
        const paramsLog = { body: req.body, params: req.params, query: req.query };

        try{
            const query = validateParams.query?.execute(req.query);
            const params = validateParams.params?.execute(req.params);
            const body = validateParams.body?.execute(req.body);
            const paramsFull = { ...query, ...params, ...body } as T;

            code = HttpStatus.OK;
            result = await onFinish(paramsFull);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                code = e.httpStatus;
                result = e.messages;
            } else {
                code = HttpStatus.INTERNAL_SERVER_ERROR;
                result = { message: e.message };
            }
            console.error(e);
            logger.request(path, userId, code, paramsLog, e.stackTrace);
        }

        logger.request(path, userId, code, paramsLog, result);
        return res.status(code).json(result);
    }
}


