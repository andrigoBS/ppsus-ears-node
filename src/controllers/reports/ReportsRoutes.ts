import AbstractRoutes from '../AbstractRoutes';
import { Request, Response } from 'express';
import ReportsController from './ReportsController';

export default class ReportsRoutes extends AbstractRoutes {
    private readonly reportsController: ReportsController;

    constructor() {
        super();

        this.reportsController = new ReportsController();

        const { getBabiesComeBorn, getBabiesPassFailInstitution, getBabiesPassFailSecretary, getBabiesPassFailTherapist, getEquipment, getIndicators, getIndicatorsPercent } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();

        router.get('/baby-pass-fail/secretary', verifyJWTMiddleware, getBabiesPassFailSecretary);
        router.get('/baby-pass-fail/institution', verifyJWTMiddleware, getBabiesPassFailInstitution);
        router.get('/baby-pass-fail/therapist', verifyJWTMiddleware, getBabiesPassFailTherapist);

        router.get('/baby-come-born/:userType', verifyJWTMiddleware, getBabiesComeBorn);
        router.get('/indicators-percent/:userType', verifyJWTMiddleware, getIndicatorsPercent);
        router.get('/indicators/:userType', verifyJWTMiddleware, getIndicators);
        router.get('/equipment/:userType', verifyJWTMiddleware, getEquipment);
    }

    private getBabiesPassFailSecretary = async (req: Request, res: Response) => {
        return this.reportsController.getBabiesPassFailSecretary(req, res);
    };

    private getBabiesPassFailInstitution = async (req: Request, res: Response) => {
        return this.reportsController.getBabiesPassFailInstitution(req, res);
    };

    private getBabiesPassFailTherapist = async (req: Request, res: Response) => {
        return this.reportsController.getBabiesPassFailTherapist(req, res);
    };

    private getBabiesComeBorn = async (req: Request, res: Response) => {
        return this.reportsController.getBabiesComeBorn(req, res);
    };

    private getIndicatorsPercent = async (req: Request, res: Response) => {
        return this.reportsController.getIndicatorsPercent(req, res);
    };

    private getIndicators = async (req: Request, res: Response) => {
        return this.reportsController.getIndicators(req, res);
    };

    private getEquipment = async (req: Request, res: Response) => {
        return this.reportsController.getEquipment(req, res);
    };
}
