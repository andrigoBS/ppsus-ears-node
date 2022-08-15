import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { ChildBirth, ChildBirthString } from '../../entity/baby/Baby';
import { HttpStatus } from '../../helpers/HttpStatus';

export default class ParentsController extends AbstractController {

    constructor() {
        super();
        const { listChildBirthTypes } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.get('/birth-types', verifyJWTMiddleware, listChildBirthTypes);
    }

    private listChildBirthTypes = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Baby']
            #swagger.description = 'Tipo de parto'
            #swagger.security = [{
                "basicApiKeyAuth": []
            }
        */
        const childBirthTypes = Object.keys(ChildBirth).map((key) => (
            { id: key, name: ChildBirth[key as ChildBirthString] }
        ));
        return res.status(HttpStatus.OK).send(childBirthTypes);

    };

}
