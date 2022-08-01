import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';
import { Therapist } from '../../entity/therapist/Therapist';
import TriageController from './triage/TriageController';

export default class TherapistController extends AbstractController {

    constructor() {
        super();
        const { create, getDashboard } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();

        router.use('/triage', new TriageController().getRouter());

        router.post('/', create);
        router.get('/dashboard', getDashboard);
    }

    private create = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Therapist']
           #swagger.description = 'Endpoint para salvar uma fono'
           #swagger.parameters['therapist'] = {
            in: 'body',
            required: 'true',
            description: 'Fonoaudiologo',
            type: 'object',
            schema: {
                "lembrar": "arrumarEsseJson"
            }
           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */

        let therapist = req.body as Therapist;
        therapist = await Therapist.save(therapist);
        return res.status(HttpStatus.OK).json(therapist);
    };

    private getDashboard = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Therapist']
           #swagger.description = 'Endpoint para recuperar todos os reports do dashboard de um Fono'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return res.status(HttpStatus.OK).json([
            { type: 'baby-pass-fail' },
            { type: 'baby-come-born' },
            { type: 'indicators-percent' },
            { type: 'indicators' },
            { type: 'equipment' }
        ]);
    };
}
