import { HttpStatus } from '../AbstractHttpErrors';
import AbstractRoutes from '../AbstractRoutes';
import { Request, Response } from 'express';
import { Therapist, TherapistXP, TherapistXPString } from '../../entity/therapist/Therapist';
import CryptoHelper from '../../helpers/CryptoHelper';
import ConductController from './conduct/ConductController';
import EquipmentController from './equipment/EquipmentController';
import IndicatorController from './indicator/IndicatorController';
import OrientationController from './orientation/OrientationController';
import TherapistRepository from './TherapistRepository';
import TriageController from './triage/TriageController';

export default class TherapistController extends AbstractRoutes {
    private readonly therapistRepository = new TherapistRepository();

    constructor() {
        super();
        const { create, getDashboard, getEditableFields, getXpTypes } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();

        router.use('/triage', new TriageController().getRouter());
        router.use('/orientation', new OrientationController().getRouter());
        router.use('/indicator', new IndicatorController().getRouter());
        router.use('/equipment', new EquipmentController().getRouter());
        router.use('/conduct', new ConductController().getRouter());

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

        let therapist: Therapist;

        try{
            const therapistJson = req.body;

            therapistJson.xp = TherapistXP[therapistJson.xp as TherapistXPString];
            therapistJson.institutions = therapistJson.institutions.map((i: number) => ({ id: i }));
            therapist = therapistJson as Therapist;
        }catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ fancyMessage: 'Ocorreu um erro ao tentar criar o usuario', message: e });
        }

        try{
            const therapist2 = await this.therapistRepository.findLogin(therapist);
            if(therapist2){
                return res.status(HttpStatus.BAD_REQUEST).json({ fancyMessage: 'Já existe um usuario com esse login', message: { id: therapist2.id } });
            }
        }catch (e: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ fancyMessage: 'Ocorreu um erro ao tentar criar o usuario', message: e });
        }

        try{
            const therapistJson = req.body;
            therapist.password = CryptoHelper.encrypt(therapist.password);
            therapist = await this.therapistRepository.save(therapist);
            await this.therapistRepository.saveEmails(therapist.id, therapistJson.emails);
            await this.therapistRepository.savePhones(therapist.id, therapistJson.phones);

            return res.status(HttpStatus.OK).json(therapist);
        }catch (e: any){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ fancyMessage: 'Ocorreu um erro ao tentar criar o usuario', message: e });
        }
    };


    private getEditableFields = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Therapist']
           #swagger.description = 'Endpoint para recuperar todos os campos que podem ser editados de um Fono'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const therapistId = req.params.id;
        const therapist = await this.therapistRepository.getEditableFields(therapistId);

        if(!therapist){
            return res.status(HttpStatus.NOT_FOUND).json({ fancyMessage: 'Usuário não encontrado!', message: 'Usuário não encontrado!' });
        }

        const retornoTherapist: any = { ...therapist };
        // retornoTherapist.xp = Object.keys(TherapistXP).filter((key) => TherapistXP[key as TherapistXPString] === therapist.xp)[0];
        retornoTherapist.xp = { id: 'LESS_ONE', name: 'Menos de 1 ano' };

        // therapist.xp = Object.keys(TherapistXP).filter((key) => TherapistXP[key as TherapistXPString] === therapist.xp)[0];
        return res.status(HttpStatus.OK).json(retornoTherapist);
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

    private getXpTypes = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Therapist']
           #swagger.description = 'Endpoint para recuperar todos os reports do dashboard de um Fono'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const therapistXP = Object.keys(TherapistXP).map((key) => (
            { id: key, name: TherapistXP[key as TherapistXPString] }
        ));
        return res.status(HttpStatus.OK).json(therapistXP);
    };
}
