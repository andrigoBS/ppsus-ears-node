import AbstractRoutes from '../AbstractRoutes';
import { Request, Response } from 'express';
import ConductRoutes from './conduct/ConductRoutes';
import EquipmentRoutes from './equipment/EquipmentRoutes';
import IndicatorRoutes from './indicator/IndicatorRoutes';
import OrientationRoutes from './orientation/OrientationRoutes';
import TherapistController from './TherapistController';
import TriageController from './triage/TriageController';

export default class TherapistRoutes extends AbstractRoutes {
    private therapistController: TherapistController;

    constructor() {
        super();

        this.therapistController = new TherapistController();

        const { create, getDashboard, getEditableFields, getXpTypes } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();

        router.use('/triage', new TriageController().getRouter());
        router.use('/orientation', new OrientationRoutes().getRouter());
        router.use('/indicator', new IndicatorRoutes().getRouter());
        router.use('/equipment', new EquipmentRoutes().getRouter());
        router.use('/conduct', new ConductRoutes().getRouter());

        router.post('/', create);
        router.get('/dashboard', verifyJWTMiddleware, getDashboard);
        router.get('/xp-types', getXpTypes);
        router.get('/:id', getEditableFields);
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

        return this.therapistController.create(req, res);
    };

    private getEditableFields = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Therapist']
           #swagger.description = 'Endpoint para recuperar todos os campos que podem ser editados de um Fono'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return this.therapistController.getEditableFields(req, res);
    };

    private getDashboard = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Therapist']
           #swagger.description = 'Endpoint para recuperar todos os reports do dashboard de um Fono'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return this.therapistController.getDashboard(req, res);
    };

    private getXpTypes = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Therapist']
           #swagger.description = 'Endpoint para recuperar todos os reports do dashboard de um Fono'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return this.therapistController.getXpTypes(req, res);
    };
}
