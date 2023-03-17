import AbstractRoutes from '../AbstractRoutes';
import { Request, Response } from 'express';
import ReportsController from './ReportsController';

export default class ReportsRoutes extends AbstractRoutes {
    private readonly reportsController: ReportsController;

    constructor() {
        super();

        this.reportsController = new ReportsController();

        const {
            getBabiesPassFailInstitution, getBabiesPassFailSecretary, getBabiesPassFailTherapist,
            getEquipmentInstitution, getEquipmentSecretary, getEquipmentTherapist,
            getIndicatorsInstitution, getIndicatorsPercentInstitution, getIndicatorsPercentSecretary,
            getIndicatorsPercentTherapist, getIndicatorsSecretary, getIndicatorsTherapist
        } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();

        router.get('/baby-pass-fail/secretary', verifyJWTMiddleware, getBabiesPassFailSecretary);
        router.get('/baby-pass-fail/institution', verifyJWTMiddleware, getBabiesPassFailInstitution);
        router.get('/baby-pass-fail/therapist', verifyJWTMiddleware, getBabiesPassFailTherapist);

        // router.get('/baby-come-born/:userType', verifyJWTMiddleware, getBabiesComeBorn);

        router.get('/indicators-percent/secretary', verifyJWTMiddleware, getIndicatorsPercentSecretary);
        router.get('/indicators-percent/institution', verifyJWTMiddleware, getIndicatorsPercentInstitution);
        router.get('/indicators-percent/therapist', verifyJWTMiddleware, getIndicatorsPercentTherapist);

        router.get('/indicators/secretary', verifyJWTMiddleware, getIndicatorsSecretary);
        router.get('/indicators/institution', verifyJWTMiddleware, getIndicatorsInstitution);
        router.get('/indicators/therapist', verifyJWTMiddleware, getIndicatorsTherapist);

        router.get('/equipment/secretary', verifyJWTMiddleware, getEquipmentSecretary);
        router.get('/equipment/institution', verifyJWTMiddleware, getEquipmentInstitution);
        router.get('/equipment/therapist', verifyJWTMiddleware, getEquipmentTherapist);
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

    // private getBabiesComeBorn = async (req: Request, res: Response) => {
    //     return this.reportsController.getBabiesComeBorn(req, res);
    // };

    private getIndicatorsPercentSecretary = async (req: Request, res: Response) => {
        return this.reportsController.getIndicatorsPercentSecretary(req, res);
    };
    private getIndicatorsPercentInstitution = async (req: Request, res: Response) => {
        return this.reportsController.getIndicatorsPercentInstitution(req, res);
    };
    private getIndicatorsPercentTherapist = async (req: Request, res: Response) => {
        return this.reportsController.getIndicatorsPercentTherapist(req, res);
    };

    private getIndicatorsSecretary = async (req: Request, res: Response) => {
        return this.reportsController.getIndicatorsSecretary(req, res);
    };
    private getIndicatorsInstitution = async (req: Request, res: Response) => {
        return this.reportsController.getIndicatorsInstitution(req, res);
    };
    private getIndicatorsTherapist = async (req: Request, res: Response) => {
        return this.reportsController.getIndicatorsTherapist(req, res);
    };

    private getEquipmentSecretary = async (req: Request, res: Response) => {
        return this.reportsController.getEquipmentSecretary(req, res);
    };
    private getEquipmentInstitution = async (req: Request, res: Response) => {
        return this.reportsController.getEquipmentInstitution(req, res);
    };
    private getEquipmentTherapist = async (req: Request, res: Response) => {
        return this.reportsController.getEquipmentTherapist(req, res);
    };
}
